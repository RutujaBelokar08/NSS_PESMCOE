import { DatabaseSync } from 'node:sqlite'
import { createReadStream, existsSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'
try { process.loadEnvFile('.env') } catch (error) { if (error.code !== 'ENOENT') throw error }

const root = process.cwd()
const dbPath = resolve(process.env.NSS_CMS_DATABASE || join(root,'data','nss.sqlite'))
const uploadDir = resolve(process.env.NSS_CMS_UPLOADS || join(root,'data','uploads'))
const supabaseUrl = process.env.VITE_SUPABASE_URL
const secretKey = process.env.SUPABASE_SECRET_KEY
if (!supabaseUrl || !secretKey) throw new Error('Set VITE_SUPABASE_URL and server-only SUPABASE_SECRET_KEY before importing.')
if (!existsSync(dbPath)) throw new Error(`SQLite source database not found: ${dbPath}`)
const db = new DatabaseSync(dbPath,{readOnly:true})
// New sb_secret_* keys are API keys, not JWTs. Send them only as `apikey`;
// Authorization is reserved for a real Supabase Auth access token.
const headers = { apikey:secretKey, 'content-type':'application/json' }
const request = async (path,options={}) => {
  const response=await fetch(`${supabaseUrl.replace(/\/$/,'')}${path}`,{...options,headers:{...headers,...options.headers}})
  const raw=await response.text(); let result={}; try{result=raw?JSON.parse(raw):{}}catch{throw new Error(`Supabase returned non-JSON (${response.status}) for ${path}`)}
  if(!response.ok)throw new Error(result.message||result.error||`Supabase request failed (${response.status}): ${path}`)
  return result
}
const esc=x=>encodeURIComponent(x)
const sessions=db.prepare('select id,label,current,created_at from sessions order by created_at').all()
if(!sessions.length) throw new Error('No legacy academic sessions exist; nothing was imported.')
const sessionById=new Map()
for(const s of sessions){
  const exists=await request(`/rest/v1/academic_sessions?label=eq.${esc(s.label)}&select=id&limit=1`)
  let target=exists[0]
  if(!target){const created=await request('/rest/v1/academic_sessions',{method:'POST',headers:{prefer:'return=representation'},body:JSON.stringify({label:s.label,is_current:false,active:true,created_at:s.created_at})});target=created[0]}
  if(!target?.id)throw new Error(`Could not map academic session ${s.label}`)
  sessionById.set(s.id,target.id)
  if(s.current) {
    await request('/rest/v1/academic_sessions?is_current=eq.true',{method:'PATCH',headers:{prefer:'return=minimal'},body:JSON.stringify({is_current:false})})
    await request(`/rest/v1/academic_sessions?id=eq.${esc(target.id)}`,{method:'PATCH',headers:{prefer:'return=minimal'},body:JSON.stringify({is_current:true})})
  }
}
const uploadMap=new Map()
const records=db.prepare('select id,collection,session,data,position,published from records order by collection,position,id').all()
for(const row of records){
  const data=JSON.parse(row.data)
  for(const [key,value] of Object.entries(data)){
    if(typeof value!=='string'||!value.startsWith('/uploads/'))continue
    const oldName=basename(value); if(!uploadMap.has(oldName)){
      const local=join(uploadDir,oldName); if(!existsSync(local))throw new Error(`Referenced upload is missing: ${oldName}`)
      const bytes=await (await import('node:fs/promises')).readFile(local)
      const type=oldName.toLowerCase().endsWith('.png')?'image/png':oldName.toLowerCase().endsWith('.webp')?'image/webp':'image/jpeg'
      const destination=`legacy/${oldName}`
      await request(`/storage/v1/object/nss-cms/${destination}`,{method:'POST',headers:{'content-type':type,'x-upsert':'true'},body:bytes})
      uploadMap.set(oldName,`${supabaseUrl.replace(/\/$/,'')}/storage/v1/object/public/nss-cms/${destination}`)
    }
    data[key]=uploadMap.get(oldName)
  }
  const payload={id:String(data.id||row.id),collection:row.collection,session_id:sessionById.get(row.session)||null,data,position:row.position,published:!!row.published,active:data.active!==false}
  await request('/rest/v1/cms_records?on_conflict=id',{method:'POST',headers:{prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify(payload)})
}
for(const setting of db.prepare('select key,value from settings where key <> \'initialized\'').all()){
  let value; try{value=JSON.parse(setting.value)}catch{value=setting.value}
  await request('/rest/v1/site_settings?on_conflict=key',{method:'POST',headers:{prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify({key:setting.key,value})})
}
const admins=db.prepare('select count(*) as count from admins').get().count
console.log(JSON.stringify({sessions:sessions.length,records:records.length,settings:db.prepare("select count(*) as count from settings where key <> 'initialized'").get().count,uploads:uploadMap.size,legacyAdminAccounts:admins,adminAction:admins?'Create a Supabase Auth administrator with /admin/setup; SQLite scrypt passwords cannot be imported into Supabase Auth.':'No legacy administrator accounts found.'},null,2))

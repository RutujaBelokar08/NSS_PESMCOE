import { createServer } from 'node:http'
import { createReadStream, existsSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'
import { randomUUID } from 'node:crypto'
try { process.loadEnvFile('.env') } catch (error) { if (error.code !== 'ENOENT') throw error }

const root = process.cwd()
const url = process.env.VITE_SUPABASE_URL
const publicKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY
const secret = process.env.SUPABASE_SECRET_KEY
const collections = ['team','officers','domains','activities','notices','events','achievements','albums','gallery','stats']
const cookieName = 'nss_supabase_session'
const send = (res, status, data, headers={}) => { res.writeHead(status, { 'content-type':'application/json; charset=utf-8', 'cache-control':'no-store', ...headers }); res.end(JSON.stringify({ success: status < 400, ...data })) }
const body = async req => { const chunks=[]; let size=0; for await (const chunk of req) { size += chunk.length; if (size > 20_000_000) throw Object.assign(new Error('Request too large.'), { status:413 }); chunks.push(chunk) } return JSON.parse(Buffer.concat(chunks).toString() || '{}') }
const credentials = () => { if (!url || !publicKey) throw Object.assign(new Error('Configure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.'), { status:503 }); return url.replace(/\/$/,'') }
const supa = async (path, { method='GET', token, admin=false, body:payload, headers={} }={}) => {
  if (admin && !secret) throw Object.assign(new Error('Configure server-only SUPABASE_SECRET_KEY to enable secure administrator provisioning.'), { status:503 })
  const endpoint = `${credentials()}${path}`
  const requestHeaders = { apikey: admin ? secret : publicKey, 'content-type':'application/json', ...(token ? { authorization:`Bearer ${token}` } : {}), ...headers }
  const response = await fetch(endpoint, { method, headers:requestHeaders, ...(payload === undefined ? {} : { body:JSON.stringify(payload) }) })
  const text = await response.text(); let data={}; try { data=text ? JSON.parse(text) : {} } catch { throw new Error(`Supabase returned a non-JSON response (HTTP ${response.status}).`) }
  if (!response.ok) throw Object.assign(new Error(data.msg || data.message || data.error_description || data.error || `Supabase request failed (HTTP ${response.status}).`), { status:response.status })
  return data
}
const tokenFrom = req => { const part=(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(`${cookieName}=`)); return part ? decodeURIComponent(part.slice(cookieName.length+1)) : '' }
const userFor = async req => { const token=tokenFrom(req); if(!token) return null; try { return await supa('/auth/v1/user',{token}) } catch { return null } }
const adminFor = async req => { const user=await userFor(req); if(!user) return null; const profiles=await supa(`/rest/v1/admin_profiles?user_id=eq.${encodeURIComponent(user.id)}&active=eq.true&select=user_id,username`,{token:tokenFrom(req)}); return profiles[0] ? {user,profile:profiles[0]} : null }
const requireAdmin = async (req,res) => { const admin=await adminFor(req); if(!admin) { send(res,401,{error:'Please log in as an active administrator.'}); return null } return admin }
const rest = (table, query='') => `/rest/v1/${table}${query ? `?${query}` : ''}`
const settings = async token => { const rows=await supa(rest('site_settings','select=key,value'),{token}); return Object.fromEntries(rows.map(x=>[x.key,x.value])) }
const sessionRows = async token => supa(rest('academic_sessions','select=id,label,is_current,active,created_at&order=created_at.desc'),{token})
const recordsFor = async (token, admin=false, currentSessionId) => {
  const fields='select=id,collection,session_id,data,position,published,active'
  if(!admin&&!currentSessionId) return Object.fromEntries(collections.map(c=>[c,[]]))
  const sessionFilter=admin?'':`&session_id=eq.${encodeURIComponent(currentSessionId)}`
  const publicFilter=admin?'':'&published=eq.true&active=eq.true'
  const rows=await supa(rest('cms_records',`${fields}${sessionFilter}${publicFilter}&order=position.asc,id.asc`),{token})
  return Object.fromEntries(collections.map(c=>[c,rows.filter(r=>r.collection===c).map(r=>({...r.data,id:r.id,session:r.session_id,order:r.position,published:r.published,active:r.active}))]))
}
const fromRow = r => ({ id:r.id, collection:r.collection, session_id:r.session_id, data:r.data, position:r.position, published:r.published, active:r.active })
const headersForSession = req => ({ 'set-cookie':`${cookieName}=${encodeURIComponent(req)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800${process.env.NODE_ENV==='production'?'; Secure':''}` })

const server=createServer(async(req,res)=>{
 try {
  const requestUrl=new URL(req.url,'http://localhost'), path=requestUrl.pathname
  if(req.method==='GET' && path==='/api/setup-status') { const rows=await supa(rest('admin_profiles','select=user_id&limit=1'),{admin:true}); return send(res,200,{needsSetup:rows.length===0}) }
  if(req.method==='POST' && path==='/api/setup') {
    const current=await supa(rest('admin_profiles','select=user_id&limit=1'),{admin:true}); if(current.length) return send(res,409,{error:'Admin setup is already complete.'})
    const b=await body(req); const email=String(b.email||'').trim().toLowerCase()
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254||typeof b.password!=='string'||b.password.length<12) return send(res,400,{error:'Enter a valid email address and a password of at least 12 characters.'})
    const created=await supa('/auth/v1/admin/users',{method:'POST',admin:true,body:{email,password:b.password,email_confirm:true,user_metadata:{nss_email:email}}})
    try { await supa(rest('admin_profiles'),{method:'POST',admin:true,body:{user_id:created.id,username:email,active:true},headers:{prefer:'return=minimal'}}) }
    catch(error) { await supa(`/auth/v1/admin/users/${created.id}`,{method:'DELETE',admin:true}).catch(()=>{}); throw error }
    const session=await supa('/auth/v1/token?grant_type=password',{method:'POST',body:{email,password:b.password}})
    return send(res,201,{message:'Admin account created successfully'},headersForSession(session.access_token))
  }
  if(req.method==='POST' && path==='/api/auth/login') {
    const b=await body(req); const email=String(b.email||'').trim().toLowerCase()
    if(!email||typeof b.password!=='string') return send(res,400,{error:'Enter your email and password.'})
    const session=await supa('/auth/v1/token?grant_type=password',{method:'POST',body:{email,password:b.password||''}})
    const profiles=await supa(rest('admin_profiles',`user_id=eq.${encodeURIComponent(session.user.id)}&active=eq.true&select=user_id`),{token:session.access_token})
    if(!profiles.length) { await supa('/auth/v1/logout',{method:'POST',token:session.access_token}).catch(()=>{}); return send(res,403,{error:'This account is not an active NSS administrator.'}) }
    return send(res,200,{message:'Signed in.'},headersForSession(session.access_token))
  }
  if(req.method==='POST' && path==='/api/auth/logout') { const token=tokenFrom(req); if(token) await supa('/auth/v1/logout',{method:'POST',token}).catch(()=>{}); return send(res,200,{message:'Signed out.'},{'set-cookie':`${cookieName}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${process.env.NODE_ENV==='production'?'; Secure':''}`}) }
  if(req.method==='GET' && path==='/api/public/site') {
    const sessions=await sessionRows()
    const current=sessions.find(s=>s.is_current&&s.active)
    const [collectionsData,siteSettings]=await Promise.all([recordsFor(undefined,false,current?.id),settings()])
    return send(res,200,{session:current?{id:current.id,label:current.label}:null,sessions:sessions.map(s=>({id:s.id,label:s.label,current:s.is_current})),collections:collectionsData,settings:siteSettings})
  }
  if(path.startsWith('/api/admin/')) {
    const admin=await requireAdmin(req,res); if(!admin) return
    const token=tokenFrom(req)
    if(req.method==='GET'&&path==='/api/admin/site') return send(res,200,{collections:await recordsFor(token,true),settings:await settings(token),sessions:(await sessionRows(token)).map(s=>({id:s.id,label:s.label,current:s.is_current,active:s.active}))})
    if(req.method==='PUT'&&path==='/api/admin/settings') { const b=await body(req); for(const [key,value] of Object.entries(b)) await supa(rest('site_settings','on_conflict=key'),{method:'POST',token,body:{key,value},headers:{prefer:'resolution=merge-duplicates,return=minimal'}}); return send(res,200,{message:'Settings saved.'}) }
    if(req.method==='POST'&&path==='/api/admin/sessions') { const b=await body(req); if(!/^\d{4}-\d{2}$/.test(b.label||'')) return send(res,400,{error:'Use a session such as 2027-28.'}); const rows=await supa(rest('academic_sessions','select=id,label,is_current,active'),{method:'POST',token,body:{label:b.label},headers:{prefer:'return=representation'}}); return send(res,201,{id:rows[0].id,label:rows[0].label,current:rows[0].is_current,active:rows[0].active}) }
    const currentMatch=path.match(/^\/api\/admin\/sessions\/([^/]+)\/current$/); if(req.method==='POST'&&currentMatch) { await supa('/rest/v1/rpc/set_current_academic_session',{method:'POST',token,body:{p_session_id:currentMatch[1]}}); return send(res,200,{message:'Current session updated.'}) }
    const sessionMatch=path.match(/^\/api\/admin\/sessions\/([^/]+)$/); if(sessionMatch&&(req.method==='PATCH'||req.method==='DELETE')) { const rows=await supa(rest('academic_sessions',`id=eq.${encodeURIComponent(sessionMatch[1])}&select=id,is_current`),{token}); if(!rows.length)return send(res,404,{error:'Academic session not found.'}); if(rows[0].is_current)return send(res,409,{error:'Make another session current before deactivating this one.'}); const updated=await supa(rest('academic_sessions',`id=eq.${encodeURIComponent(sessionMatch[1])}`),{method:'PATCH',token,body:{active:req.method==='DELETE'?false:true},headers:{prefer:'return=representation'}}); return send(res,200,{session:updated[0]}) }
    if(req.method==='POST'&&path==='/api/admin/upload') {
      const b=await body(req); const types={'image/jpeg':'jpg','image/png':'png','image/webp':'webp','application/pdf':'pdf'}; const ext=types[b.type]; if(!ext)return send(res,400,{error:'Upload JPG, PNG, WebP, or PDF files.'})
      const bytes=Buffer.from(b.data||'','base64'); if(!bytes.length||bytes.length>15_000_000)return send(res,400,{error:'File must be smaller than 15 MB.'})
      const name=`${randomUUID()}.${ext}`; const result=await fetch(`${credentials()}/storage/v1/object/nss-cms/${name}`,{method:'POST',headers:{apikey:publicKey,authorization:`Bearer ${token}`,'content-type':b.type,'x-upsert':'false'},body:bytes}); const text=await result.text(); if(!result.ok) {let err={};try{err=JSON.parse(text)}catch{};throw Object.assign(new Error(err.message||`Storage upload failed (HTTP ${result.status}).`),{status:result.status})}
      return send(res,201,{url:`${credentials()}/storage/v1/object/public/nss-cms/${name}`,path:name})
    }
    const match=path.match(/^\/api\/admin\/records\/([^/]+)(?:\/([^/]+))?$/)
    if(match) { const [,collection,id]=match; if(!collections.includes(collection))return send(res,404,{error:'Unknown collection.'});
      if(req.method==='GET')return send(res,200,(await recordsFor(token,true))[collection])
      if(req.method==='POST'||req.method==='PUT') { const b=await body(req); const sessionId=b.session; delete b.session; const s=sessionId ? await supa(rest('academic_sessions',`select=id&id=eq.${encodeURIComponent(sessionId)}&active=eq.true&limit=1`),{token}) : await supa(rest('academic_sessions','select=id&is_current=eq.true&active=eq.true&limit=1'),{token}); if(!s.length)return send(res,400,{error:'Choose an active academic session.'}); const data={...b}; delete data.order; const row={id:id||randomUUID(),collection,session_id:s[0].id,data,position:Number(b.order||0),published:b.published!==false,active:b.active!==false}; const pathRest=rest('cms_records',id?`id=eq.${encodeURIComponent(id)}`:''); const saved=await supa(pathRest,{method:id?'PATCH':'POST',token,body:row,headers:{prefer:'return=representation'}}); const r=saved[0]; if(!r)return send(res,404,{error:'Record not found.'}); return send(res,id?200:201,{id:r.id,...r.data,session:r.session_id,order:r.position,published:r.published,active:r.active}) }
      if(req.method==='DELETE'&&id) { await supa(rest('cms_records',`id=eq.${encodeURIComponent(id)}&collection=eq.${collection}`),{method:'DELETE',token,headers:{prefer:'return=minimal'}}); return send(res,200,{message:'Record deleted.'}) }
    }
    return send(res,404,{error:'Admin API route not found.'})
  }
  if(path.startsWith('/api/')) return send(res,404,{error:'API route not found.'})
  if(['/admin','/admin/','/admin/dashboard'].includes(path)&&!await adminFor(req)){res.writeHead(302,{location:'/admin/login','cache-control':'no-store'});return res.end()}
  const dist=resolve(root,'dist'), candidate=path==='/'?join(dist,'index.html'):resolve(dist,`.${path}`), sep=process.platform==='win32'?'\\':'/'; if(candidate!==dist&&!candidate.startsWith(dist+sep))return send(res,404,{error:'Not found'}); const file=existsSync(candidate)?candidate:join(dist,'index.html'); if(file===join(dist,'index.html')&&path!=='/'&&extname(path))return send(res,404,{error:'Not found'}); const ext=extname(file).toLowerCase(); const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon','.woff2':'font/woff2'}[ext]||'application/octet-stream'; res.writeHead(200,{'content-type':mime,'x-content-type-options':'nosniff'}); createReadStream(file).pipe(res)
 } catch(error) { console.error('[nss-api]',error); send(res,error.status||500,{error:error.message||'Server failed to process the request.'}) }
})
const port=Number(process.env.PORT||4174); server.listen(port,'0.0.0.0',()=>console.log(`NSS CMS listening on http://localhost:${port}`))

import { spawn } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { once } from 'node:events'
import { DatabaseSync } from 'node:sqlite'

const dataDir=mkdtempSync(join(tmpdir(),'nss-cms-acceptance-'))
const port=Number(process.env.NSS_ACCEPTANCE_PORT||4189), base=`http://127.0.0.1:${port}`
let server=spawn(process.execPath,['server/index.mjs'],{env:{...process.env,NSS_CMS_DATA_DIR:dataDir,PORT:String(port)},stdio:'ignore'})
let cookie=''
async function request(path,method='GET',body,auth=true){const res=await fetch(base+path,{method,headers:{...(body?{'content-type':'application/json'}:{}),...(auth&&cookie?{cookie}: {})},body:body?JSON.stringify(body):undefined});const payload=await res.json();if(!res.ok)throw Error(`${method} ${path}: ${payload.error}`);if(path==='/api/auth/login')cookie=res.headers.get('set-cookie').split(';')[0];return payload}
try{
 for(let i=0;i<60;i++){try{await request('/api/setup-status','GET',undefined,false);break}catch{await delay(250)}}
 for(const route of ['/admin/setup','/admin/login','/activities']){const page=await fetch(base+route);if(page.status!==200||!(page.headers.get('content-type')||'').includes('text/html'))throw Error(`Production route failed: ${route} (${page.status})`)}
 const protectedApi=await fetch(base+'/api/admin/site');if(protectedApi.status!==401||!(protectedApi.headers.get('content-type')||'').includes('application/json'))throw Error('Unauthenticated API access was not rejected with JSON 401.')
 const protectedPage=await fetch(base+'/admin/dashboard',{redirect:'manual'});if(protectedPage.status!==302||protectedPage.headers.get('location')!=='/admin/login')throw Error('Unauthenticated dashboard access was not redirected to login.')
 await request('/api/initialize','POST',{session:'2026-27',collections:{},settings:{}})
 const created=await request('/api/setup','POST',{username:'acceptance-admin',password:'cms-test-password-2027'},false);if(created.success!==true||created.message!=='Admin account created successfully')throw Error(`Unexpected setup success payload: ${JSON.stringify(created)}`)
 const verifyDb=new DatabaseSync(join(dataDir,'nss.sqlite'),{readOnly:true});const savedAdmin=verifyDb.prepare('SELECT username,hash FROM admins').get();verifyDb.close();if(savedAdmin?.username!=='acceptance-admin'||!savedAdmin.hash||savedAdmin.hash==='cms-test-password-2027')throw Error('Admin account was not stored as a password hash in SQLite.')
 await request('/api/auth/login','POST',{username:'acceptance-admin',password:'cms-test-password-2027'},false)
 const loggedInPage=await fetch(base+'/admin/dashboard',{headers:{cookie},redirect:'manual'});if(loggedInPage.status!==200)throw Error('Authenticated admin dashboard route did not open.')
 const previous=await request('/api/admin/site');const old=previous.collections.team||[]
 for(const member of old)await request(`/api/admin/records/team/${member.id}`,'PUT',{...member,active:false})
 const session=await request('/api/admin/sessions','POST',{label:'2027-28'})
 await request(`/api/admin/sessions/${session.id}/current`,'POST',{})
 const png='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j4XcAAAAASUVORK5CYII='
 const photo=await request('/api/admin/upload','POST',{name:'member.png',type:'image/png',data:png})
 for(let i=1;i<=10;i++)await request('/api/admin/records/team','POST',{name:`Acceptance Member ${i}`,department:`Domain ${i%3+1}`,position:`Role ${i}`,year:'2027',domain:`Domain ${i%3+1}`,photo:photo.url,active:true})
 for(let i=1;i<=3;i++)await request('/api/admin/records/domains','POST',{name:`Domain ${i}`,description:`Domain ${i} description`,active:true})
 for(let i=1;i<=5;i++){const image=await request('/api/admin/upload','POST',{name:`activity-${i}.png`,type:'image/png',data:png});await request('/api/admin/records/activities','POST',{name:`Acceptance Activity ${i}`,description:'Acceptance test activity',date:'2027',location:'Pune',category:'Community Service',image:image.url,photos:[image.url],published:true})}
 for(let i=1;i<=3;i++)await request('/api/admin/records/notices','POST',{title:`Acceptance Notice ${i}`,summary:'Acceptance notice',date:'2027',important:i===1,published:true})
 for(let i=1;i<=2;i++)await request('/api/admin/records/events','POST',{title:`Acceptance Event ${i}`,date:'2027',venue:'Campus',description:'Acceptance event',registrationUrl:'',status:'upcoming',published:true})
 await request('/api/admin/records/achievements','POST',{title:'Acceptance Achievement',description:'Acceptance achievement',date:'2027',image:photo.url,published:true})
 await request('/api/admin/records/gallery','POST',{title:'Acceptance Gallery Photo',category:'Acceptance Album',image:photo.url,caption:'Uploaded and persisted',album:'Acceptance Album',published:true})
 await request('/api/admin/settings','PUT',{contact:{address:'Acceptance Address, Pune',email:'acceptance@example.test',phone:'0000000000'}})
 const publicSite=await request(`/api/public/site?session=${session.id}`,'GET',undefined,false)
 const checks={team:publicSite.collections.team.filter(x=>x.name.startsWith('Acceptance Member')).length,domains:publicSite.collections.domains.length,activities:publicSite.collections.activities.filter(x=>x.name.startsWith('Acceptance Activity')).length,notices:publicSite.collections.notices.filter(x=>x.title.startsWith('Acceptance Notice')).length,events:publicSite.collections.events.filter(x=>x.title.startsWith('Acceptance Event')).length,achievements:publicSite.collections.achievements.filter(x=>x.title==='Acceptance Achievement').length,gallery:publicSite.collections.gallery.filter(x=>x.album==='Acceptance Album').length,contact:publicSite.settings.contact.address,photo:await (await fetch(base+photo.url)).status}
 if(checks.team!==10||checks.domains!==3||checks.activities!==5||checks.notices!==3||checks.events!==2||checks.achievements!==1||checks.gallery!==1||checks.photo!==200||checks.contact!=='Acceptance Address, Pune')throw Error(`Acceptance checks failed: ${JSON.stringify(checks)}`)
 server.kill();await once(server,'exit');server=spawn(process.execPath,['server/index.mjs'],{env:{...process.env,NSS_CMS_DATA_DIR:dataDir,PORT:String(port)},stdio:'ignore'})
 for(let i=0;i<60;i++){try{await request('/api/setup-status','GET',undefined,false);break}catch{await delay(250)}}
 await request('/api/auth/logout','POST');cookie=''
 await request('/api/auth/login','POST',{username:'acceptance-admin',password:'cms-test-password-2027'},false)
 const afterRestart=await request(`/api/public/site?session=${session.id}`,'GET',undefined,false)
 const adminAfterRestart=await request('/api/admin/site')
 if(afterRestart.collections.team.filter(x=>x.name.startsWith('Acceptance Member')).length!==10||(await fetch(base+photo.url)).status!==200||!adminAfterRestart.sessions.some(x=>x.label==='2027-28'))throw Error('Saved admin, session content, or uploaded image did not persist after server restart.')
 console.log(JSON.stringify({session:afterRestart.session.label,persistedAfterRestart:true,checks},null,2))
}finally{server.kill();await once(server,'exit');rmSync(dataDir,{recursive:true,force:true})}

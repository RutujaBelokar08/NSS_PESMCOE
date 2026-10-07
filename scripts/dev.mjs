import { spawn } from 'node:child_process'
try { process.loadEnvFile('.env') } catch (error) { if (error.code !== 'ENOENT') throw error }
const children = [
  spawn(process.execPath, ['--watch', 'server/index.mjs'], { stdio:'inherit', env:process.env }),
  spawn(process.execPath, ['node_modules/vite/bin/vite.js'], { stdio:'inherit', env:process.env })
]
let stopping=false
function stop(code=0){if(stopping)return;stopping=true;for(const child of children)if(child.exitCode===null)child.kill();process.exitCode=code}
for(const child of children){child.on('exit',code=>{if(!stopping)stop(code||0)});child.on('error',()=>stop(1))}
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>stop(0))

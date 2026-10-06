import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type ProxyOptions } from 'vite'
import type { ServerResponse } from 'node:http'

const apiTarget = `http://127.0.0.1:${process.env.PORT || '4174'}`
const apiProxy: ProxyOptions = {
  target: apiTarget,
  changeOrigin: true,
  configure(proxy) {
    proxy.on('error', (_error, _request, response) => {
      const target=response as ServerResponse|undefined
      if (!target||target.headersSent) return
      target.writeHead(503, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
      target.end(JSON.stringify({ success: false, error: 'The NSS admin service is unavailable. Restart the development server and try again.' }))
    })
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy: { '/api': apiProxy, '/uploads': { target: apiTarget, changeOrigin: true } } },
})

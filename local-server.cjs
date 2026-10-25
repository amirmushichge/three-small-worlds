const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const root = path.join(__dirname, 'dist')
const portIndex = process.argv.indexOf('--port')
const port = Number(portIndex >= 0 ? process.argv[portIndex + 1] : 4183)
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Invalid port')
if (!fs.existsSync(path.join(root, 'index.html'))) throw new Error('Build missing: run npm run build')
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.glb': 'model/gltf-binary', '.wasm': 'application/wasm', '.woff': 'font/woff', '.woff2': 'font/woff2', '.png': 'image/png', '.txt': 'text/plain; charset=utf-8' }

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end()
    return
  }
  const pathname = new URL(req.url, 'http://127.0.0.1').pathname
  if (pathname === '/__health') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
    res.end(req.method === 'HEAD' ? undefined : JSON.stringify({ app: 'three-small-worlds', root: __dirname, pid: process.pid }))
    return
  }
  let relative
  try { relative = decodeURIComponent(pathname) } catch { res.writeHead(400).end(); return }
  if (relative === '/') relative = '/index.html'
  const target = path.resolve(root, '.' + relative)
  if (!target.startsWith(root + path.sep)) { res.writeHead(403).end(); return }
  fs.stat(target, (error, stat) => {
    if (error || !stat.isFile()) { res.writeHead(404).end('Not found'); return }
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream', 'Content-Length': stat.size, 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' })
    if (req.method === 'HEAD') { res.end(); return }
    const stream = fs.createReadStream(target)
    stream.on('error', () => res.destroy())
    stream.pipe(res)
  })
})
server.on('error', error => { console.error(error.message); process.exit(1) })
server.listen(port, '127.0.0.1', () => console.log(`Three Small Worlds: http://127.0.0.1:${port}/`))

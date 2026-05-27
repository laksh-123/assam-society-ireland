import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'])

function galleryManifestPlugin() {
  const galleryDir = path.resolve('public/gallery')
  const manifestPath = path.join(galleryDir, 'index.json')

  function generate() {
    if (!fs.existsSync(galleryDir)) return
    const files = fs.readdirSync(galleryDir)
      .filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
    fs.writeFileSync(manifestPath, JSON.stringify(files.map(f => ({ filename: f })), null, 2))
  }

  return {
    name: 'gallery-manifest',
    buildStart() { generate() },
    configureServer(server) {
      generate()
      server.watcher.on('add', f => { if (f.includes(`public${path.sep}gallery`)) generate() })
      server.watcher.on('unlink', f => { if (f.includes(`public${path.sep}gallery`)) generate() })
    },
  }
}

export default defineConfig({
  plugins: [react(), galleryManifestPlugin()],
})

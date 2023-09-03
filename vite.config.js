import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig ({
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        signup: resolve(__dirname, 'src/pages/signup/index.html'),
        chats: resolve(__dirname, 'src/pages/chats/index.html'),
        profile: resolve(__dirname, 'src/pages/profile/index.html'),
        '404': resolve(__dirname, 'src/pages/404/index.html'),
        '500': resolve(__dirname, 'src/pages/500/index.html')
      }
    }
  }
})
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig ({
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
})
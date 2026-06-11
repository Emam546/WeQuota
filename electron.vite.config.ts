import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@utils': resolve('./utils'),
        '@renderer': resolve('./src/renderer/')
      }
    }
  },
  preload: {},
  renderer: {
    build: {
      outDir: './out/windows/',
      rollupOptions: {
        input: {
          login: resolve(__dirname, 'src/renderer/login/index.html'),
          frame: resolve(__dirname, 'src/renderer/frame/index.html')
        }
      }
    },
    resolve: {
      alias: {
        '@utils': resolve('./utils'),
        '@renderer': resolve('./src/renderer/')
      }
    },
    plugins: [react(), tailwindcss()]
  }
})

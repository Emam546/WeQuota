import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@main': resolve('./src/main'),
        '@utils': resolve('./utils')
      }
    }
  },
  preload: {},
  renderer: {
    build: {
      outDir: './out/windows/',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/renderer/main/index.html'),
          frame: resolve(__dirname, 'src/renderer/frame/index.html'),
          captcha: resolve(__dirname, 'src/renderer/captcha/index.html')
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

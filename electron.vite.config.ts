import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        input: resolve(__dirname, 'app/main/index.ts')
      }
    },
    resolve: {
      alias: {
        '@main': resolve('./app/main'),
        '@utils': resolve('./utils')
      }
    }
  },
  preload: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, './app/preload/index.ts')
        }
      }
    }
  },
  renderer: {
    root: './app/renderer',
    build: {
      outDir: './out/windows/',
      rollupOptions: {
        input: {
          frame: resolve(__dirname, 'app/renderer/frame/index.html'),
          mini: resolve(__dirname, 'app/renderer/mini/index.html'),
          captcha: resolve(__dirname, 'app/renderer/captcha/index.html')
        }
      }
    },
    resolve: {
      alias: {
        '@components': resolve('./components'),
        '@utils': resolve('./utils'),
        '@renderer': resolve('./app/renderer/')
      }
    },
    plugins: [react(), tailwindcss()]
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { svgsprites } from './vite_plugins/svgsprites'

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const { command } = env
  return {
    define: {
      isDev: command === 'serve'
    },
    plugins: [
      Unocss(),
      react(),
      svgsprites({
        noOptimizeList: [
          'piggy',
          'logo',
          'chart',
          'category',
          'export',
          'notification',
          'calendar'
        ]
      })
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: any) {
            if (id.includes('echarts')) {
              return 'echarts'
            }
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          }
        }
      }
    }
  }
})

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
      svgsprites({ noOptimizeList: ['pig', 'logo', 'chart', 'category', 'export', 'noty', 'calendar'] })
    ]
  }
})


import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno
} from 'unocss';
import transformerAttributifyJsx from './transformerAttributifyJsx';

export default defineConfig({
  shortcuts: {
    'p-btn':
      'h-48px w-100% bg-#423d3c b-none text-white text-18px rounded-8px px-12px',
    'p-input-text':
      'h-48px px-16px leading-32px py-8px b-#423d3c b-1 focus:shadow focus:shadow-inset rounded-8px text-18px',
    'p-form': 'px-16px flex flex-col gap-y-8px children-flex children-flex-col',
    'p-form-label': 'text-18px mb-8px'
  },
  safelist: [],
  rules: [['h-screen', { height: 'calc(100vh - var(--vh-offset, 0px))' }]],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: { display: 'inline-block', 'vertical-align': 'middle' }
    }),
    presetTypography()
  ],
  transformers: [
    transformerAttributifyJsx()
  ],
})

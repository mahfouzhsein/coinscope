import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import '../app/assets/css/main.css'

setup((app) => {
  app.use(createPinia())
})

export default {
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#070b14' }] },
  },
}

import vue from '@vitejs/plugin-vue'

export default {
  stories: ['../stories/**/*.stories.js'],
  addons: [],
  framework: {
    name: '@storybook/vue3-vite',
    options: { docgen: 'vue-component-meta' },
  },
  async viteFinal(config) {
    config.plugins = [...(config.plugins || []), vue()]
    return config
  },
}

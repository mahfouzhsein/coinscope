export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxt/eslint', '@nuxtjs/storybook'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    coinGeckoApiKey: process.env.COINGECKO_API_KEY || '',
    public: {
      appName: 'CoinScope',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · CoinScope',
      meta: [
        { name: 'description', content: 'A production-focused crypto market intelligence dashboard built with Nuxt 4.' },
      ],
    },
  },
  typescript: {
    typeCheck: false,
  },
  storybook: {
    port: 6006,
  },
})

export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxt/eslint'],
  components: [{ path: '~/components', pathPrefix: false }],
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
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
  typescript: {
    typeCheck: false,
  },
})

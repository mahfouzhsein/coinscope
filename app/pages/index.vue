<script setup>
useSeoMeta({
  title: 'Market Overview',
  description: 'Track the crypto market, top movers and trending assets with CoinScope.',
})
</script>

<template>
  <section class="space-y-8">
    <div class="max-w-3xl space-y-4">
      <p class="eyebrow">Crypto market intelligence</p>
      <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl">See the market clearly.</h1>
      <p class="text-lg leading-8 text-slate-400">A fast, resilient Nuxt dashboard for tracking global crypto metrics, market leaders and assets worth watching.</p>
    </div>

    <MarketOverview />
    <div class="grid gap-6 lg:grid-cols-[1fr_1.35fr]">
      <TrendingCoins />
      <MarketPreview />
    </div>
  </section>
</template>

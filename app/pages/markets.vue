<script setup>
useSeoMeta({ title: 'Markets' })
</script>

<template>
  <section class="space-y-6">
    <div>
      <p class="eyebrow">Live market data</p>
      <h1 class="mt-2 text-3xl font-bold text-white">Markets</h1>
      <p class="mt-2 text-slate-400">Search, sort and inspect the assets driving the market.</p>
    </div>
    <MarketTable />
  </section>
</template>

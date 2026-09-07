<script setup>
const { currency } = useFormatters()
const { data, status, error, refresh } = await useFetch('/api/coins', { query: { perPage: 6, currency: 'usd' }, default: () => [] })
</script>

<template>
  <BaseErrorState v-if="error" title="Market leaders unavailable" @retry="refresh" />
  <section v-else class="surface overflow-hidden">
    <div class="flex items-center justify-between p-5">
      <div>
        <p class="eyebrow">Leaders</p>
        <h2 class="mt-1 text-xl font-semibold text-white">Largest assets</h2>
      </div>
      <NuxtLink to="/markets" class="text-sm font-medium text-cyan-300 hover:text-cyan-200">View markets →</NuxtLink>
    </div>
    <BaseSkeleton v-if="status === 'pending'" class="p-5" :lines="6" />
    <div v-else class="divide-y divide-slate-800">
      <NuxtLink v-for="coin in data" :key="coin.id" :to="`/coin/${coin.id}`" class="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 px-5 py-3 transition hover:bg-slate-800/40">
        <span class="w-5 text-xs text-slate-600">{{ coin.market_cap_rank }}</span>
        <div class="flex min-w-0 items-center gap-3">
          <img :src="coin.image" :alt="coin.name" class="size-8 rounded-full" loading="lazy">
          <div class="min-w-0"><p class="truncate text-sm font-medium text-white">{{ coin.name }}</p><p class="text-xs uppercase text-slate-500">{{ coin.symbol }}</p></div>
        </div>
        <span class="text-sm tabular-nums text-slate-200">{{ currency(coin.current_price) }}</span>
        <CoinChange :value="coin.price_change_percentage_24h" class="w-16 text-right text-sm" />
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
const { compact } = useFormatters()
const { data, status, error, refresh } = await useFetch('/api/market/global')

const stats = computed(() => [
  { label: 'Market cap', value: compact(data.value?.total_market_cap?.usd || 0) },
  { label: '24h volume', value: compact(data.value?.total_volume?.usd || 0) },
  { label: 'BTC dominance', value: `${Number(data.value?.market_cap_percentage?.btc || 0).toFixed(1)}%` },
  { label: 'Active coins', value: new Intl.NumberFormat('en-US').format(data.value?.active_cryptocurrencies || 0) },
])
</script>

<template>
  <BaseErrorState v-if="error" title="Global market metrics unavailable" @retry="refresh" />
  <div v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <div v-for="stat in stats" :key="stat.label" class="surface p-5">
      <p class="text-sm text-slate-500">{{ stat.label }}</p>
      <BaseSkeleton v-if="status === 'pending'" class="mt-3" />
      <p v-else class="mt-2 text-2xl font-semibold tracking-tight text-white">{{ stat.value }}</p>
    </div>
  </div>
</template>

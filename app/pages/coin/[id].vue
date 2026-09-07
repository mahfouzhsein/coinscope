<script setup>
import { stripHtml } from '~/utils/formatters'

const route = useRoute()
const preferences = usePreferencesStore()
const { currency, compact, percent } = useFormatters()
const range = ref('7')

onMounted(() => preferences.hydrate())

const id = computed(() => String(route.params.id))
const { data: coin, status, error, refresh } = await useFetch(() => `/api/coins/${id.value}`)

useSeoMeta({
  title: () => coin.value?.name || 'Asset details',
  description: () => coin.value ? `Market data, statistics and price history for ${coin.value.name}.` : 'Crypto asset market details.',
})

const stats = computed(() => {
  const market = coin.value?.market_data
  if (!market) return []
  const code = preferences.currency
  return [
    ['Market cap', compact(market.market_cap?.[code] || 0, code)],
    ['24h volume', compact(market.total_volume?.[code] || 0, code)],
    ['24h high', currency(market.high_24h?.[code] || 0, code)],
    ['24h low', currency(market.low_24h?.[code] || 0, code)],
    ['Circulating supply', new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 2 }).format(market.circulating_supply || 0)],
    ['All-time high', currency(market.ath?.[code] || 0, code)],
  ]
})

const description = computed(() => stripHtml(coin.value?.description?.en || '').split('. ').slice(0, 4).join('. '))
</script>

<template>
  <BaseErrorState v-if="error" title="Asset details unavailable" @retry="refresh" />
  <div v-else-if="status === 'pending'" class="space-y-6"><div class="surface p-8"><BaseSkeleton :lines="5" /></div><div class="surface p-8"><BaseSkeleton :lines="8" /></div></div>
  <section v-else-if="coin" class="space-y-6">
    <div class="surface overflow-hidden p-6 sm:p-8">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div class="flex items-center gap-4">
          <img :src="coin.image?.large" :alt="coin.name" class="size-14 rounded-full sm:size-16">
          <div>
            <div class="flex items-center gap-2"><h1 class="text-3xl font-bold text-white">{{ coin.name }}</h1><span class="rounded-md bg-slate-800 px-2 py-1 text-xs uppercase text-slate-400">{{ coin.symbol }}</span></div>
            <p class="mt-1 text-sm text-slate-500">Market rank #{{ coin.market_cap_rank || '—' }}</p>
          </div>
        </div>
        <CoinWatchButton :id="coin.id" />
      </div>

      <div class="mt-8 flex flex-wrap items-end gap-x-4 gap-y-2">
        <p class="text-4xl font-bold tracking-tight text-white">{{ currency(coin.market_data?.current_price?.[preferences.currency] || 0, preferences.currency) }}</p>
        <CoinChange :value="coin.market_data?.price_change_percentage_24h || 0" class="pb-1 text-lg" />
      </div>
      <p class="mt-2 text-sm text-slate-500">24h change {{ percent(coin.market_data?.price_change_percentage_24h || 0) }}</p>
    </div>

    <div class="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
      <PriceChart :id="coin.id" v-model:range="range" :currency="preferences.currency" />
      <div class="surface p-6">
        <p class="eyebrow">Snapshot</p>
        <h2 class="mt-1 text-xl font-semibold text-white">Market statistics</h2>
        <dl class="mt-5 divide-y divide-slate-800">
          <div v-for="([label, value]) in stats" :key="label" class="flex items-center justify-between gap-4 py-3">
            <dt class="text-sm text-slate-500">{{ label }}</dt><dd class="text-right text-sm font-medium text-slate-200">{{ value }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <div v-if="description" class="surface p-6 sm:p-8">
      <p class="eyebrow">About</p>
      <h2 class="mt-1 text-xl font-semibold text-white">{{ coin.name }}</h2>
      <p class="mt-4 max-w-4xl text-sm leading-7 text-slate-400">{{ description }}</p>
    </div>
  </section>
</template>

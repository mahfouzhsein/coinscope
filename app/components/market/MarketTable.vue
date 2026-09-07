<script setup>
const preferences = usePreferencesStore()
const { currency, compact } = useFormatters()
const search = ref('')
const page = ref(1)
const sortKey = ref('market_cap_rank')
const sortDirection = ref('asc')

onMounted(() => preferences.hydrate())

const query = computed(() => ({
  currency: preferences.currency,
  page: page.value,
  perPage: preferences.rowsPerPage,
}))

const { data, status, error, refresh } = await useFetch('/api/coins', { query, default: () => [] })

const filtered = computed(() => {
  const needle = search.value.trim().toLowerCase()
  const rows = needle ? data.value.filter((coin) => `${coin.name} ${coin.symbol}`.toLowerCase().includes(needle)) : [...data.value]
  return rows.sort((a, b) => {
    const left = a[sortKey.value] ?? 0
    const right = b[sortKey.value] ?? 0
    return (left > right ? 1 : left < right ? -1 : 0) * (sortDirection.value === 'asc' ? 1 : -1)
  })
})

function sortBy(key) {
  if (sortKey.value === key) sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  else {
    sortKey.value = key
    sortDirection.value = key === 'market_cap_rank' ? 'asc' : 'desc'
  }
}
</script>

<template>
  <section class="surface overflow-hidden">
    <div class="flex flex-col gap-3 border-b border-slate-800 p-4 sm:flex-row sm:items-center sm:justify-between">
      <input v-model="search" type="search" placeholder="Search this page…" class="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60 sm:max-w-sm">
      <div class="flex gap-2">
        <select v-model="preferences.currency" class="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm uppercase text-slate-300 outline-none">
          <option value="usd">USD</option><option value="eur">EUR</option><option value="gbp">GBP</option>
        </select>
        <select v-model.number="preferences.rowsPerPage" class="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-300 outline-none">
          <option :value="10">10 rows</option><option :value="20">20 rows</option><option :value="50">50 rows</option>
        </select>
      </div>
    </div>

    <BaseErrorState v-if="error" class="m-4" @retry="refresh" />
    <div v-else-if="status === 'pending'" class="p-6"><BaseSkeleton :lines="8" /></div>
    <div v-else>
      <div class="hidden overflow-x-auto md:block">
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-950/60 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th class="px-5 py-3"><button @click="sortBy('market_cap_rank')">#</button></th>
              <th class="px-5 py-3">Asset</th>
              <th class="px-5 py-3 text-right"><button @click="sortBy('current_price')">Price</button></th>
              <th class="px-5 py-3 text-right"><button @click="sortBy('price_change_percentage_24h')">24h</button></th>
              <th class="px-5 py-3 text-right"><button @click="sortBy('market_cap')">Market cap</button></th>
              <th class="px-5 py-3 text-right">Watch</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            <tr v-for="coin in filtered" :key="coin.id" class="transition hover:bg-slate-800/30">
              <td class="px-5 py-4 text-slate-600">{{ coin.market_cap_rank }}</td>
              <td class="px-5 py-4"><NuxtLink :to="`/coin/${coin.id}`" class="flex items-center gap-3"><img :src="coin.image" :alt="coin.name" class="size-9 rounded-full"><div><p class="font-medium text-white">{{ coin.name }}</p><p class="text-xs uppercase text-slate-500">{{ coin.symbol }}</p></div></NuxtLink></td>
              <td class="px-5 py-4 text-right tabular-nums text-slate-200">{{ currency(coin.current_price, preferences.currency) }}</td>
              <td class="px-5 py-4 text-right"><CoinChange :value="coin.price_change_percentage_24h" /></td>
              <td class="px-5 py-4 text-right tabular-nums text-slate-400">{{ compact(coin.market_cap, preferences.currency) }}</td>
              <td class="px-5 py-4"><div class="flex justify-end"><CoinWatchButton :id="coin.id" /></div></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="divide-y divide-slate-800 md:hidden">
        <NuxtLink v-for="coin in filtered" :key="coin.id" :to="`/coin/${coin.id}`" class="grid grid-cols-[auto_1fr_auto] items-center gap-3 p-4">
          <img :src="coin.image" :alt="coin.name" class="size-10 rounded-full">
          <div class="min-w-0"><p class="truncate font-medium text-white">{{ coin.name }}</p><p class="text-xs uppercase text-slate-500">{{ coin.symbol }}</p></div>
          <div class="text-right"><p class="text-sm text-slate-200">{{ currency(coin.current_price, preferences.currency) }}</p><CoinChange :value="coin.price_change_percentage_24h" class="text-xs" /></div>
        </NuxtLink>
      </div>

      <div v-if="!filtered.length" class="p-10 text-center text-sm text-slate-500">No assets match your search.</div>
      <div class="flex items-center justify-between border-t border-slate-800 p-4">
        <button class="rounded-lg border border-slate-800 px-3 py-2 text-sm text-slate-300 disabled:opacity-30" :disabled="page === 1" @click="page--">← Previous</button>
        <span class="text-sm text-slate-500">Page {{ page }}</span>
        <button class="rounded-lg border border-slate-800 px-3 py-2 text-sm text-slate-300" @click="page++">Next →</button>
      </div>
    </div>
  </section>
</template>

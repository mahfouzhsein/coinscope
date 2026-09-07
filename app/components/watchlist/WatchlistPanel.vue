<script setup>
const watchlist = useWatchlistStore()
const preferences = usePreferencesStore()
const { currency } = useFormatters()
const coins = ref([])
const pending = ref(false)
const error = ref(null)

onMounted(async () => {
  watchlist.hydrate()
  preferences.hydrate()
  await load()
})

watch(() => watchlist.ids.join(','), () => load())

async function load() {
  if (!watchlist.hydrated || !watchlist.ids.length) {
    coins.value = []
    return
  }
  pending.value = true
  error.value = null
  try {
    coins.value = await $fetch('/api/coins', { query: { ids: watchlist.ids.join(','), perPage: 100, currency: preferences.currency } })
  } catch (cause) {
    error.value = cause
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <BaseErrorState v-if="error" @retry="load" />
  <div v-else-if="pending" class="surface p-6"><BaseSkeleton :lines="6" /></div>
  <div v-else-if="!watchlist.ids.length" class="surface p-10 text-center">
    <div class="mx-auto grid size-14 place-items-center rounded-2xl bg-slate-800 text-2xl text-amber-300">☆</div>
    <h2 class="mt-4 text-lg font-semibold text-white">Your watchlist is empty</h2>
    <p class="mx-auto mt-2 max-w-md text-sm text-slate-400">Add assets from the Markets page to keep your highest-conviction coins in one persistent view.</p>
    <NuxtLink to="/markets" class="mt-5 inline-flex rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">Explore markets</NuxtLink>
  </div>
  <div v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    <article v-for="coin in coins" :key="coin.id" class="surface p-5">
      <div class="flex items-start justify-between gap-4">
        <NuxtLink :to="`/coin/${coin.id}`" class="flex min-w-0 items-center gap-3">
          <img :src="coin.image" :alt="coin.name" class="size-10 rounded-full">
          <div class="min-w-0"><h2 class="truncate font-semibold text-white">{{ coin.name }}</h2><p class="text-xs uppercase text-slate-500">{{ coin.symbol }}</p></div>
        </NuxtLink>
        <CoinWatchButton :id="coin.id" />
      </div>
      <div class="mt-5 flex items-end justify-between"><p class="text-xl font-semibold text-white">{{ currency(coin.current_price, preferences.currency) }}</p><CoinChange :value="coin.price_change_percentage_24h" /></div>
    </article>
  </div>
</template>

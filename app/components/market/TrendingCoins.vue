<script setup>
const { data, status, error, refresh } = await useFetch('/api/market/trending', { default: () => [] })
</script>

<template>
  <BaseErrorState v-if="error" title="Trending assets unavailable" @retry="refresh" />
  <section v-else class="surface p-5">
    <div class="mb-5 flex items-center justify-between">
      <div>
        <p class="eyebrow">Momentum</p>
        <h2 class="mt-1 text-xl font-semibold text-white">Trending now</h2>
      </div>
      <span class="text-xs text-slate-500">CoinGecko</span>
    </div>

    <div v-if="status === 'pending'" class="space-y-5"><BaseSkeleton :lines="5" /></div>
    <div v-else class="divide-y divide-slate-800">
      <NuxtLink v-for="entry in data.slice(0, 6)" :key="entry.item.id" :to="`/coin/${entry.item.id}`" class="flex items-center gap-3 py-3 transition hover:translate-x-1">
        <img :src="entry.item.small" :alt="entry.item.name" class="size-8 rounded-full" loading="lazy">
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium text-white">{{ entry.item.name }}</p>
          <p class="text-xs uppercase text-slate-500">{{ entry.item.symbol }}</p>
        </div>
        <span class="text-xs text-slate-500">#{{ entry.item.market_cap_rank || '—' }}</span>
      </NuxtLink>
    </div>
  </section>
</template>

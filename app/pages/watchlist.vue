<script setup>
useSeoMeta({ title: 'Watchlist' })
</script>

<template>
  <section class="space-y-6">
    <div>
      <p class="eyebrow">Your market</p>
      <h1 class="mt-2 text-3xl font-bold text-white">Watchlist</h1>
      <p class="mt-2 text-slate-400">A persistent shortlist of the assets you care about most.</p>
    </div>
    <WatchlistPanel />
  </section>
</template>

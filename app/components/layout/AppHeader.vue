<script setup>
const links = [
  { label: 'Overview', to: '/' },
  { label: 'Markets', to: '/markets' },
  { label: 'Watchlist', to: '/watchlist' },
]
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-slate-900/80 bg-slate-950/80 backdrop-blur-xl">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <NuxtLink to="/" class="flex items-center gap-3 font-semibold tracking-tight text-white">
        <span class="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-sm font-black text-slate-950">CS</span>
        <span>CoinScope</span>
      </NuxtLink>

      <nav class="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/60 p-1">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
          active-class="!bg-slate-800 !text-white"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

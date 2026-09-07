<template>
  <div class="min-h-screen">
    <AppHeader />
    <main class="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <slot />
    </main>
    <footer class="mx-auto max-w-7xl border-t border-slate-900 px-4 py-8 text-sm text-slate-500 sm:px-6 lg:px-8">
      CoinScope · Built with Nuxt 4, Pinia and Tailwind CSS.
    </footer>
  </div>
</template>

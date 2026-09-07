<script setup>
defineProps({
  title: { type: String, default: 'Unable to load data' },
  message: { type: String, default: 'Something interrupted the request. Try again in a moment.' },
})

defineEmits(['retry'])
</script>

<template>
  <div class="surface flex flex-col items-start gap-3 p-6">
    <span class="rounded-full bg-rose-400/10 px-3 py-1 text-xs font-semibold text-rose-300">Data unavailable</span>
    <div>
      <h3 class="font-semibold text-white">{{ title }}</h3>
      <p class="mt-1 text-sm text-slate-400">{{ message }}</p>
    </div>
    <button class="rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700" @click="$emit('retry')">Retry</button>
  </div>
</template>

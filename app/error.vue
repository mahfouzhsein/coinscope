<script setup>
defineProps({ error: { type: Object, required: true } })
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="grid min-h-screen place-items-center bg-slate-950 px-6 text-center text-slate-100">
    <div class="max-w-lg">
      <p class="eyebrow">{{ error.statusCode || 500 }}</p>
      <h1 class="mt-3 text-4xl font-bold text-white">That market route went off-chart.</h1>
      <p class="mt-4 text-slate-400">{{ error.statusMessage || 'The requested page could not be loaded.' }}</p>
      <button class="mt-6 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950" @click="handleError">Back to overview</button>
    </div>
  </div>
</template>

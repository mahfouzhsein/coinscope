<script setup>
defineProps({
  lines: { type: Number, default: 1 },
})
</script>

<template>
  <div class="animate-pulse space-y-3" aria-hidden="true">
    <div v-for="line in lines" :key="line" class="h-4 rounded-full bg-slate-800" :class="line === lines ? 'w-2/3' : 'w-full'" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useWatchlistStore } from '~/stores/watchlist'

const props = defineProps({ id: { type: String, required: true } })
const watchlist = useWatchlistStore()
onMounted(() => watchlist.hydrate())
</script>

<template>
  <button
    type="button"
    class="grid size-9 place-items-center rounded-lg border border-slate-800 bg-slate-900 text-lg transition hover:border-cyan-400/50 hover:text-cyan-300"
    :class="watchlist.has(props.id) ? 'text-amber-300' : 'text-slate-500'"
    :aria-label="watchlist.has(props.id) ? 'Remove from watchlist' : 'Add to watchlist'"
    @click.stop="watchlist.toggle(props.id)"
  >
    {{ watchlist.has(props.id) ? '★' : '☆' }}
  </button>
</template>

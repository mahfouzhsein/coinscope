import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useWatchlistStore = defineStore('watchlist', () => {
  const ids = ref([])
  const hydrated = ref(false)

  const has = (id) => ids.value.includes(id)

  const toggle = (id) => {
    ids.value = has(id) ? ids.value.filter((item) => item !== id) : [...ids.value, id]
  }

  const hydrate = () => {
    if (!import.meta.client || hydrated.value) return
    try {
      ids.value = JSON.parse(localStorage.getItem('coinscope:watchlist') || '[]')
    } catch {
      ids.value = []
    }
    hydrated.value = true
  }

  watch(ids, (value) => {
    if (import.meta.client && hydrated.value) localStorage.setItem('coinscope:watchlist', JSON.stringify(value))
  }, { deep: true })

  return { ids, hydrated, has, toggle, hydrate }
})

export const usePreferencesStore = defineStore('preferences', () => {
  const currency = ref('usd')
  const rowsPerPage = ref(20)

  const hydrate = () => {
    if (!import.meta.client) return
    currency.value = localStorage.getItem('coinscope:currency') || 'usd'
    rowsPerPage.value = Number(localStorage.getItem('coinscope:rows') || 20)
  }

  watch(currency, (value) => {
    if (import.meta.client) localStorage.setItem('coinscope:currency', value)
  })

  watch(rowsPerPage, (value) => {
    if (import.meta.client) localStorage.setItem('coinscope:rows', String(value))
  })

  return { currency, rowsPerPage, hydrate }
})

export function formatCurrency(value, code = 'usd', options = {}) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: code.toUpperCase(),
    maximumFractionDigits: Number(value) < 1 ? 6 : 2,
    ...options,
  }).format(Number(value || 0))
}

export function formatCompactCurrency(value, code = 'usd') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: code.toUpperCase(),
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(Number(value || 0))
}

export function formatPercent(value) {
  const numeric = Number(value || 0)
  return `${numeric > 0 ? '+' : ''}${numeric.toFixed(2)}%`
}

export function stripHtml(value = '') {
  return String(value).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

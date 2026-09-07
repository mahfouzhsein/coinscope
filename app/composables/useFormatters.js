export function useFormatters() {
  const currency = (value, code = 'usd', options = {}) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: code.toUpperCase(),
    maximumFractionDigits: value < 1 ? 6 : 2,
    ...options,
  }).format(Number(value || 0))

  const compact = (value, code = 'usd') => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: code.toUpperCase(),
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(Number(value || 0))

  const percent = (value) => `${Number(value || 0) > 0 ? '+' : ''}${Number(value || 0).toFixed(2)}%`

  return { currency, compact, percent }
}

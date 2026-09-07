import { formatCompactCurrency, formatCurrency, formatPercent } from '~/utils/formatters'

export function useFormatters() {
  return {
    currency: formatCurrency,
    compact: formatCompactCurrency,
    percent: formatPercent,
  }
}

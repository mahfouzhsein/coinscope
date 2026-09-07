import { coinGeckoFetch } from '../../utils/coingecko'

const currencies = new Set(['usd', 'eur', 'gbp'])

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const currency = currencies.has(String(query.currency || '').toLowerCase()) ? String(query.currency).toLowerCase() : 'usd'
  const page = Math.max(1, Number(query.page) || 1)
  const perPage = Math.min(100, Math.max(1, Number(query.perPage) || 20))
  const ids = typeof query.ids === 'string' ? query.ids : undefined

  setHeader(event, 'Cache-Control', 'public, max-age=20, s-maxage=45')

  return coinGeckoFetch('/coins/markets', {
    query: {
      vs_currency: currency,
      order: 'market_cap_desc',
      per_page: perPage,
      page,
      sparkline: true,
      price_change_percentage: '1h,24h,7d',
      ids,
    },
  })
})

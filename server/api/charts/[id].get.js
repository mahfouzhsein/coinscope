import { coinGeckoFetch } from '../../utils/coingecko'

const allowedDays = new Set(['1', '7', '30', '90', '365'])
const currencies = new Set(['usd', 'eur', 'gbp'])

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const query = getQuery(event)
  const days = allowedDays.has(String(query.days)) ? String(query.days) : '7'
  const currency = currencies.has(String(query.currency || '').toLowerCase()) ? String(query.currency).toLowerCase() : 'usd'

  if (!id || !/^[a-z0-9-]+$/i.test(id)) throw createError({ statusCode: 400, statusMessage: 'Invalid coin id.' })

  setHeader(event, 'Cache-Control', 'public, max-age=60, s-maxage=180')
  return coinGeckoFetch(`/coins/${id}/market_chart`, {
    query: { vs_currency: currency, days },
  })
})

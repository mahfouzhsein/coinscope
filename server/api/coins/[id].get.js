import { coinGeckoFetch } from '../../utils/coingecko'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id || !/^[a-z0-9-]+$/i.test(id)) throw createError({ statusCode: 400, statusMessage: 'Invalid coin id.' })

  setHeader(event, 'Cache-Control', 'public, max-age=30, s-maxage=60')
  return coinGeckoFetch(`/coins/${id}`, {
    query: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false,
    },
  })
})

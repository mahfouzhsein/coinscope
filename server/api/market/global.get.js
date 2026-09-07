import { coinGeckoFetch } from '../../utils/coingecko'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'public, max-age=30, s-maxage=60')
  const response = await coinGeckoFetch('/global')
  return response.data
})

import { coinGeckoFetch } from '../../utils/coingecko'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'public, max-age=60, s-maxage=120')
  const response = await coinGeckoFetch('/search/trending')
  return response.coins || []
})

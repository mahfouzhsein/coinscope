const BASE_URL = 'https://api.coingecko.com/api/v3'

export async function coinGeckoFetch(path, options = {}) {
  const config = useRuntimeConfig()
  const headers = { ...(options.headers || {}) }

  if (config.coinGeckoApiKey) {
    headers['x-cg-demo-api-key'] = config.coinGeckoApiKey
  }

  try {
    return await $fetch(`${BASE_URL}${path}`, {
      ...options,
      headers,
      timeout: 10000,
    })
  } catch (error) {
    const statusCode = error?.response?.status || error?.statusCode || 502
    const message = statusCode === 429
      ? 'CoinGecko rate limit reached. Please retry shortly.'
      : 'Market data is temporarily unavailable.'

    throw createError({ statusCode, statusMessage: message })
  }
}

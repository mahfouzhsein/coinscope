# CoinScope Project Specification

## Goal

Create a recruiter-ready Nuxt portfolio application that demonstrates production-minded frontend architecture rather than a tutorial CRUD pattern.

## Stack

- Nuxt 4
- Vue 3 Composition API
- JavaScript
- Pinia
- Tailwind CSS
- Storybook
- CoinGecko API through Nuxt server routes
- Chart.js / vue-chartjs
- Vitest
- ESLint
- GitHub Actions

## Product scope

- Global market overview
- Trending assets
- Paginated market explorer
- Search and client-side sorting
- Currency preference
- Persistent watchlist
- Asset details
- Historical price chart with multiple ranges
- Responsive desktop/mobile presentation
- Explicit loading, empty and error states
- Storybook documentation for reusable component states

## Architectural rules

1. External API calls pass through `server/api`.
2. Nuxt data-fetching primitives own remote data.
3. Pinia owns shared/persistent application state.
4. Reusable components are domain-grouped.
5. User-visible failures provide a retry path.
6. Environment values are documented through `.env.example`.

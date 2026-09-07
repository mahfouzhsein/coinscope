import CoinChange from '../app/components/coin/CoinChange.vue'

export default { title: 'Coin/CoinChange', component: CoinChange, args: { value: 4.21 } }
export const Positive = {}
export const Negative = { args: { value: -6.73 } }
export const Neutral = { args: { value: 0 } }

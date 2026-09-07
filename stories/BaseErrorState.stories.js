import BaseErrorState from '../app/components/base/BaseErrorState.vue'

export default { title: 'Base/ErrorState', component: BaseErrorState }
export const Default = { args: { title: 'Market data unavailable', message: 'The upstream provider could not be reached.' } }
export const RateLimited = { args: { title: 'Rate limit reached', message: 'Please retry shortly while the data provider resets its quota.' } }

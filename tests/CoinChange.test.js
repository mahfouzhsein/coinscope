import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CoinChange from '../app/components/coin/CoinChange.vue'

describe('CoinChange', () => {
  it('renders a positive formatted percentage', () => {
    const wrapper = mount(CoinChange, { props: { value: 4.21 } })
    expect(wrapper.text()).toBe('+4.21%')
    expect(wrapper.classes()).toContain('text-emerald-400')
  })

  it('renders a negative formatted percentage', () => {
    const wrapper = mount(CoinChange, { props: { value: -6.73 } })
    expect(wrapper.text()).toBe('-6.73%')
    expect(wrapper.classes()).toContain('text-rose-400')
  })
})

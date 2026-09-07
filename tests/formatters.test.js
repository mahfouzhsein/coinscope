import { describe, expect, it } from 'vitest'
import { formatCompactCurrency, formatCurrency, formatPercent, stripHtml } from '../app/utils/formatters'

describe('formatters', () => {
  it('formats regular currency values', () => {
    expect(formatCurrency(1234.5, 'usd')).toBe('$1,234.50')
  })

  it('keeps precision for sub-dollar values', () => {
    expect(formatCurrency(0.000123, 'usd')).toContain('0.000123')
  })

  it('formats compact market values', () => {
    expect(formatCompactCurrency(1500000000, 'usd')).toBe('$1.50B')
  })

  it('formats signed percentages', () => {
    expect(formatPercent(4.236)).toBe('+4.24%')
    expect(formatPercent(-2.1)).toBe('-2.10%')
  })

  it('strips provider HTML from descriptions', () => {
    expect(stripHtml('<p>Bitcoin <strong>network</strong></p>')).toBe('Bitcoin network')
  })
})

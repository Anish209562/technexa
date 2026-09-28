import { describe, expect, it } from 'vitest'
import { insights } from './insights'

describe('insights catalog', () => {
  it('uses unique article slugs', () => {
    expect(new Set(insights.map(article => article.slug)).size).toBe(insights.length)
  })

  it('contains complete article sections', () => {
    for (const article of insights) {
      expect(article.summary.length).toBeGreaterThan(30)
      expect(article.sections.length).toBeGreaterThanOrEqual(3)
      expect(article.sections.every(section => section[0] && section[1])).toBe(true)
    }
  })
})

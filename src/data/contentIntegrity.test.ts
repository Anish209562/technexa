import { describe, expect, it } from 'vitest'
import { insights } from './insights'
import { projects } from './projects'
import { services } from './services'

describe('content integrity', () => {
  it('has non-empty public summaries across main catalogs', () => {
    const summaries = [
      ...services.map(service => service.description),
      ...projects.map(project => project.summary),
      ...insights.map(article => article.summary),
    ]
    expect(summaries.every(summary => summary.length > 40)).toBe(true)
  })

  it('keeps service numbers in display order', () => {
    expect(services.map(service => service.number)).toEqual(['01', '02', '03', '04', '05'])
  })
})

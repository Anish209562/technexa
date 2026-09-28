import { describe, expect, it } from 'vitest'
import { faqs, process, services, technologies } from './services'

describe('services catalog', () => {
  it('contains unique service slugs', () => {
    expect(new Set(services.map(service => service.slug)).size).toBe(services.length)
  })

  it('maps every service to a project and technology stack', () => {
    for (const service of services) {
      expect(service.project).toBeTruthy()
      expect(service.stack.length).toBeGreaterThanOrEqual(3)
    }
  })

  it('keeps the delivery process ordered', () => {
    expect(process.map(step => step[0])).toEqual([
      'Discovery',
      'System design',
      'Experience design',
      'Engineering',
      'Validation',
      'Deployment',
      'Evolution',
    ])
  })

  it('has enough public-facing support content', () => {
    expect(faqs.length).toBeGreaterThanOrEqual(4)
    expect(technologies.length).toBeGreaterThanOrEqual(6)
  })
})

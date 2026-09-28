import { describe, expect, it } from 'vitest'
import { projects } from './projects'
import { services } from './services'

describe('projects catalog', () => {
  it('uses unique project slugs', () => {
    expect(new Set(projects.map(project => project.slug)).size).toBe(projects.length)
  })

  it('links each project to an existing service', () => {
    const serviceSlugs = new Set(services.map(service => service.slug))
    for (const project of projects) {
      expect(serviceSlugs.has(project.service)).toBe(true)
    }
  })

  it('documents architecture and outcomes for each study', () => {
    for (const project of projects) {
      expect(project.architecture.length).toBeGreaterThanOrEqual(5)
      expect(project.outcome).toMatch(/concept|study|sample|illustrates/i)
    }
  })
})

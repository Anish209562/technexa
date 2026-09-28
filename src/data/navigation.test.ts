import { describe, expect, it } from 'vitest'
import { insights } from './insights'
import { projects } from './projects'
import { services } from './services'

describe('content navigation', () => {
  it('keeps service project references resolvable', () => {
    const projectSlugs = new Set(projects.map(project => project.slug))
    expect(services.every(service => projectSlugs.has(service.project))).toBe(true)
  })

  it('keeps route slugs URL-safe', () => {
    const slugs = [...services, ...projects, ...insights].map(item => item.slug)
    expect(slugs.every(slug => /^[a-z0-9-]+$/.test(slug))).toBe(true)
  })
})

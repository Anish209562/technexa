import { describe, expect, it } from 'vitest'
import { getMetadata } from './metadata'
import { services } from '../data/services'
import { projects } from '../data/projects'
import { insights } from '../data/insights'

describe('getMetadata', () => {
  it('returns the homepage metadata', () => {
    expect(getMetadata('/')).toMatchObject({
      title: 'Engineering your next unfair advantage',
      type: 'WebPage',
    })
  })

  it('normalizes trailing slashes', () => {
    expect(getMetadata('/about/')).toEqual(getMetadata('/about'))
  })

  it('returns service metadata from the service catalog', () => {
    const service = services[0]
    expect(getMetadata(`/expertise/${service.slug}`)).toMatchObject({
      title: service.name,
      description: service.description,
      type: 'Service',
    })
  })

  it('supports both portfolio and legacy work project routes', () => {
    const project = projects[0]
    expect(getMetadata(`/portfolio/${project.slug}`).description).toBe(project.summary)
    expect(getMetadata(`/work/${project.slug}`).description).toBe(project.summary)
  })

  it('returns article metadata for insight routes', () => {
    const article = insights[0]
    expect(getMetadata(`/insights/${article.slug}`)).toMatchObject({
      title: article.title,
      type: 'Article',
    })
  })
})

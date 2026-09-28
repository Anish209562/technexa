import { describe, expect, it } from 'vitest'
import { getMetadata } from './metadata'

const requiredRoutes = ['/', '/expertise', '/portfolio', '/about', '/insights', '/contact', '/start-a-project', '/privacy', '/terms']

describe('static route metadata', () => {
  it('provides title and description for every primary route', () => {
    for (const route of requiredRoutes) {
      const metadata = getMetadata(route)
      expect(metadata.title).toBeTruthy()
      expect(metadata.description.length).toBeGreaterThan(30)
    }
  })

  it('returns a not-found fallback for unknown routes', () => {
    expect(getMetadata('/missing-page')).toMatchObject({
      title: 'Page not found',
      type: 'WebPage',
    })
  })
})

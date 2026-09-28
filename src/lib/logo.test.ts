import { describe, expect, it } from 'vitest'
import { LOGO_SPAN, LOGO_VIEW_BOX, SVG_PATHS, buildLogoShapes } from './logo'

describe('logo geometry', () => {
  it('keeps the exported SVG paths and view box stable', () => {
    expect(LOGO_VIEW_BOX).toBe('0 0 212 212')
    expect(SVG_PATHS).toHaveLength(3)
  })

  it('builds three shapes for the Three.js sculpture', () => {
    expect(buildLogoShapes()).toHaveLength(3)
    expect(LOGO_SPAN).toBeGreaterThan(190)
  })
})

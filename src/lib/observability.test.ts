import { describe, expect, it } from 'vitest'
import { operationalEndpoints, recordClientMetric } from './observability'

describe('observability helpers', () => {
  it('documents health and metrics endpoints', () => {
    expect(operationalEndpoints.health).toBe('/health')
    expect(operationalEndpoints.metrics).toBe('/metrics')
  })

  it('records client metrics without requiring a configured DSN', () => {
    expect(() => recordClientMetric('test.metric', 1, { route: '/' })).not.toThrow()
  })
})

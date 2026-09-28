import { describe, expect, it } from 'vitest'
import { buildProjectBrief } from './contactValidation'

describe('project brief generation', () => {
  it('uses a fallback when company is omitted', () => {
    const brief = buildProjectBrief(
      ['AI Automation', 'Exploring an idea', 'Let us discuss', 'Exploring possibilities'],
      {
        name: 'Ravi',
        email: 'ravi@example.com',
        company: '',
        details: 'We need a safer way to review and route incoming documents.',
      },
    )
    expect(brief).toContain('Company: Not provided')
    expect(brief).toContain('AI Automation')
  })
})

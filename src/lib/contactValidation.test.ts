import { describe, expect, it } from 'vitest'
import { buildProjectBrief, validateProjectContact } from './contactValidation'

const validContact = {
  name: 'Asha Mehta',
  email: 'asha@example.com',
  company: 'Northstar Ops',
  details: 'We want to connect enquiry capture, approvals and reporting.',
}

describe('contact validation', () => {
  it('accepts a complete contact payload', () => {
    expect(validateProjectContact(validContact).success).toBe(true)
  })

  it('rejects invalid email addresses', () => {
    expect(validateProjectContact({ ...validContact, email: 'not-an-email' }).success).toBe(false)
  })

  it('requires meaningful project details', () => {
    expect(validateProjectContact({ ...validContact, details: 'too short' }).success).toBe(false)
  })

  it('builds a reviewable project brief', () => {
    const brief = buildProjectBrief(['Custom CRM', 'Scaling a product', '25-50 lakh', 'Within 1-3 months'], validContact)
    expect(brief).toContain('Project: Custom CRM')
    expect(brief).toContain('Business email: asha@example.com')
    expect(brief).toContain('Company: Northstar Ops')
  })
})

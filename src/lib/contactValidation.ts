import { z } from 'zod'

export const projectContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(160).optional().default(''),
  details: z.string().trim().min(15).max(5000),
})

export type ProjectContact = z.infer<typeof projectContactSchema>

export function validateProjectContact(contact: ProjectContact) {
  return projectContactSchema.safeParse(contact)
}

export function buildProjectBrief(answers: string[], contact: ProjectContact) {
  const parsed = projectContactSchema.parse(contact)
  return `TECHNEXA SOLUTIONS - PROJECT BRIEF

Project: ${answers[0]}
Current stage: ${answers[1]}
Investment range (INR): ${answers[2]}
Timeline: ${answers[3]}

Name: ${parsed.name}
Business email: ${parsed.email}
Company: ${parsed.company || 'Not provided'}

The opportunity:
${parsed.details}
`
}

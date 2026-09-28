import * as Sentry from '@sentry/react'

export const operationalEndpoints = {
  health: '/health',
  readiness: '/readiness',
  metrics: '/metrics',
} as const

export function initObservability() {
  const dsn = (import.meta.env.VITE_SENTRY_DSN as string | undefined)?.trim()
  if (!dsn) return false
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
  })
  return true
}

export function recordClientMetric(name: string, value: number, tags: Record<string, string> = {}) {
  Sentry.addBreadcrumb({
    category: 'metrics',
    message: name,
    level: 'info',
    data: { value, ...tags },
  })
}

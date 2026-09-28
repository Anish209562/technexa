import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { initObservability } from './lib/observability.ts'
initObservability()
createRoot(document.getElementById('root')!).render(<StrictMode><App/></StrictMode>)

import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
const executable=resolve('node_modules/agent-browser/bin/agent-browser-win32-x64.exe')
const origin=process.env.PREVIEW_URL || 'http://localhost:5174'
function browser(...args) {
  const raw=execFileSync(executable,['--session','tnx-review','--json',...args],{encoding:'utf8',timeout:60000,windowsHide:true,maxBuffer:4*1024*1024})
  const response=JSON.parse(raw.trim())
  if (!response.success) throw new Error(JSON.stringify(response))
  return response.data
}
function evaluate(code) { return browser('eval',code).result }
const routes=['/','/expertise','/expertise/custom-crm','/expertise/saas-development','/expertise/ai-automation','/expertise/business-automation','/expertise/agentic-ai','/portfolio','/portfolio/connected-workspace','/portfolio/intelligence-at-work','/portfolio/operations-orchestrated','/work','/work/connected-workspace','/work/intelligence-at-work','/work/operations-orchestrated','/about','/insights','/insights/systems-before-software','/insights/designing-human-approval','/insights/integrations-need-recovery','/insights/first-release-decisions','/insights/automate-the-handoff','/contact','/start-a-project','/privacy','/terms','/page-not-found-check']
mkdirSync('artifacts',{recursive:true})
const results=[]
for (const width of [1440,390]) {
  browser('set','viewport',String(width),'960')
  for (const route of routes) {
    browser('open',origin+route)
    browser('wait','h1')
    const result=evaluate(`({title:document.title,h1:document.querySelectorAll('h1').length,heading:document.querySelector('h1')?.textContent,overflow:document.documentElement.scrollWidth>innerWidth+1,width:innerWidth,description:document.querySelector('meta[name="description"]')?.content,canonical:document.querySelector('link[rel="canonical"]')?.href,errorOverlay:!!document.querySelector('vite-error-overlay'),brokenImages:[...document.images].filter(i=>i.complete && !i.naturalWidth).map(i=>i.src)})`)
    if (!result) throw new Error('Missing browser result: '+JSON.stringify(browser('get','title')))
    results.push({route,width,...result})
    if (result.h1!==1 || result.overflow || result.errorOverlay || result.brokenImages.length || !result.description) throw new Error(JSON.stringify({route,...result}))
    console.log(`PASS ${width}px ${route}`)
  }
}
browser('open',origin)
browser('wait','h1')
for (const width of [1440,1280,1024,768,430,390]) {
  browser('set','viewport',String(width),'960')
  const overflow=evaluate('document.documentElement.scrollWidth>innerWidth+1')
  if (overflow) throw new Error('Homepage overflow at '+width)
  results.push({breakpoint:width,overflow})
}
browser('wait','3600')
browser('screenshot','artifacts/redesign-mobile.png')
browser('screenshot','--full','artifacts/redesign-mobile-full.png')
writeFileSync('artifacts/route-verification.json',JSON.stringify(results,null,2))
console.log('Verified 27 routes at desktop and mobile, plus six homepage breakpoints.')

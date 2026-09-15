import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
const executable=resolve('node_modules/agent-browser/bin/agent-browser-win32-x64.exe')
const origin=process.env.PREVIEW_URL || 'http://localhost:5174'
mkdirSync('artifacts',{recursive:true})
const report=[]
function browser(...args) {
  const response=JSON.parse(execFileSync(executable,['--session','tnx-boot','--json',...args],{encoding:'utf8',timeout:60000,windowsHide:true,maxBuffer:5*1024*1024}).trim())
  if(!response.success)throw Error(JSON.stringify(response))
  return response.data
}
const evaluate=code=>browser('eval',code).result
function check(name,condition){if(!condition)throw Error(name);report.push(name);console.log('PASS '+name)}
browser('set','viewport','1440','960')
browser('set','media','light')
browser('open',origin)
check('Splash appears on a fresh page load',evaluate('!!document.querySelector(".boot-screen")'))
browser('screenshot','artifacts/cinematic-splash.png')
browser('wait','2600')
check('Splash exits and restores scrolling',evaluate('!document.querySelector(".boot-screen") && document.body.style.overflow!=="hidden" && document.documentElement.dataset.boot==="ready"'))
check('Hero finishes visible after the splash',evaluate('getComputedStyle(document.querySelector(".hero-line > span")).opacity==="1"'))
browser('open',origin)
browser('click','.boot-bottom button')
check('Skip intro immediately clears the overlay and scroll lock',evaluate('!document.querySelector(".boot-screen") && document.body.style.overflow!=="hidden" && document.documentElement.dataset.boot==="ready"'))
browser('open',origin)
browser('press','Escape')
check('Escape dismisses the intro',evaluate('!document.querySelector(".boot-screen") && document.body.style.overflow!=="hidden"'))
browser('set','media','light','reduced-motion')
browser('open',origin+'/portfolio')
browser('wait','h1')
check('Reduced motion skips the splash and preserves content',evaluate('matchMedia("(prefers-reduced-motion: reduce)").matches && !document.querySelector(".boot-screen") && getComputedStyle(document.querySelector(".hero-line > span")).opacity==="1"'))
browser('set','media','light')
browser('open',origin+'/portfolio')
browser('wait','3600')
check('Portfolio renders a WebGL canvas',evaluate('!!document.querySelector(".portfolio-webgl canvas") && !document.querySelector(".portfolio-fallback")'))
browser('click','.gallery-index button:nth-child(2)')
browser('wait','1200')
check('Portfolio selection updates the case-study destination',evaluate('document.querySelector(".gallery-info h3 a").pathname==="/portfolio/intelligence-at-work"'))
browser('screenshot','artifacts/cinematic-gallery-selected.png')
browser('click','.gallery-info h3 a')
browser('wait','h1')
check('Portfolio opens its individual case study',evaluate('location.pathname==="/portfolio/intelligence-at-work" && document.querySelector("h1").textContent==="Intelligence at work"'))
check('Client-side navigation does not replay the splash',evaluate('!document.querySelector(".boot-screen")'))
const errors=browser('errors')
check('No browser JavaScript errors',!errors.errors?.length)
writeFileSync('artifacts/motion-verification.json',JSON.stringify(report,null,2))
console.log(`Verified ${report.length} motion and portfolio behaviours.`)

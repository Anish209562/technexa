import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BrandMark } from '../components/Brand'
import { CTA, Label, SectionHeader, TextLink } from '../components/UI'
import { services } from '../data/services'
import PortfolioGallery from '../features/PortfolioGallery'
import SystemDiagram from '../features/SystemDiagram'
import ProjectMedia from '../features/ProjectMedia'
import Approach from '../sections/Approach'
import useMotion from '../hooks/useMotion'
const Sculpture=lazy(()=>import('../components/Sculpture'))
const EARLY_EXPERTISE_STICKY_OFFSET = 60
const MANUAL_EXPERTISE_LOCK_MS = 900
const expertiseSummaries = [
  'A single CRM view for sales, operations, reporting and customer context.',
  'Product strategy, design and engineering for launch-ready SaaS platforms.',
  'AI workflows that reduce repeat work and keep humans in control.',
  'Connected workflows that move work from enquiry to invoice without manual chasing.',
  'Tool-using agents that reason, act and ask for approval at the right moments.',
] as const

export default function Home() {
  const [service,setService]=useState(0)
  const root=useRef<HTMLDivElement>(null)
  const expertiseSection=useRef<HTMLElement>(null)
  const expertiseStart=useRef<HTMLSpanElement>(null)
  const expertiseSticky=useRef<HTMLDivElement>(null)
  const manualExpertiseLock=useRef(false)
  const manualExpertiseUnlock=useRef<number | undefined>(undefined)
  useMotion(root)
  useEffect(() => {
    const section=expertiseSection.current, startMarker=expertiseStart.current, sticky=expertiseSticky.current
    if(!section || !startMarker || !sticky) return
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame=0
    const headerOffset=() => (window.innerWidth <= 800 ? 76 : 88) + EARLY_EXPERTISE_STICKY_OFFSET
    const update=() => {
      frame=0
      if(reduced.matches || window.innerWidth < 900) return
      if(manualExpertiseLock.current) return
      const sectionTop=window.scrollY + section.getBoundingClientRect().top
      const start=window.scrollY + startMarker.getBoundingClientRect().top - headerOffset()
      const end=sectionTop + section.offsetHeight - sticky.offsetHeight - headerOffset()
      const range=Math.max(1,end-start)
      const progress=Math.min(1,Math.max(0,(window.scrollY-start)/range))
      if(window.scrollY < start || window.scrollY > end) return
      const next=Math.min(services.length-1,Math.floor(progress*services.length))
      setService(current => current === next ? current : next)
    }
    const request=() => { if(!frame) frame=requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll',request,{passive:true})
    window.addEventListener('resize',request)
    reduced.addEventListener('change',request)
    return () => { cancelAnimationFrame(frame); window.clearTimeout(manualExpertiseUnlock.current); window.removeEventListener('scroll',request); window.removeEventListener('resize',request); reduced.removeEventListener('change',request) }
  },[])
  const selectService=(index:number) => {
    manualExpertiseLock.current=true
    window.clearTimeout(manualExpertiseUnlock.current)
    manualExpertiseUnlock.current=window.setTimeout(() => { manualExpertiseLock.current=false }, MANUAL_EXPERTISE_LOCK_MS)
    flushSync(() => setService(index))
    const section=expertiseSection.current, startMarker=expertiseStart.current, sticky=expertiseSticky.current
    if(!section || !startMarker || !sticky || window.innerWidth < 900) return
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const header=(window.innerWidth <= 800 ? 76 : 88) + EARLY_EXPERTISE_STICKY_OFFSET
    const sectionTop=window.scrollY + section.getBoundingClientRect().top
    const start=window.scrollY + startMarker.getBoundingClientRect().top - header
    const end=sectionTop + section.offsetHeight - sticky.offsetHeight - header
    if(window.scrollY < start-2 || window.scrollY > end+2) return
    const range=Math.max(1,end-start)
    window.scrollTo({ top:start + range * ((index+.02)/services.length), behavior:reduced ? 'instant' : 'smooth' })
  }
  return <div className="home2026" ref={root}>
    <section className="hero2026 dark" data-header-theme="dark"><div className="hero2026-grid" aria-hidden="true"/><div className="container">
      <div className="hero2026-topline"><Label>INDEPENDENT THINKING. CONNECTED ENGINEERING.</Label><span className="mono"><i className="status-dot"/> INDIA / WORKING EVERYWHERE</span></div>
      <div className="hero2026-main"><div className="hero2026-copy"><h1 className="hero2026-title"><span className="hero-line"><span>ENGINEERING</span></span><span className="hero-line"><span>YOUR NEXT</span></span><span className="hero-line"><span><em>ADVANTAGE.</em></span></span></h1><div className="hero-caption"><span className="mono">THINK BEYOND.<br/>BUILD WHAT’S NEXT.</span><p>Custom software. Intelligent automation.<br/>Connected systems that turn your ambition<br className="desktop-break"/> into an unfair advantage.</p></div><div className="hero2026-actions"><CTA light>Build your next advantage</CTA><TextLink to="/portfolio">Explore the portfolio</TextLink></div></div>
      <div className="engineered-object"><div className="object-topline mono"><span>TNX—01 / ORIGIN</span><span>LIVE 3D</span></div><div className="hero-object-frame"><div className="object-axis axis-x"/><div className="object-axis axis-y"/><div className="object-orbit orbit-a"/><div className="object-orbit orbit-b"/><div className="object-inner"><Suspense fallback={<BrandMark className="hero-fallback"/>}><Sculpture/></Suspense></div><span className="object-coordinate coord-a mono">X / 001</span><span className="object-coordinate coord-b mono">Y / 003</span><span className="object-cross">+</span></div><div className="object-bottomline mono"><span>THE SHAPE OF<br/>CONNECTED THINKING</span><ArrowUpRight size={28} strokeWidth={1}/></div></div></div>
      <div className="hero2026-bottom"><a href="#perspective" className="mono"><span className="scroll-disc"><ArrowDown size={15}/></span>SCROLL TO DISCOVER</a><span className="mono">STRATEGY<br/>DESIGN<br/>ENGINEERING</span><span className="hero-year mono">01 — ∞<small>MADE TO MOVE FORWARD</small></span></div>
    </div></section>
    <nav className="capabilities-ribbon" aria-label="Our capabilities"><div>{services.map(s=><Link to={`/expertise/${s.slug}`} key={s.slug}>{s.name}<span aria-hidden="true">↗</span></Link>)}</div></nav>
    <section id="perspective" className="perspective2026 container section-space"><div className="perspective-heading" data-reveal><Label>01 / BUILT FOR WHAT COMES NEXT</Label><span className="perspective-asterisk" aria-hidden="true">✳</span></div><div className="perspective-copy" data-reveal><h2>Ambition deserves<br/>better <span className="muted">infrastructure.</span></h2><div><p>Your next breakthrough isn’t another tool. It’s a better way for your people, processes and technology to work together. We design and engineer the systems that make it happen.</p><TextLink to="/about">Meet Technexa</TextLink></div></div><div className="perspective-rule" data-line/></section>
    <section className="selected-work2026 dark section-space" data-header-theme="dark"><div className="container"><div className="portfolio-section-heading" data-reveal><div><Label>02 / THE SYSTEM COLLECTION</Label><h2>IDEAS.<br/><span className="outline-type">ENGINEERED.</span></h2></div><div><p>A glimpse into the possibilities.<br/>Experience our original system concepts<br/>in an interactive, three-dimensional collection.</p><TextLink to="/portfolio">Enter the portfolio</TextLink></div></div><PortfolioGallery/></div></section>
    <section ref={expertiseSection} className="expertise-section container section-space"><div data-reveal><SectionHeader label="03 / THE EXPERTISE" title={<>Designed around you.<br/><span className="muted">Engineered to connect.</span></>} link="All capabilities" to="/expertise"/></div><span ref={expertiseStart} className="expertise-scroll-start" aria-hidden="true"/><div ref={expertiseSticky} className="expertise-sticky"><div className="expertise-layout"><div className="expertise-list" role="tablist" aria-label="Explore capabilities">{services.map((s,i)=><button key={s.slug} role="tab" aria-selected={i===service} aria-controls="expertise-preview" id={`expertise-tab-${i}`} tabIndex={service===i?0:-1} onClick={()=>selectService(i)} onKeyDown={e=>{if(e.key==='ArrowUp'||e.key==='ArrowDown'){e.preventDefault();const next=(i+(e.key==='ArrowDown'?1:services.length-1))%services.length;selectService(next);document.getElementById(`expertise-tab-${next}`)?.focus()}}}><span className="mono">{s.number}</span><span>{s.name}</span><ArrowUpRight size={23}/></button>)}</div><div className="expertise-detail" role="tabpanel" id="expertise-preview" aria-labelledby={`expertise-tab-${service}`}><div key={services[service].slug} className="expertise-visual" data-tilt><ProjectMedia kind={services[service].preview}/></div><div className="expertise-description"><h3>{services[service].short}</h3><p>{expertiseSummaries[service]}</p><TextLink to={`/expertise/${services[service].slug}`}>Explore {services[service].name.toLowerCase()}</TextLink></div></div></div></div></section>
    <section className="intelligence-section dark section-space" data-header-theme="dark"><div className="container"><div data-reveal><SectionHeader label="04 / INTELLIGENCE IN MOTION" title={<>A system that thinks.<br/><span className="muted">A team in control.</span></>} link="Explore agentic AI" to="/expertise/agentic-ai"/><p className="section-lead">Follow an enquiry from first contact to considered action. Run the simulation to see where intelligence connects—and where human judgement leads.</p></div><SystemDiagram simulation/></div></section>
    <div data-reveal><Approach/></div>
  </div>
}

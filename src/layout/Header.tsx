import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Brand, { BrandMark } from '../components/Brand'
import { services } from '../data/services'

export default function Header() {
  const { pathname } = useLocation()
  const [mega, setMega] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [dark, setDark] = useState(false)
  const header = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const expertiseToggle = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const sections = [...document.querySelectorAll('[data-header-theme]')]
        const section = sections.find(el => { const r = el.getBoundingClientRect(); return r.top <= 45 && r.bottom > 45 })
        setDark(section?.getAttribute('data-header-theme') === 'dark')
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    const observer = new MutationObserver(update)
    observer.observe(document.getElementById('main')!, { childList: true, subtree: true })
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', update) }
  }, [pathname])
  useEffect(() => {
    if (!mobile && !mega) return
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMega(false); setMobile(false); (mobile ? toggle : expertiseToggle).current?.focus() }
      if (e.key === 'Tab' && mobile) {
        const nodes = [...header.current!.querySelectorAll<HTMLElement>('a,button')].filter(el => el.getClientRects().length)
        if (e.shiftKey && document.activeElement === nodes[0]) { e.preventDefault(); nodes.at(-1)?.focus() }
        else if (!e.shiftKey && document.activeElement === nodes.at(-1)) { e.preventDefault(); nodes[0]?.focus() }
      }
    }
    const old = document.body.style.overflow
    if (mobile) document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', key)
    return () => { document.body.style.overflow = old; window.removeEventListener('keydown', key) }
  }, [mobile, mega])
  const close = () => { setMega(false); setMobile(false) }
  return <header ref={header} className={`site-header ${dark && !mega && !mobile ? 'header-dark' : ''}`} onMouseLeave={() => setMega(false)}>
    <div className="header-inner container"><Link to="/" aria-label="Technexa home" onClick={close}><Brand /></Link>
      <nav aria-label="Main navigation" className="desktop-nav"><div className="expertise-nav" onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setMega(false) }}>
        <NavLink to="/expertise" onMouseEnter={() => setMega(true)} onClick={close}>Expertise</NavLink><button ref={expertiseToggle} aria-label="Explore expertise menu" aria-expanded={mega} aria-controls="expertise-menu" onClick={() => setMega(!mega)}><ChevronDown size={13} /></button>
        {mega && <div id="expertise-menu" className="mega-menu"><div className="container mega-inner"><div><span className="label">CONNECTED CAPABILITIES</span>{services.map(s => <Link key={s.slug} to={`/expertise/${s.slug}`} onClick={close}><span className="mono">{s.number}</span>{s.name}<ArrowUpRight size={20} /></Link>)}<Link className="mega-overview" to="/expertise" onClick={close}>Explore all expertise <ArrowUpRight size={17}/></Link></div><div className="mega-feature"><BrandMark /><span className="label">THE TECHNEXA APPROACH</span><h2>Complexity,<br />considered.</h2><p>Strategy, design and engineering.<br />One connected perspective.</p><Link to="/about" onClick={close}>Get to know Technexa <ArrowUpRight size={17} /></Link></div></div></div>}
      </div>{[['Portfolio','/portfolio'],['About','/about'],['Insights','/insights']].map(([name,to]) => <NavLink key={to} to={to} onMouseEnter={() => setMega(false)}>{name}</NavLink>)}</nav>
      <Link to="/start-a-project" className="header-cta" onClick={close}>Start a project<ArrowUpRight size={17} /></Link>
      <button ref={toggle} className="menu-toggle" aria-label={mobile ? 'Close navigation' : 'Open navigation'} aria-expanded={mobile} aria-controls="mobile-nav" onClick={() => setMobile(!mobile)}>{mobile ? <X /> : <Menu />}</button>
    </div>
    {mobile && <nav id="mobile-nav" className="mobile-nav container" aria-label="Mobile navigation">{[['Home','/'],['Expertise','/expertise'],['Portfolio','/portfolio'],['About','/about'],['Insights','/insights'],['Contact','/contact']].map(([name,to],i) => <NavLink key={to} to={to} onClick={close}><span className="mono">0{i + 1}</span>{name}<ArrowUpRight /></NavLink>)}<div className="mobile-services">{services.map(s => <Link to={`/expertise/${s.slug}`} key={s.slug} onClick={close}>{s.name}</Link>)}</div><Link className="button button-dark" to="/start-a-project" onClick={close}>Start a project <ArrowUpRight /></Link></nav>}
  </header>
}

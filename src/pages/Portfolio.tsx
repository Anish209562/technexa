import { useRef } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Label, TextLink } from '../components/UI'
import PortfolioGallery from '../features/PortfolioGallery'
import { projects } from '../data/projects'
import useMotion from '../hooks/useMotion'

export default function Portfolio() {
  const root=useRef<HTMLDivElement>(null)
  useMotion(root)
  return <div ref={root} className="portfolio-page">
    <section className="collection-hero dark" data-header-theme="dark"><div className="container"><div className="collection-intro"><Label>THE TECHNEXA PORTFOLIO</Label><span className="mono">EXPLORE IN THREE DIMENSIONS <ArrowDown size={13}/></span></div><h1><span className="hero-line"><span>IDEAS INTO</span></span><span className="hero-line"><span><em>SYSTEMS.</em></span></span></h1><div className="collection-description"><span className="mono">SELECTED CONCEPTS<br/>VOL. 01 — 2026</span><p>Behind every interface, a bigger idea.<br/>Explore original systems for better relationships, intelligent decisions and connected operations.</p></div><PortfolioGallery full/></div></section>
    <section className="collection-directory container section-space"><div className="collection-directory-heading" data-reveal><Label>THE THINKING BEHIND THE SYSTEM</Label><h2>Open a new<br/><span className="muted">perspective.</span></h2><p>These are original concept studies, not commissioned client projects. A closer look at how we approach real business problems.</p></div><div className="collection-entries">{projects.map((p,i)=><Link key={p.slug} to={`/portfolio/${p.slug}`} className="collection-entry" data-reveal><div className={`collection-symbol symbol-${i}`} aria-hidden="true"><i/><i/><i/><span className="mono">{p.code}</span></div><div><span className="mono">CONCEPT {p.number} / {p.category}</span><h3>{p.name}</h3><p>{p.summary}</p><span className="text-link">Inside the system <ArrowUpRight size={18}/></span></div><span className="entry-number mono">0{i+1}</span></Link>)}</div></section>
    <section className="collection-note container" data-reveal><Label>A SYSTEM OF YOUR OWN</Label><h2>Your next chapter<br/>is still unwritten.</h2><TextLink to="/start-a-project">Let’s build it together</TextLink></section>
  </div>
}

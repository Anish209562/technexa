import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero, Label } from '../components/UI'
import { services } from '../data/services'
import ProjectMedia from '../features/ProjectMedia'
import Technology from '../sections/Technology'
export default function Expertise() {
  return <><PageHero label="OUR EXPERTISE" title={<>Complex problems.<br/><span className="muted">Engineered into<br/>simple systems.</span></>} description="Five connected capabilities. One partner for the strategy, experience and engineering behind your next stage."/><section className="container expertise-overview">{services.map(s => <article className="service-row" key={s.slug}><div className="service-row-copy"><Label>{s.number} / {s.name}</Label><h2><Link to={`/expertise/${s.slug}`}>{s.short}<ArrowUpRight size={32}/></Link></h2><p>{s.description}</p><ul>{s.builds.slice(0,3).map(b => <li key={b}>{b}</li>)}</ul><Link to={`/expertise/${s.slug}`} className="text-link">Explore {s.name.toLowerCase()}<ArrowUpRight size={17}/></Link></div><ProjectMedia kind={s.preview}/></article>)}</section><Technology/></>
}

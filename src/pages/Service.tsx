import { NavLink, useParams } from 'react-router-dom'
import { services, faqs } from '../data/services'
import { projects } from '../data/projects'
import { CTA, FAQ, Label, PageHero, SectionHeader, TextLink } from '../components/UI'
import SystemDiagram from '../features/SystemDiagram'
import ProjectMedia from '../features/ProjectMedia'
import Approach from '../sections/Approach'
import NotFound from './NotFound'
export default function Service() {
  const { serviceSlug } = useParams()
  const service = services.find(s => s.slug === serviceSlug)
  if (!service) return <NotFound/>
  const project = projects.find(p => p.slug === service.project)!
  return <><PageHero label={`EXPERTISE / ${service.number} / ${service.name}`} title={service.headline} description={service.description}><CTA to={`/start-a-project?service=${encodeURIComponent(service.name)}`}>Discuss your system</CTA></PageHero><nav className="service-navigation container" aria-label="Services">{services.map(s => <NavLink key={s.slug} to={`/expertise/${s.slug}`}>{s.name}</NavLink>)}</nav><section className="container section-space editorial-split"><Label>THE BUSINESS PROBLEM</Label><div><h2>{service.problem}</h2><p className="body-large">{service.problemCopy}</p></div></section><section className="service-showcase dark section-space" data-header-theme="dark"><div className="container"><SectionHeader label="WHAT WE BUILD" title="Designed around your business."/><div className="service-build"><ProjectMedia kind={service.preview}/><div>{service.builds.map((b,i) => <div className="build-capability" key={b}><span className="mono">0{i+1}</span><h3>{b}</h3></div>)}</div></div><p className="mono media-note">ILLUSTRATIVE PRODUCT CONCEPT / FEATURES DEFINED DURING DISCOVERY</p></div></section><section className="container section-space"><SectionHeader label="WHERE IT CREATES VALUE" title="A clearer way to work."/><div className="value-rows">{service.value.map((v,i) => <div key={v}><span className="mono">0{i+1}</span><h3>{v}</h3></div>)}</div></section><section className="architecture-section dark section-space" data-header-theme="dark"><div className="container"><SectionHeader label="SYSTEM THINKING" title="Every connection, considered."/><SystemDiagram nodes={service.nodes}/><div className="service-stack"><Label>RELEVANT TECHNOLOGY</Label><p>{service.stack.join(' / ')}</p><small>A reference stack. Final technology choices follow discovery.</small></div></div></section><Approach/><section className="container section-space related-work"><div><Label>RELATED SYSTEM STUDY</Label><h2>{project.name}</h2><p>{project.summary}</p><TextLink to={`/portfolio/${project.slug}`}>Explore the concept</TextLink></div><ProjectMedia kind={project.preview}/></section><section className="container section-space faq-section"><div><Label>GOOD QUESTIONS</Label><h2>Clarity,<br/>before we begin.</h2></div><FAQ items={[[service.question,service.answer],...faqs.slice(1)]}/></section></>
}

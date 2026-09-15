import { PageHero, TextLink } from '../components/UI'
import SystemArchive from '../features/SystemArchive'
import { projects } from '../data/projects'
export default function Work() {
  return <><PageHero dark label="THE TECHNEXA SYSTEM ARCHIVE" title={<>Engineering,<br/><span className="muted">made tangible.</span></>} description="Step inside our thinking. A collection of original system concepts exploring how software, intelligence and operations connect."/><section className="work-archive dark" data-header-theme="dark"><div className="container"><SystemArchive/></div></section><section className="container section-space"><div className="section-heading"><h2>Explore the studies.</h2><p className="muted">Original concepts. Sample interface data.<br/>A transparent view into what we could build.</p></div><div className="work-directory">{projects.map(p => <article key={p.slug}><span className="mono">TNX / {p.number}</span><h3>{p.name}</h3><span>{p.capability}</span><TextLink to={`/portfolio/${p.slug}`}>Open study</TextLink></article>)}</div></section></>
}

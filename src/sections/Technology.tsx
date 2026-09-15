import { Label } from '../components/UI'
import { technologies } from '../data/services'
export default function Technology() {
  return <section className="technology container section-space"><div className="technology-intro"><Label>07 / TECHNOLOGY LANDSCAPE</Label><h2>The right tools.<br/><span className="muted">For the real problem.</span></h2><p>Chosen for fit. Connected with intent.<br/>Every stack is shaped around the system it serves.</p></div><div className="technology-list">{technologies.map(([group,...items],i) => <div key={group}><span className="mono">0{i+1}</span><h3>{group}</h3><p>{items.join(' / ')}</p></div>)}</div></section>
}

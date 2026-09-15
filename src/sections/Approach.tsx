import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '../components/UI'
import { process } from '../data/services'
export default function Approach() {
  const [active, setActive] = useState(0)
  return <section className="approach section-space" data-header-theme="light"><div className="container"><SectionHeader label="06 / THE APPROACH" title={<>A clear path.<br/><span className="muted">From ambition to impact.</span></>}/><div className="process-track" role="tablist" aria-label="Engineering process">{process.map(([name],i) => <button key={name} role="tab" aria-selected={i === active} aria-controls="process-detail" id={`process-${i}`} tabIndex={i === active ? 0 : -1} className={i <= active ? 'built' : ''} onClick={() => setActive(i)} onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const next=(i+(e.key === 'ArrowRight' ? 1 : process.length-1))%process.length; setActive(next); document.getElementById(`process-${next}`)?.focus() } }}><span className="mono">0{i+1}</span><i/><span>{name}</span></button>)}</div><div className="process-detail" id="process-detail" role="tabpanel" aria-labelledby={`process-${active}`}><span className="process-number">0{active+1}</span><h3>{process[active][1]}</h3><p>{process[active][2]}</p><ArrowUpRight size={32} strokeWidth={1}/></div></div></section>
}

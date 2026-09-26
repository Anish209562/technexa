import { lazy, Suspense, useId, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, MoveHorizontal } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { projects } from '../data/projects'
const PortfolioScene=lazy(()=>import('../three/PortfolioScene'))

export default function PortfolioGallery({full=false}:{full?:boolean}) {
  const [active,setActive]=useState(0)
  const id=useId()
  const info=useRef<HTMLDivElement>(null)
  const navigate=useNavigate()
  const project=projects[active]
  function select(index:number) {
    const next=(index+projects.length)%projects.length
    if(next===active)return
    setActive(next)
    if(info.current&&!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(info.current,{y:12,opacity:.25},{y:0,opacity:1,duration:.55,ease:'power3.out',overwrite:true})
    }
  }
  return <div className={`portfolio-gallery ${full?'gallery-full':''}`}>
    <div className="gallery-topline mono"><span><i className="status-dot"/> INTERACTIVE SYSTEM COLLECTION</span><span>THREE ORIGINAL CONCEPTS / 2026</span></div>
    <div className="gallery-stage" id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`}>
      <div className="gallery-ghost" aria-hidden="true">{project.number}</div>
      <Suspense fallback={<div className="gallery-loading mono">ASSEMBLING THE COLLECTION…</div>}><PortfolioScene active={active} onSelect={select} onEnter={(index=active)=>navigate(`/portfolio/${projects[index].slug}`)}/></Suspense>
      <div className="gallery-interaction mono"><MoveHorizontal size={16}/><span>DRAG TO EXPLORE <b>·</b> CLICK A SYSTEM TO ENTER</span></div>
    </div>
    <div className="gallery-controls">
      <div className="gallery-info" ref={info} aria-live="polite"><span className="mono">{project.code} / {project.category}</span><h3><Link to={`/portfolio/${project.slug}`}>{project.name}<ArrowUpRight size={28}/></Link></h3><p>{project.summary}</p></div>
      <div className="gallery-navigation"><span className="gallery-count"><strong>0{active+1}</strong><span>/ 0{projects.length}</span></span><div><button onClick={()=>select(active-1)} aria-label="Previous project"><ArrowLeft size={21}/></button><button onClick={()=>select(active+1)} aria-label="Next project"><ArrowRight size={21}/></button></div></div>
    </div>
    <div className="gallery-index" role="tablist" aria-label="Portfolio projects">{projects.map((p,i)=><button key={p.slug} id={`${id}-tab-${i}`} role="tab" tabIndex={active===i?0:-1} aria-selected={active===i} aria-controls={`${id}-panel`} onClick={()=>select(i)} onKeyDown={e=>{let next=i;if(e.key==='ArrowRight')next=(i+1)%projects.length;else if(e.key==='ArrowLeft')next=(i+projects.length-1)%projects.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=projects.length-1;else return;e.preventDefault();select(next);document.getElementById(`${id}-tab-${next}`)?.focus()}}><span className="mono">0{i+1}</span><span>{p.capability}</span><ArrowUpRight size={16}/></button>)}</div>
    <p className="gallery-disclosure mono">ORIGINAL TECHNEXA CONCEPT STUDIES. INTERFACES USE SAMPLE DATA.</p>
  </div>
}

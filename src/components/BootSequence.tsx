import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { BrandMark } from './Brand'

export default function BootSequence() {
  const [visible,setVisible]=useState(() => !matchMedia('(prefers-reduced-motion: reduce)').matches)
  const root=useRef<HTMLDivElement>(null)
  const progress=useRef<HTMLSpanElement>(null)
  const dismiss=useRef<()=>void>(()=>{})
  useLayoutEffect(() => {
    if(!visible || !root.current) { document.documentElement.dataset.boot='ready'; return }
    document.documentElement.dataset.boot='loading'
    let complete=false
    const previous=document.body.style.overflow
    document.body.style.overflow='hidden'
    const finish=() => {
      if(complete) return
      complete=true
      document.body.style.overflow=previous
      document.documentElement.dataset.boot='ready'
      window.dispatchEvent(new Event('technexa-ready'))
      setVisible(false)
    }
    dismiss.current=finish
    const meter={value:0}
    const context=gsap.context(() => {
      const timeline=gsap.timeline({onComplete:finish})
      timeline.from('.boot-logo path',{y:(_,el) => [...el.parentNode.children].indexOf(el)%2 ? 35 : -35,opacity:0,scale:.92,transformOrigin:'50% 50%',stagger:.13,duration:.75,ease:'power3.out'})
        .from('.boot-name',{y:14,opacity:0,duration:.5},.3)
        .to(meter,{value:100,duration:1.15,ease:'power2.inOut',onUpdate:() => { if(progress.current) progress.current.textContent=String(Math.round(meter.value)).padStart(3,'0') }},0)
        .fromTo('.boot-rail i',{scaleX:0},{scaleX:1,duration:1.15,ease:'power2.inOut'},0)
        .to('.boot-center',{scale:1.12,opacity:0,duration:.4,ease:'power2.in'},1.1)
        .to(root.current,{clipPath:'inset(0% 0% 100% 0%)',duration:.55,ease:'power4.inOut'},1.35)
    },root)
    // Independent exit: an interrupted animation must never leave a blocking overlay.
    const guard=window.setTimeout(finish,2300)
    const skip=(e:KeyboardEvent) => { if(e.key==='Escape') finish() }
    window.addEventListener('keydown',skip)
    return () => { context.revert(); clearTimeout(guard); window.removeEventListener('keydown',skip); document.body.style.overflow=previous }
  },[visible])
  if(!visible) return null
  return <div className="boot-screen" ref={root} role="status" aria-label="Opening Technexa"><div className="boot-corners" aria-hidden="true"/><div className="boot-center"><BrandMark className="boot-logo"/><div className="boot-name">TECHNEXA<span>SOLUTIONS</span></div></div><div className="boot-bottom"><span className="mono">CONNECTING AMBITION & ENGINEERING</span><div className="boot-rail"><i/></div><span ref={progress} className="mono" aria-hidden="true">000</span><button onClick={() => dismiss.current()}>Skip intro ↗</button></div></div>
}

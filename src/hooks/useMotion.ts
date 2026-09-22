import { useLayoutEffect } from 'react'
import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function useMotion(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (!ref.current) return
    const media=gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)',() => {
      const contextCleanups:(()=>void)[]=[]
      const context=gsap.context(() => {
        if(ref.current?.querySelector('.hero-line')) {
          const entrance=gsap.timeline({paused:document.documentElement.dataset.boot==='loading'})
          entrance.from('.hero-line > span',{yPercent:110,rotateX:12,opacity:0,duration:1.25,stagger:.12,ease:'power4.out'},.1)
          if(ref.current.querySelector('.hero-caption')) entrance.from('.hero-caption',{y:22,opacity:0,duration:1,ease:'power3.out'},.65)
          if(ref.current.querySelector('.engineered-object')) entrance.from('.engineered-object',{rotateY:24,rotateX:-10,y:35,opacity:0,duration:1.5,ease:'power3.out'},.25)
          const play=()=>entrance.play()
          window.addEventListener('technexa-ready',play,{once:true})
          const guard=setTimeout(play,2600)
          contextCleanups.push(()=>{clearTimeout(guard);window.removeEventListener('technexa-ready',play)})
        }
        if(ref.current?.querySelector('.hero2026')) {
          gsap.to('.hero-object-frame',{rotateZ:10,y:65,ease:'none',scrollTrigger:{trigger:'.hero2026',start:'top top',end:'bottom top',scrub:1}})
          gsap.to('.hero2026-title',{y:60,opacity:.3,ease:'none',scrollTrigger:{trigger:'.hero2026',start:'25% top',end:'bottom top',scrub:true}})
        }
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => gsap.from(el,{y:45,opacity:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}}))
        gsap.utils.toArray<HTMLElement>('[data-line]').forEach(el => gsap.from(el,{scaleX:0,transformOrigin:'left',duration:1.2,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}}))
        gsap.utils.toArray<HTMLElement>('[data-tilt]').forEach(el => gsap.fromTo(el,{rotateY:-15,rotateX:8,y:35},{rotateY:0,rotateX:0,y:0,ease:'none',scrollTrigger:{trigger:el,start:'top 90%',end:'center center',scrub:1}}))
      },ref)
      return () => { contextCleanups.forEach(fn=>fn()); context.revert() }
    })
    const observer=new ResizeObserver(() => ScrollTrigger.refresh())
    observer.observe(ref.current)
    document.fonts.ready.then(() => ScrollTrigger.refresh())
    return () => { observer.disconnect(); media.revert() }
  },[ref])
}

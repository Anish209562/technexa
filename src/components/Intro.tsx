import { useEffect, useState } from 'react'
import { BrandMark } from './Brand'
export default function Intro() {
  const [visible,setVisible]=useState(() => {
    try { return location.pathname === '/' && !sessionStorage.getItem('tnx-intro-seen') && !matchMedia('(prefers-reduced-motion: reduce)').matches } catch { return false }
  })
  useEffect(() => {
    if (!visible) return
    const done=() => { setVisible(false); try { sessionStorage.setItem('tnx-intro-seen','1') } catch { /* Storage is optional. */ } }
    const timer=setTimeout(done,1650)
    window.addEventListener('pointerdown',done,{once:true}); window.addEventListener('keydown',done,{once:true})
    return () => { clearTimeout(timer); window.removeEventListener('pointerdown',done); window.removeEventListener('keydown',done) }
  },[visible])
  if (!visible) return null
  return <div className="splash" aria-hidden="true"><BrandMark/><span className="mono">TECHNEXA / SYSTEM INITIALIZATION</span><i/></div>
}

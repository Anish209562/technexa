import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { SectionHeader } from '../components/UI'
import { process } from '../data/services'
const STEP_INTERVAL_MS = 2100
const RESET_TRANSITION_MS = 90
export default function Approach() {
  const [active, setActive] = useState(0)
  const [resetting, setResetting] = useState(false)
  const resetTimer = useRef<number | undefined>(undefined)
  const resetWithoutReverse = () => {
    window.clearTimeout(resetTimer.current)
    setResetting(true)
    resetTimer.current = window.setTimeout(() => setResetting(false), RESET_TRANSITION_MS)
  }
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return
    const interval = window.setInterval(() => setActive(current => {
      const next = (current + 1) % process.length
      if (next < current) resetWithoutReverse()
      return next
    }), STEP_INTERVAL_MS)
    return () => { window.clearInterval(interval); window.clearTimeout(resetTimer.current) }
  }, [])
  const selectStep = (index: number) => {
    if (index < active) resetWithoutReverse()
    else {
      window.clearTimeout(resetTimer.current)
      setResetting(false)
    }
    setActive(index)
  }
  const progress = process.length > 1 ? active / (process.length - 1) : 0
  const style = { '--process-progress': `${progress * 100}%` } as CSSProperties
  return <section className="approach section-space" data-header-theme="light"><div className="container"><SectionHeader label="06 / THE APPROACH" title={<>A clear path.<br/><span className="muted">From ambition to impact.</span></>}/><div className={`process-track${resetting ? ' is-resetting' : ''}`} role="group" aria-label="Engineering process" style={style}>{process.map(([name],i) => <button key={name} type="button" aria-pressed={i === active} id={`process-${i}`} className={i <= active ? 'built' : ''} onClick={() => selectStep(i)} onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const next=(i+(e.key === 'ArrowRight' ? 1 : process.length-1))%process.length; selectStep(next); document.getElementById(`process-${next}`)?.focus() } }}><span className="mono">0{i+1}</span><i className={`process-icon process-icon-${i}`} aria-hidden="true"><span/><b/><em/></i><span>{name}</span></button>)}</div></div></section>
}

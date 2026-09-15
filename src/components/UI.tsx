import { ArrowUpRight, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useId, useRef } from 'react'
import useMotion from '../hooks/useMotion'

export function Label({ children, index }: { children: ReactNode; index?: string }) {
  return <span className="label"><span className="label-square" />{children}{index && <span className="label-index">{index}</span>}</span>
}
export function CTA({ children = 'Start a project', to = '/start-a-project', light = false }: { children?: ReactNode; to?: string; light?: boolean }) {
  return <Link className={`button ${light ? 'button-light' : 'button-dark'}`} to={to}><span>{children}</span><ArrowUpRight size={18} /></Link>
}
export function TextLink({ children, to }: { children: ReactNode; to: string }) {
  return <Link className="text-link" to={to}>{children}<ArrowUpRight size={17} /></Link>
}
export function SectionHeader({ label, title, link, to }: { label: string; title: ReactNode; link?: string; to?: string }) {
  return <div className="section-heading"><div><Label>{label}</Label><h2>{title}</h2></div>{link && to && <TextLink to={to}>{link}</TextLink>}</div>
}
export function PageHero({ label, title, description, children, dark = false }: { label: string; title: ReactNode; description: string; children?: ReactNode; dark?: boolean }) {
  const root=useRef<HTMLElement>(null)
  useMotion(root)
  return <section ref={root} className={`page-hero ${dark ? 'dark' : ''}`} data-header-theme="dark"><div className="container"><Label>{label}</Label><h1><span className="hero-line"><span>{title}</span></span></h1><div className="page-hero-bottom"><p>{description}</p>{children}</div></div></section>
}
export function FAQ({ items }: { items: readonly (readonly [string, string])[] }) {
  const id = useId()
  return <div className="faq-list">{items.map(([q, a], i) => <details key={q} name={id}><summary><span className="mono">0{i + 1}</span><h3>{q}</h3><Plus size={19} /></summary><p>{a}</p></details>)}</div>
}

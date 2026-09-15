import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { insights } from '../data/insights'
import { PageHero } from '../components/UI'
export default function Insights() {
  const [category,setCategory] = useState('All perspectives')
  const categories = ['All perspectives','Engineering','AI','Automation','Product','Business Systems']
  const articles = insights.filter(a => category === 'All perspectives' || a.category === category)
  return <><PageHero label="THE TECHNEXA JOURNAL" title={<>Ideas for<br/><span className="muted">what comes next.</span></>} description="Perspectives on engineering, applied intelligence and the systems behind ambitious businesses."/><section className="container insights-body"><div className="insight-filters" aria-label="Filter perspectives">{categories.map(c => <button key={c} aria-pressed={c === category} onClick={() => setCategory(c)}>{c}</button>)}</div><p className="sr-only" role="status">{articles.length} perspectives</p><div className="insight-list">{articles.map((a,i) => <article key={a.slug}><span className="mono">JOURNAL / 0{insights.indexOf(a)+1}</span><div><span className="label">{a.category} <span>/</span> {a.read} read</span><h2><Link to={`/insights/${a.slug}`}>{a.title}</Link></h2><p>{a.summary}</p></div><Link to={`/insights/${a.slug}`} aria-label={`Read ${a.title}`} className="article-arrow"><ArrowUpRight size={34} strokeWidth={1}/></Link>{i === 0 && category === 'All perspectives' && <div className="journal-grid-art" aria-hidden="true"><i/><i/><i/></div>}</article>)}</div></section></>
}

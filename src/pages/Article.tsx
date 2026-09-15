import { useParams } from 'react-router-dom'
import { insights } from '../data/insights'
import { Label, PageHero, TextLink } from '../components/UI'
import NotFound from './NotFound'
export default function Article() {
  const { articleSlug } = useParams()
  const article = insights.find(a => a.slug === articleSlug)
  if (!article) return <NotFound/>
  return <><PageHero label={`${article.category} / ${article.read} READ`} title={article.title} description={article.summary}><TextLink to="/insights">All perspectives</TextLink></PageHero><article className="container article-body"><aside><Label>A TECHNEXA PERSPECTIVE</Label><p>Field notes on designing<br/>and engineering better systems.</p></aside><div>{article.sections.map(([title,text],i) => <section key={title}><span className="mono">0{i+1}</span><h2>{title}</h2><p>{text}</p></section>)}<div className="article-end"><p>Working through a similar challenge?</p><TextLink to="/start-a-project">Let’s think it through together</TextLink></div></div></article></>
}

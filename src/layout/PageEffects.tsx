import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getMetadata } from '../lib/metadata'
export default function PageEffects() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const metadata = getMetadata(pathname)
    const base = ((import.meta.env.VITE_SITE_URL as string | undefined) || window.location.origin).replace(/\/$/,'')
    const canonical = `${base}${pathname}`
    const title = `${metadata.title} | Technexa Solutions`
    document.title = title
    const setMeta = (key: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name'
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
      if (!tag) { tag=document.createElement('meta'); tag.setAttribute(attr,key); document.head.appendChild(tag) }
      tag.content=content
    }
    setMeta('description', metadata.description)
    setMeta('og:title', title,true); setMeta('og:description',metadata.description,true); setMeta('og:url',canonical,true)
    setMeta('og:type',metadata.type === 'Article' ? 'article' : 'website',true)
    setMeta('og:image',`${base}/images/technexa-social.png`,true)
    setMeta('twitter:card','summary_large_image'); setMeta('twitter:title',title); setMeta('twitter:description',metadata.description)
    setMeta('twitter:image',`${base}/images/technexa-social.png`)
    setMeta('robots',metadata.title === 'Page not found' ? 'noindex,follow' : 'index,follow')
    let link=document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) { link=document.createElement('link'); link.rel='canonical'; document.head.appendChild(link) }; link.href=canonical
    const segments=pathname.split('/').filter(Boolean)
    const breadcrumbs=[{ '@type':'ListItem', position:1, name:'Home', item:base+'/' },...segments.map((_,i) => { const path='/'+segments.slice(0,i+1).join('/'); return { '@type':'ListItem',position:i+2,name:getMetadata(path).name,item:base+path } })]
    const graph: object[]=[{ '@type':'Organization','@id':base+'/#organization',name:'Technexa Solutions',url:base,logo:base+'/images/technexa-logo.png' },{ '@type':'BreadcrumbList',itemListElement:breadcrumbs },{ '@type':metadata.type,name:metadata.name,description:metadata.description,url:canonical,...(metadata.type === 'Service' ? {provider:{'@id':base+'/#organization'}} : {}),...(metadata.type === 'Article' ? {headline:metadata.name,author:{'@id':base+'/#organization'}} : {}) }]
    let schema=document.getElementById('route-schema')
    if (!schema) { schema=document.createElement('script'); schema.id='route-schema'; schema.setAttribute('type','application/ld+json'); document.head.appendChild(schema) }; schema.textContent=JSON.stringify({'@context':'https://schema.org','@graph':graph})
    let focused=!!document.querySelector('main h1')
    const reveal = new MutationObserver(() => { if (!focused && document.querySelector('main h1')) { document.getElementById('main')?.focus({ preventScroll:true }); focused=true } })
    reveal.observe(document.getElementById('main')!,{childList:true,subtree:true})
    document.getElementById('main')?.focus({ preventScroll:true })
    return () => reveal.disconnect()
  },[pathname])
  return <div key={pathname} className="route-mask" aria-hidden="true"><i/><i/></div>
}

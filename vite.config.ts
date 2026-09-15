import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { getMetadata } from './src/lib/metadata.ts'
import { services } from './src/data/services.ts'
import { projects } from './src/data/projects.ts'
import { insights } from './src/data/insights.ts'

const routes = ['/', '/expertise', ...services.map(s => `/expertise/${s.slug}`), '/portfolio', ...projects.map(p => `/portfolio/${p.slug}`), '/work', ...projects.map(p => `/work/${p.slug}`), '/about', '/insights', ...insights.map(a => `/insights/${a.slug}`), '/contact', '/start-a-project', '/privacy', '/terms']
const escapeHtml = (text: string) => text.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'technexa-route-metadata',
    apply: 'build',
    async closeBundle() {
      const output = resolve('dist')
      const template = await readFile(resolve(output,'index.html'),'utf8')
      const base = (loadEnv('production',process.cwd()).VITE_SITE_URL || '').replace(/\/$/,'')
      for (const path of routes) {
        const meta = getMetadata(path)
        const title = `${meta.title} | Technexa Solutions`
        const url = base + path
        const schema = { '@context':'https://schema.org', '@graph': [
          { '@type':'Organization','@id':`${base}/#organization`,name:'Technexa Solutions',url:base || '/',logo:`${base}/images/technexa-logo.png` },
          { '@type':meta.type,name:meta.name,description:meta.description,url,...(meta.type === 'Service' ? {provider:{'@id':`${base}/#organization`}} : {}) },
          { '@type':'BreadcrumbList', itemListElement:[{ '@type':'ListItem', position:1, name:'Home',item:`${base}/` },...path.split('/').filter(Boolean).map((_,i,parts) => { const current='/'+parts.slice(0,i+1).join('/'); return {'@type':'ListItem',position:i+2,name:getMetadata(current).name,item:base+current} })] },
        ] }
        const tags = `<title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(meta.description)}"/><link rel="canonical" href="${escapeHtml(url)}"/><meta property="og:title" content="${escapeHtml(title)}"/><meta property="og:description" content="${escapeHtml(meta.description)}"/><meta property="og:type" content="${meta.type === 'Article' ? 'article' : 'website'}"/><meta property="og:url" content="${escapeHtml(url)}"/><meta property="og:image" content="${base}/images/technexa-social.png"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${escapeHtml(title)}"/><meta name="twitter:description" content="${escapeHtml(meta.description)}"/><meta name="twitter:image" content="${base}/images/technexa-social.png"/><script id="route-schema" type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script>`
        const html=template.replace(/<title>[\s\S]*?<\/title>/g,'').replace(/<meta (?:name="(?:description|twitter:[^"]*)"|property="og:[^"]*")[^>]*>/g,'').replace('</head>',`${tags}</head>`)
        const directory=resolve(output,'.'+path)
        await mkdir(directory,{recursive:true})
        await writeFile(resolve(directory,'index.html'),html)
      }
      await writeFile(resolve(output,'robots.txt'),`User-agent: *\nAllow: /\n${base ? `Sitemap: ${base}/sitemap.xml\n` : ''}`)
      if (base) await writeFile(resolve(output,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(path => `<url><loc>${escapeHtml(base+path)}</loc></url>`).join('')}</urlset>`)
    },
  }],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [{ name: 'three', test: /node_modules[\\/]three[\\/]/, maxSize: 350000 }],
        },
      },
    },
  },
})

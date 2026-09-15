import { services } from '../data/services.ts'
import { projects } from '../data/projects.ts'
import { insights } from '../data/insights.ts'
export function getMetadata(path: string) {
  path = path.replace(/\/+$/, '') || '/'
  const service = services.find(s => path === `/expertise/${s.slug}`)
  const project = projects.find(p => path === `/work/${p.slug}` || path === `/portfolio/${p.slug}`)
  const article = insights.find(a => path === `/insights/${a.slug}`)
  if (service) return { title: service.name, description: service.description, type: 'Service', name: service.name }
  if (project) return { title: `${project.name} — Concept study`, description: project.summary, type: 'CreativeWork', name: project.name }
  if (article) return { title: article.title, description: article.summary, type: 'Article', name: article.title }
  const pages: Record<string,[string,string]> = {
    '/': ['Engineering your next unfair advantage','Technexa designs and engineers custom software, AI systems and intelligent automation for ambitious businesses. Strategy, design and engineering, connected.'],
    '/expertise': ['Expertise','Explore Technexa capabilities in custom CRM, SaaS development, AI automation, business automation and agentic AI.'],
    '/portfolio': ['Portfolio - Ideas into systems','Explore the Technexa portfolio in three dimensions. Original concepts for customer intelligence, agentic AI and connected business operations.'],
    '/work': ['The system archive','Explore original Technexa system concepts in customer intelligence, applied AI and business automation.'],
    '/about': ['The Technexa perspective','An independent technology partner connecting business understanding, considered design and serious engineering.'],
    '/insights': ['Insights & perspectives','Technexa perspectives on engineering, AI, automation, product design and business systems.'],
    '/contact': ['Contact','Start a conversation with Technexa about a new product, an existing platform or a better way to work.'],
    '/start-a-project': ['Start a project','Create a clear project brief with Technexa. Define your opportunity, starting point, investment range and timeline.'],
    '/privacy': ['Privacy','Information about browser storage, project brief handling and privacy on the Technexa website.'],
    '/terms': ['Terms of use','Information about the Technexa website, illustrative system concepts and technology references.'],
  }
  const page=pages[path]
  return { title: page?.[0] ?? 'Page not found', description: page?.[1] ?? 'Find your next step with Technexa.', type: 'WebPage', name: page?.[0] ?? 'Page not found' }
}

import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Header from './layout/Header'
import Footer from './layout/Footer'
import PageEffects from './layout/PageEffects'
import BootSequence from './components/BootSequence'
import ErrorBoundary from './components/ErrorBoundary'
import './styles/tokens.css'
import './styles/previews.css'
import './styles/layout.css'
import './styles/home.css'
import './styles/systems.css'
import './styles/pages.css'
import './styles/cinematic.css'
const Home = lazy(() => import('./pages/Home'))
const Expertise = lazy(() => import('./pages/Expertise'))
const Service = lazy(() => import('./pages/Service'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const CaseStudy = lazy(() => import('./pages/CaseStudy'))
const About = lazy(() => import('./pages/About'))
const Insights = lazy(() => import('./pages/Insights'))
const Article = lazy(() => import('./pages/Article'))
const Contact = lazy(() => import('./pages/Contact'))
const StartProject = lazy(() => import('./pages/StartProject'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))
function Site() {
  const { pathname } = useLocation()
  return <><a className="skip-link" href="#main">Skip to content</a><BootSequence/><Header key={pathname}/><PageEffects/><main id="main" tabIndex={-1}><ErrorBoundary key={pathname}><Suspense fallback={<div className="page-loading" role="status">CONNECTING THE NEXT CHAPTER…</div>}><Routes><Route path="/" element={<Home/>}/><Route path="/expertise" element={<Expertise/>}/><Route path="/expertise/:serviceSlug" element={<Service/>}/><Route path="/portfolio" element={<Portfolio/>}/><Route path="/portfolio/:projectSlug" element={<CaseStudy/>}/><Route path="/work" element={<Portfolio/>}/><Route path="/work/:projectSlug" element={<CaseStudy/>}/><Route path="/about" element={<About/>}/><Route path="/insights" element={<Insights/>}/><Route path="/insights/:articleSlug" element={<Article/>}/><Route path="/contact" element={<Contact/>}/><Route path="/start-a-project" element={<StartProject/>}/><Route path="/privacy" element={<Legal/>}/><Route path="/terms" element={<Legal/>}/><Route path="*" element={<NotFound/>}/></Routes></Suspense></ErrorBoundary></main><Footer/></>
}
export default function App() { return <BrowserRouter><Site/></BrowserRouter> }

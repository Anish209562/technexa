import { useId, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight, Bell, Bot, Check, Circle, Command, FileText, Gauge, LayoutDashboard, MoreHorizontal, Package, Plus, Search, Settings, Truck, Users, Workflow, Zap } from 'lucide-react'

export function CrmPreview() {
  const chartId = useId()
  return <div className="crm-preview" aria-label="Illustrative CRM dashboard with sample data">
    <aside className="mock-sidebar"><Command size={21}/><LayoutDashboard size={16}/><Users size={16}/><Workflow size={16}/><Settings size={16}/><span className="mock-avatar">A</span></aside>
    <div className="mock-main"><div className="mock-top"><span>Workspace <span className="muted">/ Overview</span></span><div><Search size={12}/><span className="mock-avatar small">A</span></div></div>
    <div className="mock-heading"><div><span className="eyebrow">YOUR BUSINESS, AT A GLANCE</span><h4>Good morning, Alex <span>↗</span></h4></div><span className="mock-button"><Plus size={10}/> Create deal</span></div>
    <div className="mock-stats">{[['Total revenue', '$124,580', '+18.6%'],['Active deals', '48', '+12.4%'],['Conversion rate', '32.8%', '+4.2%']].map(([label, value, change])=><div key={label}><span>{label}</span><strong>{value}</strong><small>{change} <span>vs. last month</span></small></div>)}</div>
    <div className="mock-chart"><div><strong>Revenue overview</strong><span>This year⌄</span></div><div className="chart-content"><div className="chart-labels"><span>40k</span><span>30k</span><span>20k</span><span>10k</span></div><svg viewBox="0 0 440 120" preserveAspectRatio="none"><defs><linearGradient id={chartId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#92ba9b" stopOpacity=".35"/><stop offset="100%" stopColor="#92ba9b" stopOpacity="0"/></linearGradient></defs><path d="M0 110 C25 95 20 100 45 100 S65 65 90 75 S115 92 140 65 S165 80 190 48 S215 70 240 35 S270 50 295 30 S325 50 350 18 S385 28 410 8 L440 0 V120 H0Z" fill={`url(#${chartId})`}/><path d="M0 110 C25 95 20 100 45 100 S65 65 90 75 S115 92 140 65 S165 80 190 48 S215 70 240 35 S270 50 295 30 S325 50 350 18 S385 28 410 8 L440 0" fill="none" stroke="#456c53" strokeWidth="2.5"/></svg><span className="preview-signal crm-signal">Lead → deal → next action</span></div><div className="chart-months">{'Jan Feb Mar Apr May Jun Jul Aug'.split(' ').map(x=><span key={x}>{x}</span>)}</div></div>
    <div className="mock-table"><div><strong>Recent deals</strong><MoreHorizontal size={14}/></div>{[['Orbit Studio','Website redesign','$12,000'],['Layers Inc.','Enterprise plan','$24,500']].map(([name, detail, price])=><div key={name}><span className="deal-icon">{name[0]}</span><span>{name}<small>{detail}</small></span><span className="deal-status">In progress</span><b>{price}</b><ArrowUpRight size={12}/></div>)}</div>
    </div>
  </div>
}

export function FlowPreview({ compact = false }: {compact?: boolean}) {
  return <div className={`flow-preview ${compact ? 'compact' : ''}`} aria-label="Example AI automation flow from a new enquiry to CRM update">
    <div className="flow-toolbar"><span><Workflow size={14}/> Lead qualification agent</span><span className="live-label"><i/> Active</span></div>
    <div className="flow-canvas"><div className="flow-line horizontal"/><div className="flow-line vertical"/>
      <div className="flow-node node-trigger"><span className="node-icon"><Zap size={17}/></span><div><strong>New enquiry</strong><small>Webhook trigger</small></div><Check size={12}/></div>
      <div className="flow-node node-agent"><span className="node-icon dark"><Bot size={22}/></span><div><strong>Qualification agent</strong><small>Understand · enrich · qualify</small></div><span className="node-dot"/><div className="agent-tools"><span>Memory</span><span>Tools</span><span>Guardrails</span></div></div>
      <div className="flow-node node-result"><span className="node-icon"><Users size={17}/></span><div><strong>Update CRM</strong><small>Route to the right team</small></div><Check size={12}/></div>
      <div className="flow-model"><Circle size={14}/> AI model <span>Connected</span></div>
      <span className="flow-particle p1"/><span className="flow-particle p2"/>
    </div>
    <div className="flow-bottom"><span><span className="status-dot"/> Workflow ready</span><span>Human oversight, built in <Check size={11}/></span></div>
  </div>
}

export function SaasPreview() {
  return <div className="saas-preview service-preview" aria-label="Illustrative SaaS product dashboard with subscriptions, releases, and usage">
    <div className="preview-chrome"><span><LayoutDashboard size={13}/> Product cockpit</span><span>v2.4 ready</span></div>
    <div className="saas-hero"><div><span className="eyebrow">MULTI-TENANT PLATFORM</span><strong>Build once. Serve every customer beautifully.</strong></div><span className="saas-badge"><Package size={14}/> Live</span></div>
    <div className="saas-grid">
      <div className="saas-card large"><span>Active workspaces</span><strong>2,847</strong><small>+31% growth this quarter</small><i/></div>
      <div className="saas-card"><span>MRR</span><strong>$86.4k</strong><small>Subscriptions synced</small></div>
      <div className="saas-card"><span>Uptime</span><strong>99.98%</strong><small>Region-aware deploys</small></div>
    </div>
    <div className="saas-release"><div><span>Design system</span><i/><span>Billing</span><i/><span>Analytics</span><i/><span>Launch</span></div><small>Product strategy, interface design, subscriptions, and scalable architecture in one delivery loop.</small><span className="preview-signal saas-signal">Tenant → usage → release</span></div>
  </div>
}

export function AutomationPreview() {
  return <div className="automation-preview service-preview" aria-label="Illustrative AI automation workflow for document processing and knowledge retrieval">
    <div className="preview-chrome"><span><Zap size={13}/> AI automation desk</span><span className="live-label"><i/> Processing</span></div>
    <div className="automation-body">
      <div className="doc-stack"><div><FileText size={18}/><span>Invoice.pdf</span><b>Read</b></div><div><FileText size={18}/><span>Lead email</span><b>Parsed</b></div><div><FileText size={18}/><span>Contract</span><b>Queued</b></div></div>
      <div className="automation-core"><span className="node-icon dark"><Bot size={24}/></span><strong>Extract, reason, route</strong><small>AI pulls the right context, checks confidence, and prepares the next action.</small><div><span>OCR</span><span>RAG</span><span>Rules</span></div><span className="preview-signal automation-signal">Review queue</span></div>
      <div className="automation-output"><span><Check size={14}/> CRM updated</span><span><Check size={14}/> Summary drafted</span><span><Check size={14}/> Approval requested</span></div>
    </div>
  </div>
}

const stages: [string, LucideIcon][] = [['Order',Package],['Approve',Check],['Invoice',FileText],['Pack',Package],['Dispatch',Truck]]

export function OpsPreview() {
  return <div className="ops-preview" aria-label="Example operations console with an approval queue and an order-to-dispatch pipeline">
    <div className="ops-top"><span><Gauge size={13}/> Operations console</span><span className="live-label"><i/> Live</span></div>
    <div className="ops-stats">{[['Runs today','1,284',<Workflow key="w" size={11}/>],['On time','99.2%',<Check key="c" size={11}/>],['Waiting on you','3',<Bell key="b" size={11}/>]].map(([label, value, icon])=>
      <div key={label as string}><span>{label}{icon}</span><strong>{value}</strong></div>)}</div>
    <div className="ops-pipeline">
      <div className="ops-pipeline-top"><strong>Order to dispatch</strong><span>4 of 5 stages automated</span></div>
      <div className="ops-track">{stages.map(([label, Icon], i)=>
        <div key={label} className={i < 4 ? 'ops-stage done' : 'ops-stage'}><span><Icon size={11}/></span>{label}</div>)}
        <div className="ops-track-line"><i/></div>
        <span className="preview-signal ops-signal">Exception routed</span>
      </div>
    </div>
    <div className="ops-queue">
      <div className="ops-queue-top"><strong>Approval queue</strong><MoreHorizontal size={12}/></div>
      {[['Invoice #4821','Finance · ₹4,20,000','Approve'],['Vendor onboarding','Operations · 2 checks left','Review']].map(([title, meta, action])=>
        <div className="ops-row" key={title}><span className="ops-row-mark"/><span>{title}<small>{meta}</small></span><span className="ops-action">{action}</span></div>)}
    </div>
    <div className="ops-foot"><span><span className="status-dot"/> Every run logged and auditable</span><span>Exceptions routed to a human <ArrowUpRight size={10}/></span></div>
  </div>
}

export function AgentPreview() {
  const [approved, setApproved] = useState(false)
  return <div className="agent-preview service-preview" aria-label="Illustrative agentic AI workspace with reasoning, tools, guardrails, and approval">
    <div className="preview-chrome"><span><Bot size={13}/> Agent command center</span><span>Human gate on</span></div>
    <div className="agent-layout">
      <div className="agent-orb"><Bot size={34}/><span>Reasoning</span><small className="preview-signal agent-signal">Context → tools → approval</small></div>
      <div className="agent-trace">
        {['Understand request','Search knowledge','Use CRM tool','Draft response'].map((step,i)=><div key={step} className={i<3?'done':''}><span>{String(i+1).padStart(2,'0')}</span>{step}<Check size={12}/></div>)}
      </div>
      <div className="agent-tool-list"><span><Command size={12}/> Tools</span><span><Workflow size={12}/> Workflow</span><span><Users size={12}/> Approval</span></div>
      <div className="agent-approval"><strong role="status">{approved ? 'Demo action approved' : 'Ready for review'}</strong><small>{approved ? 'Approval recorded in this preview. No external action was taken.' : 'Every sensitive action waits for a person before it leaves the building.'}</small><button onClick={() => setApproved(a => !a)}>{approved ? 'Reset demonstration' : 'Approve demo action'} <ArrowUpRight size={11}/></button></div>
    </div>
  </div>
}

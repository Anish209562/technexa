import { useEffect, useId, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowRight, Check, Play } from 'lucide-react'
import { Label } from '../components/UI'
const standardNodes = ['Incoming enquiry', 'AI classification', 'Knowledge retrieval', 'Human approval', 'CRM action']
const nodeSignals = ['Capture', 'Classify', 'Retrieve', 'Approve', 'Update']
const nodeVisuals = ['enquiry', 'classify', 'knowledge', 'approval', 'crm'] as const
const COMPLETE_RESET_DELAY = 1100
const descriptions = [
  'A new enquiry enters through a defined trigger. The system validates the input and creates a traceable record.',
  'The request is classified against the workflow’s rules. Uncertain inputs are flagged instead of silently accepted.',
  'Relevant business knowledge is retrieved with its source context. Access is limited to approved information.',
  'A person reviews the proposed action and its context. Consequential actions wait here until explicitly approved.',
  'The approved action is applied through a scoped tool. The result is recorded, with failures routed for recovery.',
]
export default function SystemDiagram({ nodes = standardNodes, simulation = false }: { nodes?: readonly string[]; simulation?: boolean }) {
  const [selected, setSelected] = useState(0)
  const [run, setRun] = useState<'idle'|'running'|'approval'|'complete'>('idle')
  const id = useId()
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => {
    if (run !== 'running') return
    timer.current = setTimeout(() => {
      if (selected >= 2) { setSelected(3); setRun('approval') }
      else setSelected(s => s + 1)
    }, 850)
    return () => clearTimeout(timer.current)
  }, [run, selected])
  useEffect(() => {
    if (run !== 'complete') return
    timer.current = setTimeout(() => {
      setSelected(0)
      setRun('idle')
    }, COMPLETE_RESET_DELAY)
    return () => clearTimeout(timer.current)
  }, [run])
  function start() { setSelected(0); setRun('running') }
  return <div className={`system-diagram ${simulation ? 'simulation-diagram' : ''} is-${run}`} style={{ '--active-node': selected } as CSSProperties}>
    <div className="system-toolbar"><Label>{simulation ? 'ENQUIRY → ACTION' : 'REFERENCE ARCHITECTURE'}</Label><span className="mono">{simulation ? 'INTERACTIVE DEMONSTRATION' : 'ADAPTED DURING DISCOVERY'}</span></div>
    <div className="system-nodes" role="tablist" aria-label="Inspect system stages">
      {simulation && <div className="system-flow-rail" aria-hidden="true"><span/><span/><i/></div>}
      {nodes.map((node,i) => {
        const processed = run !== 'idle' && i < selected
        const visual = nodeVisuals[i] ?? 'classify'
        return <div className={`system-node-wrap system-node-${i+1}`} key={node}>
        <button id={`${id}-tab-${i}`} role="tab" aria-selected={selected === i} aria-controls={`${id}-panel`} tabIndex={selected === i ? 0 : -1} className={`system-node ${selected === i ? 'selected' : ''} ${processed ? 'processed' : ''}`} onClick={() => { setSelected(i); setRun('idle') }} onKeyDown={e => { if (['ArrowRight','ArrowLeft','Home','End'].includes(e.key)) { e.preventDefault(); const next = e.key === 'Home' ? 0 : e.key === 'End' ? nodes.length-1 : (i + (e.key === 'ArrowRight' ? 1 : nodes.length-1)) % nodes.length; setSelected(next); setRun('idle'); document.getElementById(`${id}-tab-${next}`)?.focus() } }}>
          <span className="mono">0{i+1} / {i === 3 ? 'CONTROL' : 'SYSTEM'}</span>
          <span className={`node-glyph node-glyph-${visual}`} aria-hidden="true"><span className="node-plate"><span className="node-screen"/><span className="node-line node-line-a"/><span className="node-line node-line-b"/><span className="node-dot node-dot-a"/><span className="node-dot node-dot-b"/></span>{processed && <span className="node-check"><Check size={9}/></span>}</span>
          <strong>{node}</strong>
          {simulation && <span className="node-signal mono">{nodeSignals[i] ?? 'Process'}</span>}
          <span className="node-port" />
        </button>
        {i < nodes.length-1 && <ArrowRight className="node-connector" size={18}/>}
      </div>})}
    </div>
    <div className="system-inspector" id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${selected}`}>
      <div><span className="mono">INSPECTING / 0{selected+1}</span><h3>{nodes[selected]}</h3></div>
      <p>{simulation ? descriptions[selected] : `The ${nodes[selected].toLowerCase()} layer has an explicit responsibility within the system. Data contracts, access rules, failure handling and integration boundaries are defined during discovery and validated before release.`}</p>
    </div>
    {simulation && <div className="system-actions"><span role="status"><i className="status-dot"/>{run === 'idle' ? 'Sample workflow. No external systems connected.' : run === 'approval' ? 'Waiting for human approval. Review the proposed CRM update.' : run === 'complete' ? 'Demo complete. Approved action recorded in this simulation.' : `Processing: ${nodes[selected]}...`}</span>{run === 'approval' ? <button className="button button-light" onClick={() => { setSelected(4); setRun('complete') }}>Approve demo action<Check size={16}/></button> : <button className="button button-light" disabled={run === 'running'} onClick={start}>Run demonstration<Play size={15}/></button>}</div>}
  </div>
}

import { useEffect, useId, useRef, useState } from 'react'
import { ArrowRight, Check, Play, RotateCcw } from 'lucide-react'
import { Label } from '../components/UI'
const standardNodes = ['Incoming enquiry', 'AI classification', 'Knowledge retrieval', 'Human approval', 'CRM action']
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
  function start() { setSelected(0); setRun('running') }
  return <div className="system-diagram"><div className="system-toolbar"><Label>{simulation ? 'ENQUIRY → ACTION' : 'REFERENCE ARCHITECTURE'}</Label><span className="mono">{simulation ? 'INTERACTIVE DEMONSTRATION' : 'ADAPTED DURING DISCOVERY'}</span></div><div className="system-nodes" role="tablist" aria-label="Inspect system stages">{nodes.map((node,i) => <div className="system-node-wrap" key={node}><button id={`${id}-tab-${i}`} role="tab" aria-selected={selected === i} aria-controls={`${id}-panel`} tabIndex={selected === i ? 0 : -1} className={`system-node ${selected === i ? 'selected' : ''} ${run !== 'idle' && i < selected ? 'processed' : ''}`} onClick={() => { setSelected(i); setRun('idle') }} onKeyDown={e => { if (['ArrowRight','ArrowLeft','Home','End'].includes(e.key)) { e.preventDefault(); const next = e.key === 'Home' ? 0 : e.key === 'End' ? nodes.length-1 : (i + (e.key === 'ArrowRight' ? 1 : nodes.length-1)) % nodes.length; setSelected(next); setRun('idle'); document.getElementById(`${id}-tab-${next}`)?.focus() } }}><span className="mono">0{i+1} / {i === 3 ? 'CONTROL' : 'SYSTEM'}</span><span className="node-glyph" aria-hidden="true">{i < selected && run !== 'idle' ? <Check size={21}/> : <i/>}</span><strong>{node}</strong><span className="node-port" /></button>{i < nodes.length-1 && <ArrowRight className="node-connector" size={18}/>}</div>)}</div><div className="system-inspector" id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${selected}`}><div><span className="mono">INSPECTING / 0{selected+1}</span><h3>{nodes[selected]}</h3></div><p>{simulation ? descriptions[selected] : `The ${nodes[selected].toLowerCase()} layer has an explicit responsibility within the system. Data contracts, access rules, failure handling and integration boundaries are defined during discovery and validated before release.`}</p></div>{simulation && <div className="system-actions"><span role="status"><i className="status-dot"/>{run === 'idle' ? 'Sample workflow. No external systems connected.' : run === 'approval' ? 'Waiting for human approval. Review the proposed CRM update.' : run === 'complete' ? 'Demo complete. Approved action recorded in this simulation.' : `Processing: ${nodes[selected]}…`}</span>{run === 'approval' ? <button className="button button-light" onClick={() => { setSelected(4); setRun('complete') }}>Approve demo action<Check size={16}/></button> : <button className="button button-light" disabled={run === 'running'} onClick={start}>{run === 'complete' ? 'Run again' : 'Run demonstration'}{run === 'complete' ? <RotateCcw size={15}/> : <Play size={15}/>}</button>}</div>}</div>
}

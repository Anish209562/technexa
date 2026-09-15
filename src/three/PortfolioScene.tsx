import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { projects } from '../data/projects'

type SceneProps={active:number; onSelect:(index:number)=>void; onEnter:()=>void}
function projectTexture(index:number) {
  const canvas=document.createElement('canvas'); canvas.width=1400; canvas.height=950
  const c=canvas.getContext('2d')!; const p=projects[index]
  c.fillStyle='#f0f0e9';c.fillRect(0,0,1400,950)
  c.fillStyle='#121512';c.fillRect(0,0,75,950)
  c.fillStyle='#a4b198';c.font='bold 25px monospace';c.fillText('N',28,65)
  for(let i=0;i<5;i++){c.strokeStyle='#66705f';c.strokeRect(28,135+i*65,19,19)}
  c.fillStyle='#5e6658';c.font='18px monospace';c.fillText(`${p.code}  /  TECHNEXA ORIGINAL CONCEPT`,120,60)
  c.fillStyle='#181c17';c.font='500 48px Arial';c.fillText(index===0?'Customer intelligence':index===1?'Agent workspace':'Operations console',120,140)
  c.strokeStyle='#c7ccc0';c.beginPath();c.moveTo(120,180);c.lineTo(1350,180);c.stroke()
  if(index===0){
    const stats=[['PIPELINE VALUE','₹24.8L'],['ACTIVE RELATIONSHIPS','128'],['OPEN OPPORTUNITIES','36']]
    stats.forEach(([label,value],i)=>{const x=120+i*410;c.strokeRect(x,220,380,140);c.fillStyle='#656f5a';c.font='15px monospace';c.fillText(label,x+23,252);c.fillStyle='#242b20';c.font='45px Arial';c.fillText(value,x+23,320)})
    c.fillStyle='#2b3424';c.font='21px Arial';c.fillText('Revenue & relationship overview',145,430)
    for(let i=0;i<5;i++){c.strokeStyle='#d7dbd0';c.beginPath();c.moveTo(145,480+i*47);c.lineTo(1290,480+i*47);c.stroke()}
    c.beginPath();c.moveTo(145,660);for(let i=0;i<20;i++)c.lineTo(145+i*60,660-i*9-Math.sin(i*.8)*32);c.strokeStyle='#637852';c.lineWidth=4;c.stroke();c.lineWidth=1
    c.font='17px monospace';c.fillStyle='#5f6857';c.fillText('CUSTOMER                STATUS                   OWNER                 NEXT ACTION',145,790)
    c.fillStyle='#2b3325';c.font='23px Arial';c.fillText('Sample relationship        In progress                 Team A                  Follow up',145,845)
  } else if(index===1) {
    c.fillStyle='#607254';c.font='18px monospace';c.fillText('ENQUIRY → KNOWLEDGE → REASONING → REVIEW',135,250)
    const labels=['Understand','Retrieve','Reason','Approve']
    labels.forEach((label,i)=>{const x=130+i*305;c.fillStyle=i===3?'#dbe3d1':'#fff';c.fillRect(x,350,260,195);c.strokeStyle=i===3?'#6e805e':'#c5cebc';c.strokeRect(x,350,260,195);c.fillStyle='#849078';c.font='17px monospace';c.fillText(`STEP 0${i+1}`,x+23,393);c.fillStyle='#293322';c.font='27px Arial';c.fillText(label,x+23,475);if(i<3){c.beginPath();c.moveTo(x+260,445);c.lineTo(x+305,445);c.stroke()}})
    c.fillStyle='#e1e7d9';c.fillRect(130,620,1175,160);c.fillStyle='#2b3722';c.font='26px Arial';c.fillText('Human approval required',160,668);c.font='20px Arial';c.fillText('Review the proposed action before updating the customer record.',160,715)
    c.fillStyle='#6d7963';c.font='17px monospace';c.fillText('TRACE / CONTEXT RETRIEVED · PROPOSAL CREATED · AWAITING REVIEW',135,850)
  } else {
    c.fillStyle='#36482b';c.font='18px monospace';c.fillText('ORDER TO DISPATCH / A CONNECTED PROCESS',130,245)
    const labels=['Order','Approve','Invoice','Pack','Dispatch'];labels.forEach((label,i)=>{const x=150+i*245;c.fillStyle=i<3?'#667f52':'#d1d9c7';c.fillRect(x,320,26,26);c.strokeStyle='#acb89d';if(i<4){c.beginPath();c.moveTo(x+30,332);c.lineTo(x+240,332);c.stroke()}c.fillStyle='#313f28';c.font='24px Arial';c.fillText(label,x,390)})
    c.font='30px Arial';c.fillText('Approval queue',130,510)
    const rows=['Invoice review','Vendor onboarding','Dispatch exception'];rows.forEach((row,i)=>{const y=570+i*90;c.strokeStyle='#c3cdb8';c.strokeRect(130,y,1170,75);c.fillStyle='#3b4c2f';c.font='22px Arial';c.fillText(row,155,y+46);c.fillStyle='#7c8b6d';c.font='16px monospace';c.fillText('WAITING FOR YOUR TEAM',935,y+46)})
  }
  c.fillStyle='#69735f';c.font='14px monospace';c.fillText('ILLUSTRATIVE INTERFACE / SAMPLE DATA',120,920)
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=4;return texture
}

export default function PortfolioScene({active,onSelect,onEnter}:SceneProps) {
  const host=useRef<HTMLDivElement>(null)
  const controls=useRef<{select:(index:number)=>void;enter:()=>void}|null>(null)
  const callbacks=useRef({active,onSelect,onEnter})
  useEffect(()=>{callbacks.current={active,onSelect,onEnter}},[active,onSelect,onEnter])
  const [failed,setFailed]=useState(false)
  useEffect(() => {
    const el=host.current;if(!el)return
    let renderer:THREE.WebGLRenderer
    try {renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'})}catch{const fallback=requestAnimationFrame(()=>setFailed(true));return()=>cancelAnimationFrame(fallback)}
    renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<600?1.15:1.5));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace
    el.appendChild(renderer.domElement)
    const scene=new THREE.Scene()
    const camera=new THREE.PerspectiveCamera(38,1,.1,80);camera.position.set(0,.4,7.7);camera.lookAt(0,0,0)
    scene.fog=new THREE.Fog(0x172013,12,29)
    scene.add(new THREE.HemisphereLight(0xffffff,0x292b2d,3))
    const key=new THREE.DirectionalLight(0xffffff,4);key.position.set(2,5,5);scene.add(key)
    const geometries:THREE.BufferGeometry[]=[];const materials:THREE.Material[]=[];const textures:THREE.Texture[]=[]
    const plates=projects.map((_,i)=>{
      const group=new THREE.Group()
      const geometry=new THREE.BoxGeometry(4.15,2.82,.16);const texture=projectTexture(i);textures.push(texture)
      const edge=new THREE.MeshStandardMaterial({color:0x767c77,metalness:.8,roughness:.3})
      const face=new THREE.MeshBasicMaterial({map:texture})
      const back=new THREE.MeshStandardMaterial({color:0x202523,metalness:.7,roughness:.3})
      const mesh=new THREE.Mesh(geometry,[edge,edge,edge,edge,face,back]);mesh.userData.index=i;group.add(mesh)
      geometries.push(geometry);materials.push(edge,face,back)
      for(let layer=1;layer<=2;layer++){
        const outlineGeometry=new THREE.BoxGeometry(4.15,2.82,.02)
        const edges=new THREE.EdgesGeometry(outlineGeometry)
        outlineGeometry.dispose()
        const material=new THREE.LineBasicMaterial({color:0x8a9188,transparent:true,opacity:.25/layer})
        const outline=new THREE.LineSegments(edges,material);outline.position.z=-layer*.16;outline.position.y=-layer*.06;group.add(outline);geometries.push(edges);materials.push(material)
      }
      scene.add(group);return group
    })
    const floor=new THREE.GridHelper(40,40,0x424d39,0x35432c);floor.position.y=-2.3;(floor.material as THREE.Material).transparent=true;(floor.material as THREE.Material).opacity=.35;scene.add(floor)
    const motion=matchMedia('(prefers-reduced-motion: reduce)')
    let inView=true,disposed=false,entering=false,frame=0,settleUntil=0,pointerX=0,pointerY=0
    const tweens:gsap.core.Tween[]=[]
    const render=(now:number)=>{
      frame=0;if(disposed||!inView||document.hidden)return
      if(!motion.matches){camera.position.x+=(pointerX*.18-camera.position.x)*.07;camera.position.y+=(.4+pointerY*.12-camera.position.y)*.07;camera.lookAt(0,0,0)}
      renderer.render(scene,camera)
      if(now<settleUntil&&!motion.matches)frame=requestAnimationFrame(render)
    }
    const invalidate=()=>{settleUntil=performance.now()+1400;if(!frame&&inView&&!document.hidden)frame=requestAnimationFrame(render)}
    const select=(index:number)=>{
      entering=false
      tweens.forEach(t=>t.kill());tweens.length=0
      plates.forEach((plate,i)=>{const raw=i-index;const offset=raw>1?raw-projects.length:raw< -1?raw+projects.length:raw;const position={x:offset*4.7,y:Math.abs(offset)*.15,z:-Math.abs(offset)*1.35};const rotation={x:offset===0?-.035:0,y:offset===0?-.09:offset>0?-.4:.4,z:offset===0?-.035:offset*.03};if(motion.matches){plate.position.set(position.x,position.y,position.z);plate.rotation.set(rotation.x,rotation.y,rotation.z)}else{tweens.push(gsap.to(plate.position,{...position,duration:1.05,ease:'power3.inOut',onUpdate:invalidate}),gsap.to(plate.rotation,{...rotation,duration:1.05,ease:'power3.inOut'}))}})
      invalidate()
    }
    const enter=()=>{
      if(entering)return
      entering=true
      if(motion.matches){callbacks.current.onEnter();return}
      const plate=plates[callbacks.current.active]
      tweens.push(gsap.to(plate.position,{z:2.9,x:0,y:0,duration:.5,ease:'power3.in',onUpdate:invalidate,onComplete:()=>callbacks.current.onEnter()}))
      tweens.push(gsap.to(plate.rotation,{x:0,y:0,z:0,duration:.45}))
    }
    controls.current={select,enter}
    const resize=()=>{const {width,height}=el.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.position.z=width<600?8.4:7.7;camera.updateProjectionMatrix();invalidate()}
    let downX:number|null=null,downY=0
    const down=(e:PointerEvent)=>{downX=e.clientX;downY=e.clientY;el.setPointerCapture(e.pointerId)}
    const move=(e:PointerEvent)=>{const r=el.getBoundingClientRect();pointerX=(e.clientX-r.left)/r.width-.5;pointerY=(e.clientY-r.top)/r.height-.5;invalidate()}
    const raycaster=new THREE.Raycaster()
    const up=(e:PointerEvent)=>{
      if(downX===null)return;const dx=e.clientX-downX,dy=e.clientY-downY;downX=null
      if(el.hasPointerCapture(e.pointerId))el.releasePointerCapture(e.pointerId)
      if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)){callbacks.current.onSelect((callbacks.current.active+(dx<0?1:projects.length-1))%projects.length);return}
      if(Math.abs(dx)+Math.abs(dy)>15)return
      const r=el.getBoundingClientRect();raycaster.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),camera)
      const hit=raycaster.intersectObjects(plates.map(p=>p.children[0]))[0]
      if(hit){const index=hit.object.userData.index as number;if(index===callbacks.current.active)enter();else callbacks.current.onSelect(index)}
    }
    const reset=()=>{downX=null;pointerX=0;pointerY=0;invalidate()}
    const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0}else invalidate()}
    const observer=new ResizeObserver(resize);observer.observe(el)
    const intersection=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;if(!inView){cancelAnimationFrame(frame);frame=0}else invalidate()});intersection.observe(el)
    el.addEventListener('pointerdown',down);el.addEventListener('pointermove',move);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',reset);el.addEventListener('pointerleave',reset)
    document.addEventListener('visibilitychange',visibility);motion.addEventListener('change',resize)
    resize();select(callbacks.current.active)
    return()=>{disposed=true;controls.current=null;cancelAnimationFrame(frame);tweens.forEach(t=>t.kill());observer.disconnect();intersection.disconnect();el.removeEventListener('pointerdown',down);el.removeEventListener('pointermove',move);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',reset);el.removeEventListener('pointerleave',reset);document.removeEventListener('visibilitychange',visibility);motion.removeEventListener('change',resize);geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());floor.geometry.dispose();(floor.material as THREE.Material).dispose();renderer.dispose();renderer.domElement.remove()}
  },[])
  useEffect(()=>{controls.current?.select(active)},[active])
  return <div className="portfolio-webgl" ref={host} role="group" aria-label={`Three-dimensional portfolio: ${projects[active].name}. Use the project index or arrow controls below to change projects.`}>{failed&&<div className="portfolio-fallback"><span>TNX / {projects[active].number}</span><h3>{projects[active].name}</h3><p>{projects[active].summary}</p><button onClick={onEnter}>Explore this system ↗</button></div>}</div>
}

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { buildLogoShapes, LOGO_SPAN } from '../lib/logo'

const WORLD_WIDTH = 3.6
const DEPTH = 42
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

/** Where each stroke starts before it flies into place, in group-local units. */
const ENTRANCE = [
  { delay: 0.00, x: 2.6, y: -1.5, z: -3.4, spin: 0.85 },
  { delay: 0.13, x: -2.4, y: 1.2, z: -2.6, spin: -0.7 },
  { delay: 0.26, x: 0.4, y: 2.4, z: 3.2, spin: 0.55 },
]

export default function Sculpture() {
  const host = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'loading'|'live'|'fallback'>('loading')
  useEffect(() => {
    const el = host.current
    if (!el) return
    let renderer: THREE.WebGLRenderer
    // Without WebGL the CSS rings stand in for the mark, so reveal them.
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }) } catch { requestAnimationFrame(() => setState('fallback')); return }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 600 ? 1.2 : 1.5))
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.25
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 100)
    camera.position.set(0, 0, 10.5)
    const pmrem = new THREE.PMREMGenerator(renderer)
    const room = new RoomEnvironment()
    const environment = pmrem.fromScene(room, 0.04)
    scene.environment = environment.texture
    room.dispose()

    // The mark is built at art-box scale, then the group is scaled down once.
    const logo = new THREE.Group()
    const scale = WORLD_WIDTH / LOGO_SPAN
    logo.scale.setScalar(scale)
    const geometries: THREE.ExtrudeGeometry[] = []
    const materials: THREE.MeshStandardMaterial[] = []
    const parts = buildLogoShapes().map(({ shape, layer }, index) => {
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: DEPTH, bevelEnabled: true, bevelThickness: 2.2, bevelSize: 2.2, bevelSegments: 3, curveSegments: 26,
      })
      // Centre the slab on z, then push it onto its own layer so the strokes
      // interlock instead of fighting for the same plane.
      geometry.translate(0, 0, -DEPTH / 2 + layer * 8)
      const material = new THREE.MeshStandardMaterial({ color: 0xb8beb0, metalness: 1, roughness: 0.19 + index * 0.035 })
      const mesh = new THREE.Mesh(geometry, material)
      geometries.push(geometry)
      materials.push(material)
      logo.add(mesh)
      return { mesh, entrance: ENTRANCE[index] }
    })
    // Resting pose: turned just far enough to catch a highlight down one edge.
    logo.rotation.set(0.18, -0.48, -0.09)
    scene.add(logo)
    scene.add(new THREE.HemisphereLight(0xffffff, 0x313131, 2.7))
    const key = new THREE.DirectionalLight(0xffffff, 4.6)
    key.position.set(-3, 5, 4)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xffffff, 2.1)
    rim.position.set(4, -2, -3)
    scene.add(rim)

    let frame = 0, inView = true, disposed = false, start = 0
    const pointer = { x: 0, y: 0 }
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const resize = () => {
      const { width, height } = el.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      // Keep the mark inside narrow columns without shrinking it on desktop.
      logo.scale.setScalar(scale * Math.min(1, width / 340))
      invalidate()
    }
    const move = (event: PointerEvent) => {
      const bounds = el.getBoundingClientRect()
      pointer.x = (event.clientX - bounds.left) / bounds.width - 0.5
      pointer.y = (event.clientY - bounds.top) / bounds.height - 0.5
    }
    const reset = () => { pointer.x = 0; pointer.y = 0 }

    const animate = (time: number) => {
      frame = 0
      if (disposed) return
      if (inView && !document.hidden) {
        if (!start) start = time
        const elapsed = (time - start) / 1000
        const still = motion.matches
        for (const { mesh, entrance } of parts) {
          const t = still ? 1 : Math.min(1, Math.max(0, (elapsed - entrance.delay) / 1.15))
          const k = 1 - easeOut(t)
          mesh.position.set(entrance.x * k, entrance.y * k, entrance.z * k)
          mesh.rotation.set(0, entrance.spin * k, entrance.spin * k * 0.35)
        }
        if (!still) {
          logo.rotation.y += (-0.48 + pointer.x * 0.35 - logo.rotation.y) * 0.045
          logo.rotation.x += (0.18 + pointer.y * 0.22 - logo.rotation.x) * 0.045
          const scroll = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / window.innerHeight))
          logo.position.y = scroll * 0.2
        }
        renderer.render(scene, camera)
      }
      if (inView && !document.hidden && !motion.matches) frame = requestAnimationFrame(animate)
    }

    function invalidate() { if (!disposed && !frame && inView && !document.hidden) frame = requestAnimationFrame(animate) }
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0 } else invalidate() }

    const observer = new ResizeObserver(resize)
    observer.observe(el)
    const intersection = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; if (!inView) { cancelAnimationFrame(frame); frame = 0 } else invalidate() })
    intersection.observe(el)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', reset)
    document.addEventListener('visibilitychange', visibility)
    motion.addEventListener('change', invalidate)
    resize()
    invalidate()
    requestAnimationFrame(() => { if (!disposed) setState('live') })
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect(); intersection.disconnect()
      el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', reset)
      document.removeEventListener('visibilitychange', visibility); motion.removeEventListener('change', invalidate)
      geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose())
      environment.dispose(); pmrem.dispose(); renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])
  return <div ref={host} className={state === 'loading' ? 'sculpture' : 'sculpture is-ready'} role="img" aria-label="The Technexa monogram rendered as three precision-machined, interlocking metal forms with subtle pointer response">{state !== 'live' && <img src="/images/technexa-mark.png" alt="" className="sculpture-fallback"/>}</div>
}

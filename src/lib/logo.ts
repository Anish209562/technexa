import * as THREE from 'three'

/**
 * The Technexa monogram, traced from the master brand mark into vectors.
 *
 * Art box is 212 x 212 with y pointing down, matching the source PNG, so the
 * numbers below can be checked straight against it. The mark is three
 * interlocking strokes rather than one outline — the bowl passes behind the
 * right stem of the "n", which is what gives the mark its woven look.
 *
 * SVG_PATHS renders the flat mark (splash screen). buildLogoShapes() returns
 * the same three strokes as THREE.Shape objects with y already flipped for a
 * y-up scene, so the extruded hero logo and the splash never drift apart.
 */

export const LOGO_VIEW_BOX = '0 0 212 212'

export const SVG_PATHS = [
  // The T: top bar with its sweeping left terminal, plus the centre stem.
  'M 88 11.3 L 199.8 11.3 L 199.8 39.5 L 145.8 39.5 L 145.8 120 A 27 27 0 0 1 118.8 147 L 118.8 39.5 L 37 39.5 A 68.3 68.3 0 0 1 88 11.3 Z',
  // The n: left stem, arch, right stem.
  'M 8.5 206 L 8.5 86.5 A 20 20 0 0 1 28.5 66.5 L 89.5 66.5 L 89.5 206 L 62.5 206 L 62.5 95 A 4 4 0 0 0 58.5 91 L 45 91 A 10 10 0 0 0 35 101 L 35 206 Z',
  // The bowl: drops from the bar's right edge and sweeps back into the n.
  'M 171.05 62.5 L 201.5 62.5 L 201.5 108.6 A 145.5 145.5 0 0 1 89.5 205.66 L 89.5 175.65 A 78 78 0 0 0 171.05 97.75 Z',
]

/** Total ink width of the mark in art-box units, used to normalise the 3D scale. */
export const LOGO_SPAN = 195

// Art box centre. y is mirrored on the way out: fy(11.3) === -fy(206).
const CX = 105
const fx = (x: number) => x - CX
const fy = (y: number) => 108.65 - y
const deg = (d: number) => (d * Math.PI) / 180

function buildT() {
  const s = new THREE.Shape()
  s.moveTo(fx(88), fy(11.3))
  s.lineTo(fx(199.8), fy(11.3))
  s.lineTo(fx(199.8), fy(39.5))
  s.lineTo(fx(145.8), fy(39.5))
  s.lineTo(fx(145.8), fy(120))
  // Stem foot: a quarter round off the right edge, flat on the left.
  s.absarc(fx(118.8), fy(120), 27, 0, -Math.PI / 2, true)
  s.lineTo(fx(118.8), fy(39.5))
  s.lineTo(fx(37), fy(39.5))
  // The bar's left terminal, a single wide arc back up to the top edge.
  s.absarc(fx(92), fy(80), 68.3, deg(143.64), deg(93.34), true)
  return s
}

function buildN() {
  const s = new THREE.Shape()
  s.moveTo(fx(8.5), fy(206))
  s.lineTo(fx(8.5), fy(86.5))
  s.absarc(fx(28.5), fy(86.5), 20, Math.PI, Math.PI / 2, true)
  s.lineTo(fx(89.5), fy(66.5))
  s.lineTo(fx(89.5), fy(206))
  s.lineTo(fx(62.5), fy(206))
  s.lineTo(fx(62.5), fy(95))
  s.absarc(fx(58.5), fy(95), 4, 0, Math.PI / 2, false)
  s.lineTo(fx(45), fy(91))
  s.absarc(fx(45), fy(101), 10, Math.PI / 2, Math.PI, false)
  s.lineTo(fx(35), fy(206))
  return s
}

function buildBowl() {
  const s = new THREE.Shape()
  s.moveTo(fx(171.05), fy(62.5))
  s.lineTo(fx(201.5), fy(62.5))
  s.lineTo(fx(201.5), fy(108.6))
  s.absarc(fx(63.5), fy(62.5), 145.5, deg(-18.5), deg(-79.7), true)
  s.lineTo(fx(89.5), fy(175.65))
  s.absarc(fx(93.05), fy(97.75), 78, deg(-92.6), 0, false)
  return s
}

/**
 * The three strokes, back to front. Each carries the z offset that keeps the
 * bowl behind the n where they overlap, so the mark reads correctly head-on
 * and gains real depth as it turns.
 */
export function buildLogoShapes() {
  return [
    { name: 'bowl', shape: buildBowl(), layer: -1 },
    { name: 'n', shape: buildN(), layer: 0 },
    { name: 't', shape: buildT(), layer: 1 },
  ]
}

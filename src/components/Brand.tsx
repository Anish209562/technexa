const paths = [
  'M88 11.3H199.8V39.5H145.8V120A27 27 0 0 1 118.8 147V39.5H37A68.3 68.3 0 0 1 88 11.3Z',
  'M8.5 206V86.5A20 20 0 0 1 28.5 66.5H89.5V206H62.5V95A4 4 0 0 0 58.5 91H45A10 10 0 0 0 35 101V206Z',
  'M171.05 62.5H201.5V108.6A145.5 145.5 0 0 1 89.5 205.66V175.65A78 78 0 0 0 171.05 97.75Z',
]
export function BrandMark({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 212 212" fill="currentColor" aria-hidden="true">{paths.map(d => <path key={d} d={d} />)}</svg>
}
export default function Brand() {
  return <img className="brand-logo" src="/images/technexa-logo.png" alt="Technexa" width="1340" height="224" />
}

export default function PalaceCorners({ size = 'md' }) {
  const sizeClass = size === 'lg' ? 'palace-corner-lg' : ''
  return (
    <>
      <span className={`palace-corner palace-corner-tl ${sizeClass}`} aria-hidden />
      <span className={`palace-corner palace-corner-tr ${sizeClass}`} aria-hidden />
      <span className={`palace-corner palace-corner-bl ${sizeClass}`} aria-hidden />
      <span className={`palace-corner palace-corner-br ${sizeClass}`} aria-hidden />
    </>
  )
}

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import banner1 from '../assets/banner/Banner.png'
import banner2 from '../assets/banner/Banner2.png'
import PalaceCorners from './PalaceCorners'

const SLIDE_IMAGES = [banner1, banner2]

export default function Banner() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDE_IMAGES.length)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  const prev = () => setIndex((i) => (i - 1 + SLIDE_IMAGES.length) % SLIDE_IMAGES.length)
  const next = () => setIndex((i) => (i + 1) % SLIDE_IMAGES.length)

  return (
    <section id="home" className="relative w-full overflow-hidden">
      {/* Gold frame edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[3px] bg-linear-to-r from-transparent via-gold to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[3px] bg-linear-to-r from-transparent via-gold to-transparent" />

      <div className="relative">
        {SLIDE_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`hero-slide ${
              i === index
                ? 'relative opacity-100'
                : 'pointer-events-none absolute inset-0 opacity-0'
            }`}
            aria-hidden={i !== index}
          >
            <img
              src={src}
              alt=""
              className={`w-full ${i === index ? 'h-auto' : 'h-full object-cover'}`}
            />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-0 z-[5] palace-frame">
          <PalaceCorners size="lg" />
        </div>

        {/* Soft vignette for premium depth */}
        <div className="pointer-events-none absolute inset-0 z-[4] bg-linear-to-t from-maroon-deep/35 via-transparent to-maroon-deep/15" />
      </div>

      <button
        type="button"
        onClick={prev}
        className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-maroon-deep/55 text-gold-light shadow-lg backdrop-blur-md transition hover:scale-105 hover:border-gold hover:bg-maroon hover:text-gold sm:left-6"
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-maroon-deep/55 text-gold-light shadow-lg backdrop-blur-md transition hover:scale-105 hover:border-gold hover:bg-maroon hover:text-gold sm:right-6"
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
        {SLIDE_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === index
                ? 'w-9 bg-gold shadow-[0_0_12px_rgba(201,162,39,0.7)]'
                : 'w-2.5 bg-ivory/50 hover:bg-ivory/80'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

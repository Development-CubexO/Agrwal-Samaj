import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import banner2 from '../assets/banner/Banner2.png'
import banner3 from '../assets/banner/Banner4.png'

const SLIDE_IMAGES = [banner2, banner3]

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
      </div>

      <button
        type="button"
        onClick={prev}
        className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-maroon-deep/55 text-gold-light shadow-lg backdrop-blur-md transition hover:scale-105 hover:border-gold hover:bg-maroon hover:text-gold sm:left-6 sm:h-12 sm:w-12"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4 sm:h-[22px] sm:w-[22px]" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-maroon-deep/55 text-gold-light shadow-lg backdrop-blur-md transition hover:scale-105 hover:border-gold hover:bg-maroon hover:text-gold sm:right-6 sm:h-12 sm:w-12"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4 sm:h-[22px] sm:w-[22px]" />
      </button>
    </section>
  )
}

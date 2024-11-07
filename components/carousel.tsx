"use client"

import { useState, useEffect } from "react"

const SLIDES = [
  {
    id: 1,
    image: "https://via.placeholder.com/1200x400/111827/FFFFFF?text=Featured+Story"
  },
  {
    id: 2,
    image: "https://via.placeholder.com/1200x400/111827/FFFFFF?text=Latest+Podcast"
  },
  {
    id: 3,
    image: "https://via.placeholder.com/1200x400/111827/FFFFFF?text=Community+Stories"
  }
]

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="carousel-container">
      <div 
        className="carousel-slides"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {SLIDES.map((slide) => (
          <div key={slide.id} className="carousel-slide">
            <img src={slide.image} alt="Slide" />
          </div>
        ))}
      </div>

      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
        className="carousel-button carousel-button-left"
      >
        ←
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
        className="carousel-button carousel-button-right"
      >
        →
      </button>
    </div>
  )
}

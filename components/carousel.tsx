"use client"

import { useState, useEffect } from 'react'

const SLIDES = [
  {
    id: 1,
    title: "Featured Story",
    description: "Discover amazing stories from around the world",
    image: "https://via.placeholder.com/1200x400/111827/FFFFFF?text=Featured+Story"
  },
  {
    id: 2,
    title: "Latest Podcast",
    description: "Listen to our latest episodes",
    image: "https://via.placeholder.com/1200x400/111827/FFFFFF?text=Latest+Podcast"
  },
  {
    id: 3,
    title: "Community Stories",
    description: "Stories from our community members",
    image: "https://via.placeholder.com/1200x400/111827/FFFFFF?text=Community+Stories"
  }
]

export function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {SLIDES.map((slide) => (
          <div 
            key={slide.id}
            className="min-w-full h-full relative"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
              <div className="max-w-2xl px-4">
                <h2 className="text-4xl font-bold text-white mb-4">
                  {slide.title}
                </h2>
                <p className="text-xl text-white/90">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
      >
        →
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

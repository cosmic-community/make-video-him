'use client'

import { useEffect, useRef } from 'react'

interface AutoPlayVideoProps {
  src: string
  className?: string
}

export default function AutoPlayVideo({ src, className }: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const element = videoRef.current
    if (!element) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            void element.play().catch(() => undefined)
          } else {
            element.pause()
          }
        })
      },
      { threshold: 0.6 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      src={`${src}#t=0.1`}
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
    />
  )
}
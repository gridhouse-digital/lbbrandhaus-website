import gsap from 'gsap'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Hide native cursor globally
    document.documentElement.style.cursor = 'none'

    const qDotX = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3.out' })
    const qDotY = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3.out' })
    const qRingX = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' })
    const qRingY = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      qDotX(e.clientX)
      qDotY(e.clientY)
      qRingX(e.clientX)
      qRingY(e.clientY)
    }

    // State machine: default → hover → cta
    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const isCta = t.closest('a, button, [data-cursor-cta]') !== null
      const isLink = t.closest('a, button') !== null

      if (isCta && t.closest('[data-cursor-cta], .btn-primary, .nav-book, .cta, .p-expand-arrow, .pex-close, .pex-nav')  ) {
        // Orange filled state
        gsap.to(dot, { scale: 0, duration: 0.2, ease: 'power2.out' })
        gsap.to(ring, {
          scale: 1.6,
          background: 'rgba(204,85,0,0.18)',
          borderColor: 'rgba(204,85,0,0.6)',
          duration: 0.3,
          ease: 'power2.out',
        })
      } else if (isLink) {
        // Ring expand state
        gsap.to(dot, { scale: 0.4, duration: 0.2, ease: 'power2.out' })
        gsap.to(ring, {
          scale: 1.5,
          background: 'rgba(16,16,20,0.06)',
          borderColor: 'rgba(16,16,20,0.4)',
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    const onLeave = () => {
      gsap.to(dot, { scale: 1, duration: 0.3, ease: 'elastic.out(1,0.6)' })
      gsap.to(ring, {
        scale: 1,
        background: 'transparent',
        borderColor: 'rgba(16,16,20,0.35)',
        duration: 0.4,
        ease: 'power3.out',
      })
    }

    const onDown = () => {
      gsap.to(dot, { scale: 0.6, duration: 0.1 })
      gsap.to(ring, { scale: 0.9, duration: 0.1 })
    }

    const onUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.25, ease: 'elastic.out(1,0.5)' })
      gsap.to(ring, { scale: 1, duration: 0.25, ease: 'elastic.out(1,0.5)' })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    return () => {
      document.documentElement.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cur-dot" />
      <div ref={ringRef} className="cur-ring" />
    </>
  )
}

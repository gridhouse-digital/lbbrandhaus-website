import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const isFirst = useRef(true)

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    if (isFirst.current) {
      gsap.set(overlay, { opacity: 0, pointerEvents: 'none' })
      isFirst.current = false
      return
    }

    const tl = gsap.timeline()

    // Fade to bone white, scroll to top, fade back in
    tl.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.inOut' })
      .call(() => { window.scrollTo(0, 0) })
      .to(overlay, { opacity: 0, duration: 0.4, ease: 'power2.inOut', delay: 0.05 })
      .set(overlay, { pointerEvents: 'none' })

  }, [location.pathname])

  return <div ref={overlayRef} className="pt-overlay" />
}

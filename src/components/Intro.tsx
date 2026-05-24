import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'

export default function Intro() {
  const [visible, setVisible] = useState(() => {
    return !sessionStorage.getItem('lb-intro-done')
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const markRef = useRef<HTMLDivElement>(null)
  const logoGreyRef = useRef<HTMLImageElement>(null)
  const logoColourRef = useRef<HTMLImageElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const panelTopRef = useRef<HTMLDivElement>(null)
  const panelBotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!visible) return
    const mark = markRef.current
    const logoGrey = logoGreyRef.current
    const logoColour = logoColourRef.current
    const line = lineRef.current
    const panelTop = panelTopRef.current
    const panelBot = panelBotRef.current
    if (!mark || !logoGrey || !logoColour || !line || !panelTop || !panelBot) return

    document.body.style.overflow = 'hidden'

    gsap.set([panelTop, panelBot], { yPercent: 0 })
    gsap.set(mark, { opacity: 0, scale: 0.9 })
    gsap.set(logoColour, { opacity: 0 })
    gsap.set(line, { scaleX: 0, opacity: 0 })

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('lb-intro-done', '1')
        document.body.style.overflow = ''
        setVisible(false)
      }
    })

    tl.to(mark, { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' }, 0.3)
      .to(line, { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.7)
      // Crossfade grey → colour
      .to(logoColour, { opacity: 1, duration: 0.7, ease: 'power2.inOut' }, 1.1)
      .to(logoGrey,   { opacity: 0, duration: 0.7, ease: 'power2.inOut' }, 1.1)
      // Hold on colour version
      .to({}, { duration: 0.5 })
      // Split curtains apart
      .to(panelTop, { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, '+=0.1')
      .to(panelBot, { yPercent: 100,  duration: 0.85, ease: 'power4.inOut' }, '<')
      .to(mark,     { opacity: 0,     duration: 0.2 }, '<')
  }, [])

  if (!visible) return null

  return (
    <div ref={containerRef} className="intro-wrap" aria-hidden="true">
      <div ref={panelTopRef} className="intro-panel intro-top" />
      <div ref={panelBotRef} className="intro-panel intro-bot" />
      <div className="intro-center">
        <div ref={markRef} className="intro-mark">
          <img ref={logoGreyRef}   src="/assets/logos/logo-1.png" alt="" className="intro-logo intro-logo-grey" />
          <img ref={logoColourRef} src="/assets/logos/logo-1.png" alt="" className="intro-logo intro-logo-colour" />
        </div>
        <div ref={lineRef} className="intro-line" />
      </div>
    </div>
  )
}

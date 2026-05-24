import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { PortfolioProject } from '../data/portfolio'

type Props = {
  project: PortfolioProject
  originRect: DOMRect
  onClose: () => void
}

export default function PortfolioExpand({ project, originRect, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const [mediaIndex, setMediaIndex] = useState(0)
  const hasMedia = project.media && project.media.length > 0
  const currentMedia = hasMedia ? project.media![mediaIndex] : null

  useEffect(() => {
    const overlay = overlayRef.current
    const frame = frameRef.current
    const content = contentRef.current
    const trail = trailRef.current
    if (!overlay || !frame || !content || !trail) return

    // Lock body scroll
    document.body.style.overflow = 'hidden'

    const vw = window.innerWidth
    const vh = window.innerHeight

    // Target: centred, 56vw × 78vh max
    const targetW = Math.min(vw * 0.56, 840)
    const targetH = Math.min(vh * 0.78, 700)
    const targetX = (vw - targetW) / 2
    const targetY = (vh - targetH) / 2

    // Start from the card's position
    gsap.set(frame, {
      position: 'fixed',
      left: originRect.left,
      top: originRect.top,
      width: originRect.width,
      height: originRect.height,
      transformOrigin: 'center center',
      rotateX: 18,
      rotateY: -8,
      z: 0,
      opacity: 1,
      borderRadius: '8px',
    })

    gsap.set(trail, {
      position: 'fixed',
      left: originRect.left,
      top: originRect.top,
      width: originRect.width,
      height: originRect.height,
      opacity: 0.35,
      scale: 0.96,
      borderRadius: '8px',
    })

    gsap.set(content, { opacity: 0, y: 20 })
    gsap.set(overlay, { opacity: 0 })

    // Timeline: trail swerves, frame launches, overlay fades
    const tl = gsap.timeline()

    tl.to(overlay, { opacity: 1, duration: 0.25, ease: 'power2.out' })
      .to(trail, {
        left: targetX + targetW * 0.05,
        top: targetY + targetH * 0.05,
        width: targetW * 0.9,
        height: targetH * 0.9,
        opacity: 0,
        scale: 1.04,
        rotateX: 6,
        rotateY: -3,
        duration: 0.55,
        ease: 'power3.out',
      }, 0)
      .to(frame, {
        left: targetX,
        top: targetY,
        width: targetW,
        height: targetH,
        rotateX: 0,
        rotateY: 0,
        z: 120,
        borderRadius: '12px',
        duration: 0.6,
        ease: 'expo.out',
      }, 0.04)
      .to(content, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      }, 0.45)

    // Escape key to close
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  const handleClose = () => {
    const overlay = overlayRef.current
    const frame = frameRef.current
    const content = contentRef.current
    if (!overlay || !frame || !content) return

    const tl = gsap.timeline({ onComplete: () => {
      document.body.style.overflow = ''
      onClose()
    }})

    tl.to(content, { opacity: 0, y: 12, duration: 0.2, ease: 'power2.in' })
      .to(frame, {
        left: originRect.left,
        top: originRect.top,
        width: originRect.width,
        height: originRect.height,
        rotateX: 12,
        rotateY: -6,
        z: 0,
        opacity: 0,
        duration: 0.45,
        ease: 'power3.in',
      }, 0.05)
      .to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0.1)
  }

  return createPortal(
    <div
      ref={overlayRef}
      className="pex-overlay"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
    >
      {/* Motion trail ghost */}
      <div ref={trailRef} className="pex-trail" />

      {/* Main expanded frame */}
      <div ref={frameRef} className="pex-frame">
        {/* Media area */}
        <div className="pex-media">
          {currentMedia ? (
            currentMedia.type === 'video' ? (
              <video
                src={currentMedia.src}
                poster={currentMedia.poster}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img src={currentMedia.src} alt={project.name} />
            )
          ) : (
            <div className="pex-media-fallback" />
          )}

          {/* Media nav dots */}
          {project.media && project.media.length > 1 && (
            <div className="pex-dots">
              {project.media.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`pex-dot${i === mediaIndex ? ' on' : ''}`}
                  onClick={() => setMediaIndex(i)}
                />
              ))}
            </div>
          )}

          {/* Arrow nav */}
          {project.media && project.media.length > 1 && (
            <>
              <button
                type="button"
                className="pex-nav pex-nav-prev"
                onClick={() => setMediaIndex(i => (i - 1 + project.media!.length) % project.media!.length)}
              >←</button>
              <button
                type="button"
                className="pex-nav pex-nav-next"
                onClick={() => setMediaIndex(i => (i + 1) % project.media!.length)}
              >→</button>
            </>
          )}
        </div>

        {/* Info panel */}
        <div ref={contentRef} className="pex-info">
          <div className="pex-info-top">
            <span className="pex-meta">{project.meta}</span>
            <button type="button" className="pex-close" onClick={handleClose}>✕</button>
          </div>
          <h2 className="pex-title">{project.name}</h2>
          <p className="pex-headline">{project.headline}</p>
          {project.description && (
            <p className="pex-desc">{project.description}</p>
          )}
          <div className="pex-cats">
            {project.categories.map(c => (
              <span key={c} className="pex-cat">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

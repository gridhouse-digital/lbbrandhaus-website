import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  src: string
  originRect: DOMRect
  onClose: () => void
}

export default function VideoExpand({ src, originRect, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const frame = frameRef.current
    const video = videoRef.current
    if (!overlay || !frame || !video) return

    document.body.style.overflow = 'hidden'

    const vw = window.innerWidth
    const vh = window.innerHeight
    const targetW = Math.min(vw * 0.82, 1100)
    const targetH = targetW * (9 / 16)
    const targetX = (vw - targetW) / 2
    const targetY = (vh - targetH) / 2

    gsap.set(frame, {
      position: 'fixed',
      left: originRect.left,
      top: originRect.top,
      width: originRect.width,
      height: originRect.height,
      borderRadius: '4px',
      opacity: 1,
    })
    gsap.set(overlay, { opacity: 0 })

    const tl = gsap.timeline()
    tl.to(overlay, { opacity: 1, duration: 0.25, ease: 'power2.out' })
      .to(frame, {
        left: targetX,
        top: targetY,
        width: targetW,
        height: targetH,
        borderRadius: '8px',
        duration: 0.55,
        ease: 'expo.out',
        onComplete: () => { video.play() },
      }, 0.04)

    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleClose = () => {
    const overlay = overlayRef.current
    const frame = frameRef.current
    const video = videoRef.current
    if (!overlay || !frame) return
    video?.pause()

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        onClose()
      },
    })
    tl.to(frame, {
      left: originRect.left,
      top: originRect.top,
      width: originRect.width,
      height: originRect.height,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.in',
    })
      .to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0.05)
  }

  return createPortal(
    <div
      ref={overlayRef}
      className="vex-overlay"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
    >
      <div ref={frameRef} className="vex-frame">
        <button type="button" className="vex-close" onClick={handleClose}>✕</button>
        <video
          ref={videoRef}
          src={src}
          controls
          playsInline
          style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain', background: '#000' }}
        />
      </div>
    </div>,
    document.body
  )
}

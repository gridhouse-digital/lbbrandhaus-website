import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState } from 'react'
import PortfolioExpand from '../components/PortfolioExpand'
import {
  filterPortfolioProjects,
  portfolioFilters,
  type PortfolioFilter,
  type PortfolioFrameType,
  type PortfolioProject,
} from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

function PortfolioFrame({
  frameType,
  image,
  typeLabel,
  typeAccent,
}: {
  frameType?: PortfolioFrameType
  image?: string
  typeLabel?: string
  typeAccent?: string
}) {
  if (frameType === 'image' && image) {
    return (
      <div className="fr">
        <img src={image} alt="" />
      </div>
    )
  }

  const typeClass = frameType === 'type-orange'
    ? 'fr type type-orange'
    : frameType === 'type-teal'
      ? 'fr type type-teal'
      : frameType === 'type-light'
        ? 'fr type type-light'
        : 'fr type'

  return (
    <div className={typeClass}>
      <span>
        {typeLabel}{' '}
        {frameType === 'type' || frameType === 'type-light' ? (
          <span className="display-italic" style={{ color: 'var(--orange)' }}>
            {typeAccent}
          </span>
        ) : (
          <span className="display-italic">{typeAccent}</span>
        )}
      </span>
    </div>
  )
}

// ─── Individual card with tilt + expand arrow ─────────────────────────────────
function PortfolioCard({
  proj,
  onExpand,
}: {
  proj: PortfolioProject
  onExpand: (proj: PortfolioProject, rect: DOMRect) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLButtonElement>(null)
  const qtX = useRef<ReturnType<typeof gsap.quickTo> | null>(null)
  const qtY = useRef<ReturnType<typeof gsap.quickTo> | null>(null)

  const handleMouseEnter = () => {
    const el = cardRef.current
    if (!el) return
    qtX.current = gsap.quickTo(el, 'rotateY', { duration: 0.4, ease: 'power2.out' })
    qtY.current = gsap.quickTo(el, 'rotateX', { duration: 0.4, ease: 'power2.out' })

    gsap.to(el, { scale: 1.02, z: 20, duration: 0.4, ease: 'power2.out' })
    gsap.to(arrowRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el || !qtX.current || !qtY.current) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    qtY.current(dy * -7)   // rotateX: tilt up/down
    qtX.current(dx * 7)    // rotateY: tilt left/right
  }

  const handleMouseLeave = () => {
    const el = cardRef.current
    if (!el) return
    gsap.to(el, { rotateX: 0, rotateY: 0, scale: 1, z: 0, duration: 0.5, ease: 'power3.out' })
    gsap.to(arrowRef.current, { opacity: 0, y: 6, duration: 0.25, ease: 'power2.in' })
  }

  const handleClick = () => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    onExpand(proj, rect)
  }

  return (
    <div
      ref={cardRef}
      className={`p ${proj.size} p-tilt`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <PortfolioFrame
        frameType={proj.frameType}
        image={proj.image}
        typeLabel={proj.typeLabel}
        typeAccent={proj.typeAccent}
      />
      <div className="meta">
        <span>{proj.name}</span>
        <span>{proj.meta}</span>
      </div>
      <h4>{proj.headline}</h4>

      {/* Expand arrow — appears on hover */}
      <button
        ref={arrowRef}
        type="button"
        className="p-expand-arrow"
        onClick={(e) => { e.stopPropagation(); handleClick() }}
        aria-label={`View ${proj.name}`}
      >
        ↗
      </button>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>('All')
  const [filtered, setFiltered] = useState(() => filterPortfolioProjects('All'))
  const [expanded, setExpanded] = useState<{ proj: PortfolioProject; rect: DOMRect } | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)

  // Hero entrance
  useGSAP(() => {
    gsap.from('.scr-port-hero h1', {
      opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
    })
    gsap.from('.scr-port-hero .mono', {
      opacity: 0, y: 14, duration: 0.6, delay: 0.3, ease: 'power2.out',
    })
    gsap.from('.scr-port-hero .filters', {
      opacity: 0, y: 10, duration: 0.5, delay: 0.45, ease: 'power2.out',
    })
  })

  // Initial grid reveal on scroll
  useGSAP(() => {
    gsap.from('.scr-port-grid .p', {
      scrollTrigger: { trigger: '.scr-port-grid', start: 'top 82%' },
      opacity: 0, y: 28, duration: 0.6, stagger: 0.06, ease: 'power2.out',
    })
  })

  const handleFilter = (next: PortfolioFilter) => {
    if (next === activeFilter || isAnimating.current) return
    isAnimating.current = true
    setActiveFilter(next)

    const items = gridRef.current?.querySelectorAll('.p')
    if (!items || items.length === 0) {
      setFiltered(filterPortfolioProjects(next))
      isAnimating.current = false
      return
    }

    gsap.to(items, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      stagger: 0.02,
      ease: 'power2.in',
      onComplete: () => {
        setFiltered(filterPortfolioProjects(next))
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const newItems = gridRef.current?.querySelectorAll('.p')
            if (newItems) {
              gsap.fromTo(
                newItems,
                { opacity: 0, y: 16 },
                {
                  opacity: 1, y: 0, duration: 0.45, stagger: 0.05,
                  ease: 'power2.out',
                  onComplete: () => { isAnimating.current = false },
                }
              )
            } else {
              isAnimating.current = false
            }
          })
        })
      },
    })
  }

  return (
    <>
      <div className="scr-port-hero">
        <div className="top">
          <h1>
            Selected <em>work</em>.
          </h1>
          <span className="mono">Index — 03 / Portfolio</span>
        </div>
        <div className="filters">
          {portfolioFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`pill${activeFilter === filter ? ' active' : ''}`}
              onClick={() => handleFilter(filter)}
            >
              {filter}
            </button>
          ))}
          <span className="count">— {filtered.length} projects</span>
        </div>
      </div>

      <div className="scr-port-grid">
        <div className="grid" ref={gridRef} style={{ perspective: '1200px' }}>
          {filtered.map((proj) => (
            <PortfolioCard
              key={proj.id}
              proj={proj}
              onExpand={(p, rect) => setExpanded({ proj: p, rect })}
            />
          ))}
        </div>
      </div>

      {expanded && (
        <PortfolioExpand
          project={expanded.proj}
          originRect={expanded.rect}
          onClose={() => setExpanded(null)}
        />
      )}
    </>
  )
}

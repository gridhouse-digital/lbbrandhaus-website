import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PortfolioExpand from '../components/PortfolioExpand'
import { getPortfolioProject, homeWorkProjects, type HomeWorkProject, type PortfolioProject } from '../data/portfolio'
import { serviceTeasers } from '../data/services'
import { tickerItems } from '../data/site'

gsap.registerPlugin(ScrollTrigger)

const heroCopy = {
  desktop:
    'A creative studio for brands, creators, and businesses ready to show up clearly and confidently. Editorial photography, brand strategy, and a curated rentable space — built in Calgary, made for everywhere.',
  mobile:
    'A creative studio for brands ready to show up clearly. Photography, brand strategy, studio rental — Calgary based.',
}

const stats = [
  { value: 200, suffix: '+', label: 'Shoots produced' },
  { value: 4, suffix: ' yrs', label: 'In the industry' },
  { value: 60, suffix: '+', label: 'Brands served' },
  { value: 98, suffix: '%', label: 'Client return rate' },
]

function HomeWorkCard({ proj, onExpand }: {
  proj: HomeWorkProject
  onExpand: (id: string, el: HTMLDivElement | null) => void
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  return (
    <div
      className={`scr-work-card ${proj.size}`}
      onClick={() => onExpand(proj.id, frameRef.current)}
      style={{ cursor: 'pointer' }}
    >
      <div className="frame" ref={frameRef}>
        <img src={proj.image} alt={proj.name} style={{ filter: 'saturate(0.92)' }} />
      </div>
      <div className="meta">
        <div>
          <h4>{proj.name}</h4>
          <span className="cat">{proj.category}</span>
        </div>
        <span className="arrow">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="2" y1="12" x2="12" y2="2" />
            <polyline points="4,2 12,2 12,10" />
          </svg>
        </span>
      </div>
    </div>
  )
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroImgRef = useRef<HTMLDivElement>(null)
  const manifestoRef = useRef<HTMLDivElement>(null)
  const studioDarkRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const statNumRefs = useRef<(HTMLSpanElement | null)[]>([])
  const workSectionRef = useRef<HTMLDivElement>(null)
  const workViewportRef = useRef<HTMLDivElement>(null)
  const workTrackRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState<{ proj: PortfolioProject; rect: DOMRect } | null>(null)

  const handleCardExpand = (id: string, frameEl: HTMLDivElement | null) => {
    const full = getPortfolioProject(id)
    if (!full || !frameEl) return
    setExpanded({ proj: full, rect: frameEl.getBoundingClientRect() })
  }

  // Hero entrance
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.scr-hero .index', { opacity: 0, y: 10, duration: 0.6 })
        .from('.scr-hero h1', { opacity: 0, y: 48, duration: 1.0 }, '-=0.3')
        .from('.scr-hero p', { opacity: 0, y: 20, duration: 0.7 }, '-=0.55')
        .from('.scr-hero .img-frame', { opacity: 0, y: 30, duration: 1.0, ease: 'power2.out' }, '-=0.8')
    }, heroRef)
    return () => ctx.revert()
  }, { scope: heroRef })

  // Hero image parallax on scroll
  useGSAP(() => {
    const img = heroImgRef.current
    if (!img) return
    gsap.to(img, {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  })

  // Image clip reveal — services teaser cards
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.scr-svc-card .img').forEach((el) => {
      gsap.fromTo(el,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.0,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      )
    })
  })

  // Image clip reveal — work grid frames
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.scr-work .frame').forEach((el, i) => {
      gsap.fromTo(el,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          ease: 'power4.out',
          delay: i * 0.06,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        }
      )
    })
  })

  // Manifesto scroll reveal
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.scr-manifesto .label', {
        scrollTrigger: { trigger: manifestoRef.current, start: 'top 82%' },
        opacity: 0, x: -16, duration: 0.6, ease: 'power2.out',
      })
      gsap.from('.scr-manifesto .lead', {
        scrollTrigger: { trigger: manifestoRef.current, start: 'top 78%' },
        opacity: 0, y: 28, duration: 0.9, ease: 'power3.out',
      })
      gsap.from('.scr-manifesto .body', {
        scrollTrigger: { trigger: manifestoRef.current, start: 'top 74%' },
        opacity: 0, y: 16, duration: 0.7, ease: 'power2.out',
      })
    }, manifestoRef)
    return () => ctx.revert()
  }, { scope: manifestoRef })

  // Services teaser stagger (text only, images handled above)
  useGSAP(() => {
    gsap.from('.scr-svc-card h3, .scr-svc-card p, .scr-svc-card .read', {
      scrollTrigger: { trigger: '.scr-services-teaser', start: 'top 80%' },
      opacity: 0, y: 20, duration: 0.6, stagger: 0.07, ease: 'power2.out',
    })
  })

  // Horizontal scroll — sticky viewport wrapper approach
  useGSAP(() => {
    const section = workSectionRef.current
    const track = workTrackRef.current
    if (!section || !track) return

    // Mobile/landscape-phone: CSS collapses to vertical stack — skip JS entirely
    const isMobileLayout = () =>
      window.innerWidth <= 768 ||
      (window.innerWidth <= 1024 && window.innerHeight <= 500)

    const getDistance = () => track.scrollWidth - window.innerWidth

    const setHeight = () => {
      if (isMobileLayout()) {
        section.style.height = ''
        return
      }
      section.style.height = `${getDistance() + window.innerHeight}px`
    }

    if (isMobileLayout()) return

    setHeight()
    window.addEventListener('resize', setHeight)

    gsap.to(track, {
      x: () => (isMobileLayout() ? 0 : -getDistance()),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${isMobileLayout() ? 0 : getDistance()}`,
        scrub: 1,
        invalidateOnRefresh: true,
        onRefresh: setHeight,
      },
    })

    return () => window.removeEventListener('resize', setHeight)
  })

  // Studio dark section reveal
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.scr-studio-dark__inner .img-frame', {
        scrollTrigger: { trigger: studioDarkRef.current, start: 'top 75%' },
        opacity: 0, x: -40, duration: 1.0, ease: 'power3.out',
      })
      gsap.from('.scr-studio-dark__copy', {
        scrollTrigger: { trigger: studioDarkRef.current, start: 'top 70%' },
        opacity: 0, x: 30, duration: 0.9, ease: 'power2.out',
      })
    }, studioDarkRef)
    return () => ctx.revert()
  }, { scope: studioDarkRef })

  // Stats count-up — fires when strip is mostly in view
  useEffect(() => {
    const nums = statNumRefs.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          observer.disconnect()
          nums.forEach((el, i) => {
            if (!el) return
            const target = stats[i].value
            const obj = { val: 0 }
            gsap.to(obj, {
              val: target,
              duration: 2.2,
              delay: i * 0.12,
              ease: 'power3.out',
              onUpdate: () => {
                if (el) el.textContent = Math.round(obj.val).toString()
              },
            })
          })
        })
      },
      { threshold: 0.6 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="scr-hero" ref={heroRef}>
        <div className="index">Index — 01 / Welcome</div>
        <div>
          <h1>
            Create. Build.
            <br />
            <em>Grow.</em>
          </h1>
          <p className="scr-hero-p-desktop">{heroCopy.desktop}</p>
          <p className="scr-hero-p-mobile">{heroCopy.mobile}</p>
        </div>
        <div className="img-frame" style={{ overflow: 'hidden' }}>
          <div ref={heroImgRef} style={{ width: '100%', height: '118%', marginTop: '-9%' }}>
            <img
              src="/assets/studio/DSC07225.jpg"
              alt="LB Brand Haus studio"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.92)' }}
            />
          </div>
        </div>
      </div>

      <div className="scr-ticker scr-band">
        <div className="lb-track">
          <span>
            {tickerItems.map((item) => (
              <span key={item}>
                {item} <span className="dot" />
              </span>
            ))}
          </span>
          <span aria-hidden="true">
            {tickerItems.map((item) => (
              <span key={`${item}-dup`}>
                {item} <span className="dot" />
              </span>
            ))}
          </span>
        </div>
      </div>

      <div className="scr-manifesto" ref={manifestoRef}>
        <div className="label">— On intention</div>
        <div>
          <p className="lead">
            A space built for <em>intention</em>. Where Calgary brands,
            storytellers, and creators find their voice — then show it.
          </p>
          <p className="body">
            We don&apos;t shoot fast and pray. We sit down, sketch the story,
            set the room, and produce work that doesn&apos;t just photograph
            well — it earns shelf space in your audience&apos;s memory.
          </p>
        </div>
      </div>

      {/* Stats strip */}
      <div className="scr-stats scr-band" ref={statsRef}>
        {stats.map((s, i) => (
          <div key={s.label} className="scr-stat">
            <div className="scr-stat-num">
              <span ref={el => { statNumRefs.current[i] = el }}>0</span>
              <span className="scr-stat-suffix">{s.suffix}</span>
            </div>
            <div className="scr-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="scr-services-teaser">
        <div className="head">
          <h2>
            What we <em>do</em>.
          </h2>
          <span className="mono">Index — 02 / Practice</span>
        </div>
        <div className="grid">
          {serviceTeasers.map((svc) => (
            <div key={svc.title} className="scr-svc-card">
              <span className="num">{svc.num}</span>
              <div className="img">
                <img src={svc.image} alt={svc.title} />
              </div>
              <h3>{svc.title}</h3>
              <p>{svc.description}</p>
              <Link to="/services" className="read">
                <span>Read more</span>
                <span style={{ color: 'var(--orange)' }}>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal scroll work section */}
      <div className="scr-work-hscroll scr-band" ref={workSectionRef}>
        <div className="scr-work-viewport" ref={workViewportRef}>
        <div className="scr-work-track" ref={workTrackRef}>
          {/* Vertical label column */}
          <div className="scr-work-header">
            <span className="scr-work-vtitle">
              <span className="mono">Index — 03</span>
              <span className="scr-work-vtitle-text">Selected <em>work</em>.</span>
            </span>
            <Link to="/portfolio" className="scr-work-port-link">
              View Portfolio <span>→</span>
            </Link>
          </div>
          {/* Project cards */}
          {homeWorkProjects.map((proj) => (
            <HomeWorkCard key={proj.id} proj={proj} onExpand={handleCardExpand} />
          ))}
        </div>
        </div>
      </div>

      <div className="scr-studio-dark scr-band" ref={studioDarkRef}>
        <div className="scr-main scr-studio-dark__inner">
          <div className="img-frame">
            <img
              src="/assets/studio/DSC07257.jpg"
              alt="LB Brand Haus studio interior"
            />
          </div>
          <div className="scr-studio-dark__copy">
            <div className="label">Index — 04 / The Haus</div>
            <h2>
              Rent the <em>Haus</em>.
            </h2>
            <p>
              A curated, natural-light studio available for photographers, brands,
              and content creators. Pre-styled sets, professional lighting, and
              the kind of quiet that only happens by design.
            </p>
            <div className="specs">
              <div>
                <div className="k">Rate</div>
                <div className="v">
                  $70
                  <span style={{ fontSize: '12px', opacity: 0.6 }}>/hr</span>
                </div>
              </div>
              <div>
                <div className="k">Available</div>
                <div className="v">Mon — Sun</div>
              </div>
              <div>
                <div className="k">Capacity</div>
                <div className="v">1 — 6</div>
              </div>
            </div>
            <Link to="/studio" className="cta">
              Book the Haus today →
            </Link>
          </div>
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

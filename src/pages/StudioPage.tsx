import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  amenities,
  bookingCopy,
  buildCalendarGrid,
  calendarInitialMonth,
  calendarInitialSelectedDay,
  calendarWeekdays,
  formatMonthYear,
  galleryImages,
  includesIntro,
  studioHero,
} from '../data/studio'
import { contactInfo } from '../data/site'
import VideoExpand from '../components/VideoExpand'

gsap.registerPlugin(ScrollTrigger)

export default function StudioPage() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const includesRef = useRef<HTMLDivElement>(null)
  const bigRef = useRef<HTMLDivElement>(null)
  const [videoRect, setVideoRect] = useState<DOMRect | null>(null)

  // Gallery entrance: big image slides up, thumbnails stagger from right
  useGSAP(() => {
    gsap.from('.scr-studio-hero .top', {
      scrollTrigger: { trigger: '.scr-studio-hero', start: 'top 85%' },
      opacity: 0, y: 20, duration: 0.7, ease: 'power2.out',
    })
    gsap.from('.scr-studio-hero .gallery .big', {
      scrollTrigger: { trigger: galleryRef.current, start: 'top 80%' },
      opacity: 0, y: 40, duration: 1.0, ease: 'power3.out',
    })
    gsap.from('.scr-studio-hero .gallery > div:not(.big)', {
      scrollTrigger: { trigger: galleryRef.current, start: 'top 78%' },
      opacity: 0, x: 30, duration: 0.7, stagger: 0.1, ease: 'power2.out',
    })
  })

  // Amenities list stagger
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.scr-studio-includes > div', {
        scrollTrigger: { trigger: includesRef.current, start: 'top 80%' },
        opacity: 0, y: 24, duration: 0.7, ease: 'power2.out',
      })
      gsap.from('.scr-studio-includes li', {
        scrollTrigger: { trigger: includesRef.current, start: 'top 75%' },
        opacity: 0, x: -16, duration: 0.5, stagger: 0.07, ease: 'power2.out',
      })
    }, includesRef)
    return () => ctx.revert()
  }, { scope: includesRef })

  const [month, setMonth] = useState(calendarInitialMonth.month)
  const [year, setYear] = useState(calendarInitialMonth.year)
  const [selectedDay, setSelectedDay] = useState({
    day: calendarInitialSelectedDay,
    month: calendarInitialMonth.month,
    year: calendarInitialMonth.year,
  })

  const { month: monthLabel, year: yearLabel } = formatMonthYear(month, year)

  const days = useMemo(() => buildCalendarGrid(month, year), [month, year])

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11)
      setYear((y) => y - 1)
    } else {
      setMonth((m) => m - 1)
    }
  }

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0)
      setYear((y) => y + 1)
    } else {
      setMonth((m) => m + 1)
    }
  }

  return (
    <>
      <div className="scr-studio-hero">
        <div className="top">
          <h1>
            The <em>{studioHero.titleEmphasis}</em>.
          </h1>
          <div className="right">
            <span className="mono">{studioHero.meta}</span>
            <div className="rate">
              {studioHero.rate}
              <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
                {studioHero.rateUnit}
              </span>
            </div>
          </div>
        </div>
        <div className="gallery" ref={galleryRef}>
          <div
            className="big"
            ref={bigRef}
            onClick={() => { if (bigRef.current) setVideoRect(bigRef.current.getBoundingClientRect()) }}
          >
            <div className="studio-video-thumb">
              <video src="/assets/studio/welcome.mp4" muted playsInline preload="metadata" />
              <div className="play-btn">
                <div className="play-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--ink)">
                    <polygon points="4,2 14,8 4,14" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {galleryImages.slice(1).map((src, i) => (
            <div key={`${src}-${i}`}>
              <img src={src} alt="" />
            </div>
          ))}
        </div>
      </div>

      <div className="scr-studio-includes" ref={includesRef}>
        <div>
          <div className="label">{includesIntro.label}</div>
          <h2>
            Pre-styled, <em>plug-and-play</em>.
          </h2>
          <p
            style={{
              marginTop: '22px',
              color: 'var(--charcoal)',
              fontSize: '14px',
              lineHeight: 1.6,
              maxWidth: '280px',
            }}
          >
            {includesIntro.body}
          </p>
        </div>
        <ul>
          {amenities.map((item) => (
            <li key={item.num}>
              <div>
                <span className="lnum">{item.num}</span>{' '}
                <span className="ln">{item.name}</span>
                <span className="ld">{item.detail}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="scr-studio-book scr-band">
        <div className="scr-main">
          <div>
          <span className="mono" style={{ color: 'rgba(255,252,235,0.5)' }}>
            {bookingCopy.index}
          </span>
          <h2 style={{ marginTop: '18px' }}>
            Book the <em>Haus</em>.
          </h2>
          <p>{bookingCopy.body}</p>
          <div style={{ display: 'flex', gap: '14px', marginTop: '22px' }}>
            <Link
              to="/contact"
              className="btn btn-orange"
              style={{
                background: 'var(--orange)',
                color: 'var(--ivory)',
                borderColor: 'var(--orange)',
              }}
            >
              {bookingCopy.primaryCta}
            </Link>
            <a
              href={`mailto:${contactInfo.email}`}
              className="btn"
              style={{
                background: 'transparent',
                color: 'var(--ivory)',
                borderColor: 'rgba(255,252,235,0.3)',
              }}
            >
              {bookingCopy.secondaryCta}
            </a>
          </div>
        </div>
        <div className="calendar">
          <div className="cal-head">
            <span className="m">
              {monthLabel} <em>{yearLabel}</em>
            </span>
            <div className="nav">
              <span role="button" tabIndex={0} onClick={prevMonth} onKeyDown={(e) => e.key === 'Enter' && prevMonth()}>←</span>
              <span role="button" tabIndex={0} onClick={nextMonth} onKeyDown={(e) => e.key === 'Enter' && nextMonth()}>→</span>
            </div>
          </div>
          <div className="cal-grid">
            {calendarWeekdays.map((d, i) => (
              <div key={`${d}-${i}`} className="h">
                {d}
              </div>
            ))}
            {days.map((cell, i) => {
              const isSelected =
                !cell.muted &&
                cell.day === selectedDay.day &&
                month === selectedDay.month &&
                year === selectedDay.year
              const classes = ['d', cell.muted && 'muted', cell.dot && 'dot', isSelected && 'sel']
                .filter(Boolean)
                .join(' ')

              return (
                <button
                  key={`${cell.day}-${i}`}
                  type="button"
                  className={classes}
                  disabled={cell.muted}
                  onClick={() => {
                    if (!cell.muted) {
                      setSelectedDay({ day: cell.day, month, year })
                    }
                  }}
                >
                  {cell.day}
                </button>
              )
            })}
          </div>
        </div>
        </div>
      </div>

      {videoRect && (
        <VideoExpand
          src="/assets/studio/welcome.mp4"
          originRect={videoRect}
          onClose={() => setVideoRect(null)}
        />
      )}
    </>
  )
}

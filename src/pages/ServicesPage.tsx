import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { processSteps, serviceRows } from '../data/services'

gsap.registerPlugin(ScrollTrigger)

export default function ServicesPage() {
  // Hero entrance
  useGSAP(() => {
    gsap.from('.scr-port-hero h1', {
      opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
    })
    gsap.from('.scr-port-hero .mono', {
      opacity: 0, y: 14, duration: 0.6, delay: 0.3, ease: 'power2.out',
    })
  })

  // Service rows: number slides from left, content fades up
  useGSAP(() => {
    document.querySelectorAll('.scr-svc-detail .row').forEach((row) => {
      gsap.from(row.querySelector('.num-display'), {
        scrollTrigger: { trigger: row, start: 'top 80%' },
        opacity: 0, x: -40, duration: 0.8, ease: 'power3.out',
      })
      gsap.from(row.querySelectorAll('h3, .lede, .body, .includes, .price-row'), {
        scrollTrigger: { trigger: row, start: 'top 75%' },
        opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: 'power2.out',
      })
    })
  })

  // Process steps stagger
  useGSAP(() => {
    gsap.from('.scr-services-teaser .scr-svc-card', {
      scrollTrigger: { trigger: '.scr-services-teaser', start: 'top 80%' },
      opacity: 0, y: 28, duration: 0.6, stagger: 0.12, ease: 'power2.out',
    })
  })

  return (
    <>
      <div className="scr-port-hero">
        <div className="top">
          <h1>
            Our{' '}
            <span className="display-italic" style={{ color: 'var(--orange)' }}>
              services
            </span>
            .
          </h1>
          <span className="mono">Index — 02 / Practice</span>
        </div>
      </div>

      <div className="scr-svc-detail">
        {serviceRows.map((row) => (
          <div key={row.num} className="row">
            <div>
              <div className="num-display">{row.num}</div>
              <div className="label">{row.label}</div>
            </div>
            <div>
              <h3>
                {row.title} <em>{row.titleEmphasis}</em>.
              </h3>
              <p className="lede">{row.lede}</p>
              <p className="body">{row.body}</p>
              <ul className="includes">
                {row.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="price-row">
                <div className="price">
                  <em>{row.priceLabel}</em> {row.priceValue}
                  <span>{row.priceDetail}</span>
                </div>
                {row.ctaExternal ? (
                  <a href={row.ctaPath} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    {row.cta}
                  </a>
                ) : (
                  <Link to={row.ctaPath} className="btn btn-primary">
                    {row.cta}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="scr-services-teaser scr-band" style={{ background: 'var(--paper-warm)' }}>
        <div className="scr-main">
          <div className="head">
            <h2>
              How we <em>work</em>.
            </h2>
            <span className="mono">Index — 06 / Method</span>
          </div>
          <div className="grid">
            {processSteps.map((step) => (
              <div
                key={step.num}
                className="scr-svc-card"
                style={{ borderColor: 'rgba(16,16,20,0.1)' }}
              >
                <span
                  className="num"
                  style={{
                    color: 'var(--orange)',
                    fontStyle: 'italic',
                    fontFamily: "'Fraunces', serif",
                    fontSize: '32px',
                    lineHeight: 1,
                  }}
                >
                  {step.num}
                </span>
                <h3 style={{ marginTop: '18px' }}>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

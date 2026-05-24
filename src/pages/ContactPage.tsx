import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type FormEvent, useRef, useState } from 'react'
import { contactInfo } from '../data/site'
import { submitContactForm } from '../lib/contact'

gsap.registerPlugin(ScrollTrigger)

const projectTypes = [
  'Photography',
  'Brand Strategy',
  'Content System',
  'Studio Rental',
  'Other',
]

export default function ContactPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [timeline, setTimeline] = useState('')
  const [projectType, setProjectType] = useState('Photography')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const statusRef = useRef<HTMLParagraphElement>(null)

  // Hero entrance
  useGSAP(() => {
    gsap.from('.scr-contact-hero h1', {
      opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
    })
    gsap.from('.scr-contact-hero .lede', {
      opacity: 0, y: 20, duration: 0.7, delay: 0.3, ease: 'power2.out',
    })
  })

  // Contact side cards stagger
  useGSAP(() => {
    gsap.from('.scr-contact-side > *', {
      scrollTrigger: { trigger: '.scr-contact-side', start: 'top 80%' },
      opacity: 0, x: 24, duration: 0.6, stagger: 0.1, ease: 'power2.out',
    })
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const result = await submitContactForm({
      fullName,
      email,
      company,
      timeline,
      projectType,
      message,
    })
    setSubmitting(false)
    setStatus(result.message)
    // Fade in the status message
    requestAnimationFrame(() => {
      if (statusRef.current) {
        gsap.fromTo(statusRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
      }
    })
  }

  return (
    <>
      <div className="scr-contact-hero">
        <span className="mono">Index — 09 / Contact</span>
        <h1 style={{ marginTop: '18px' }}>
          Let&apos;s <em>talk</em>.
        </h1>
        <p className="lede">
          Tell us about your project, your timeline, and what you&apos;re hoping
          to make. We respond to every enquiry within one business day — usually
          the same afternoon.
        </p>
      </div>

      <div className="scr-contact-body">
        <form className="form-card" onSubmit={handleSubmit}>
          <h3>
            Start a <em>conversation</em>.
          </h3>
          <div className="row2">
            <div className="field">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                type="text"
                placeholder="Lauren Bélanger"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="lauren@maisonbelmont.ca"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="row2">
            <div className="field">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                type="text"
                placeholder="Maison Belmont"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="timeline">Timeline</label>
              <input
                id="timeline"
                type="text"
                placeholder="Q3 2026"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label>Project type</label>
            <div className="chips">
              {projectTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`c${projectType === type ? ' on' : ''}`}
                  onClick={() => setProjectType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="field">
            <label htmlFor="message">Tell us about your project</label>
            <textarea
              id="message"
              placeholder="A few sentences on what you're working on, your goals, and any constraints we should know about."
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button type="submit" disabled={submitting} style={{ opacity: submitting ? 0.6 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}>
            {submitting ? 'Sending…' : 'Send enquiry →'}
          </button>
          {status && <p ref={statusRef} className="form-status">{status}</p>}
        </form>

        <div className="scr-contact-side">
          <div className="ci-card">
            <div className="label">— Email · fastest</div>
            <div className="v">
              <em>connect</em>@lbbrandhaus.com
            </div>
            <p
              style={{
                fontSize: '12px',
                color: 'var(--muted)',
                marginTop: '8px',
              }}
            >
              {contactInfo.responseNote}
            </p>
          </div>
          <div className="ci-card">
            <div className="label">— Phone · text or call</div>
            <div className="v">
              (368) <em>599-0012</em>
            </div>
            <p
              style={{
                fontSize: '12px',
                color: 'var(--muted)',
                marginTop: '8px',
              }}
            >
              {contactInfo.phoneHours}
            </p>
          </div>
          <div className="ci-card dark">
            <div className="label">— Visit the studio</div>
            <address>
              {contactInfo.address.line1}
              <br />
              {contactInfo.address.line2}
              <br />
              {contactInfo.address.line3}
            </address>
            <p
              style={{
                fontSize: '12px',
                color: 'rgba(255,252,235,0.5)',
                marginTop: '14px',
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {contactInfo.appointmentNote}
            </p>
          </div>
          <div className="map">
            <div className="map-bg" />
            <span className="label">{contactInfo.mapLabel}</span>
            <div className="pin" />
            <div className="place">
              New Horizon <em>Mall</em>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

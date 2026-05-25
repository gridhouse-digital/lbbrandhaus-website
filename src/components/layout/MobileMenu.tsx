import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { index: '01', label: 'Home', path: '/' },
  { index: '02', label: 'Services', path: '/services' },
  { index: '03', label: 'Studio', path: '/studio' },
  { index: '04', label: 'Portfolio', path: '/portfolio' },
  { index: '05', label: 'Contact', path: '/contact' },
] as const

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path)

  if (!isOpen) return null

  return (
    <div className="scr-mobile-menu" role="dialog" aria-modal="true">

      {/* Header bar */}
      <div className="mm-header">
        <Link className="mm-brand" to="/" onClick={onClose}>
          <img src="/assets/logos/logo-1.png" alt="LB Brand Haus" className="mm-logo" />
          <span className="mm-wordmark">LB Brand <em>Haus</em></span>
        </Link>
        <button type="button" className="mm-close" aria-label="Close menu" onClick={onClose}>
          ✕
        </button>
      </div>

      {/* Nav links */}
      <nav className="mm-nav">
        <ul>
          {NAV_LINKS.map(({ index, label, path }) => (
            <li key={path}>
              <Link
                className={`mm-link${isActive(path) ? ' active' : ''}`}
                to={path}
                onClick={onClose}
              >
                <span className="mm-index">{index}</span>
                <span className="mm-label">{label}</span>
                {isActive(path) && <span className="mm-dot" />}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mm-foot">
        <a
          className="mm-book"
          href="https://lbbrandhaus.nuvoro.net/business/lbbrandhaus"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
        >
          Book now →
        </a>
        <div className="mm-info">
          <span>connect@lbbrandhaus.com</span>
          <span>Unit H38, New Horizon Mall · Balzac, AB</span>
        </div>
      </div>

    </div>
  )
}

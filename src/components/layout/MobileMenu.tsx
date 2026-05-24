import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Studio', path: '/studio' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact', path: '/contact' },
] as const

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path)

  if (!isOpen) return null

  return (
    <div className="scr-mobile-menu" role="dialog" aria-modal="true">
      <button
        type="button"
        className="scr-mobile-menu__close"
        aria-label="Close menu"
        onClick={onClose}
      >
        Close ×
      </button>

      <nav className="scr-mobile-menu__nav">
        <ul>
          {NAV_LINKS.map(({ label, path }) => (
            <li key={path}>
              <Link
                className={isActive(path) ? 'active' : undefined}
                to={path}
                onClick={onClose}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link className="nav-book" to="/contact" onClick={onClose}>
              Book a session →
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

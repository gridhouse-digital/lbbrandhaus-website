import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NavMeta } from './NavMeta'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Studio', path: '/studio' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact', path: '/contact' },
] as const

type NavProps = {
  onMenuOpen: () => void
}

export function Nav({ onMenuOpen }: NavProps) {
  const { pathname } = useLocation()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      navRef.current?.classList.toggle('scrolled', window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path)

  return (
    <header ref={navRef} className="scr-nav">
      <div className="scr-main scr-nav__inner">
        <Link className="brand-mark" to="/">
          <span className="mark">
            <img src="/assets/logos/logo-light.png" alt="LB Brand Haus" />
          </span>
          <span className="name">
            LB Brand <em>Haus</em>
          </span>
        </Link>

        <NavMeta />

        <div className="nav-end">
          <ul className="nav-links">
            {NAV_LINKS.map(({ label, path }) => (
              <li key={path}>
                <Link className={isActive(path) ? 'active' : undefined} to={path}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <Link className="nav-book" to="/contact">
            Book a session →
          </Link>

          <button
            type="button"
            className="ham"
            aria-label="Open menu"
            onClick={onMenuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}

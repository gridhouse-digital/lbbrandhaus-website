import { Link } from 'react-router-dom'

type FooterProps = {
  showMassive?: boolean
}

export function Footer({ showMassive = false }: FooterProps) {
  return (
    <footer className="scr-foot">
      <div className="scr-main">
        <div className="top">
          <div>
            <h4>Index — 05 / Contact</h4>
            <p className="word">
              Let&apos;s talk about your{' '}
              <span className="display-italic" style={{ color: 'var(--orange)' }}>
                vision
              </span>
              .
              <span className="small">Open Mon — Sun · By appointment</span>
            </p>
          </div>

          <div>
            <h4>Studio</h4>
            <ul>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/studio">The Space</Link>
              </li>
              <li>
                <Link to="/portfolio">Portfolio</Link>
              </li>
              <li>
                <Link to="/contact">Booking</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Connect</h4>
            <ul className="scr-foot-social">
              <li>
                <a href="https://www.instagram.com/lbbrandhaus" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/lbbrandhaus" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </li>
              <li>
                <a href="https://www.pinterest.com/lbbrandhaus" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.64 1.267 1.408 0 .858-.546 2.140-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.132-1.867 3.132-4.562 0-2.387-1.715-4.054-4.163-4.054-2.836 0-4.5 2.127-4.5 4.325 0 .856.33 1.775.741 2.276a.3.3 0 0 1 .069.285c-.076.313-.244.995-.277 1.134-.044.183-.146.222-.336.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Visit</h4>
            <address>
              Unit H38, New Horizon Mall
              <br />
              260300 Writing Creek Cres
              <br />
              Balzac, AB T4A 0X8
              <br />
              <br />
              (368) 599-0012
              <br />
              connect@lbbrandhaus.com
            </address>
          </div>
        </div>

        {showMassive && (
          <div className="massive">
            LB Brand <em>Haus</em>
          </div>
        )}

        <div className="bot">
          <span>© 2026 LB Brand Haus</span>
          <span>Site by Gridhouse Digital</span>
        </div>
      </div>
    </footer>
  )
}

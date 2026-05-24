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
            <ul>
              <li>Instagram ↗</li>
              <li>LinkedIn ↗</li>
              <li>Pinterest ↗</li>
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

import { useState, type ReactNode } from 'react'
import { Footer } from './Footer'
import { MobileMenu } from './MobileMenu'
import { Nav } from './Nav'

type SiteLayoutProps = {
  children: ReactNode
  showMassive?: boolean
}

export function SiteLayout({ children, showMassive = false }: SiteLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="scr">
      <Nav onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="scr-content">{children}</main>
      <Footer showMassive={showMassive} />
    </div>
  )
}

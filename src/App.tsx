import { Navigate, Route, Routes } from 'react-router-dom'
import Cursor from './components/Cursor'
import Intro from './components/Intro'
import PageTransition from './components/PageTransition'
import { SiteLayout } from './components/layout/SiteLayout'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import PortfolioPage from './pages/PortfolioPage'
import ServicesPage from './pages/ServicesPage'
import StudioPage from './pages/StudioPage'

function App() {
  return (
    <>
      <Intro />
      <Cursor />
      <PageTransition />
      <Routes>
        <Route
          path="/"
          element={
            <SiteLayout showMassive>
              <HomePage />
            </SiteLayout>
          }
        />
        <Route
          path="/services"
          element={
            <SiteLayout>
              <ServicesPage />
            </SiteLayout>
          }
        />
        <Route
          path="/studio"
          element={
            <SiteLayout>
              <StudioPage />
            </SiteLayout>
          }
        />
        <Route
          path="/portfolio"
          element={
            <SiteLayout>
              <PortfolioPage />
            </SiteLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <SiteLayout>
              <ContactPage />
            </SiteLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App

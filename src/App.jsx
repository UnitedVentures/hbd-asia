import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import SmoothScroll, { ScrollToTop } from './components/SmoothScroll'
import { Header, Footer, Page } from './components/Layout'
import Home from './pages/Home'
import Journeys from './pages/Journeys'
import JourneyDetail from './pages/JourneyDetail'
import { Destinations, DestinationDetail } from './pages/Destinations'
import Design from './pages/Design'
import { Plan, Stories, About, Contact, Groups, Legal } from './pages/Info'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <SmoothScroll />
      <ScrollToTop />
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/journeys" element={<Page><Journeys /></Page>} />
          <Route path="/journeys/:slug" element={<Page><JourneyDetail /></Page>} />
          <Route path="/destinations" element={<Page><Destinations /></Page>} />
          <Route path="/destinations/:slug" element={<Page><DestinationDetail /></Page>} />
          <Route path="/design-your-journey" element={<Page><Design /></Page>} />
          <Route path="/plan" element={<Page><Plan /></Page>} />
          <Route path="/stories" element={<Page><Stories /></Page>} />
          <Route path="/about" element={<Page><About /></Page>} />
          <Route path="/contact" element={<Page><Contact /></Page>} />
          <Route path="/groups" element={<Page><Groups /></Page>} />
          <Route path="/privacy" element={<Page><Legal kind="privacy" /></Page>} />
          <Route path="/terms" element={<Page><Legal kind="terms" /></Page>} />
          <Route path="*" element={<Page><NotFound /></Page>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}

import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useApp } from './context/AppContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import GalleryPage from './pages/GalleryPage'
import DetailPage from './pages/DetailPage'
import TimelinePage from './pages/TimelinePage'
import FaqPage from './pages/FaqPage'
import QuizSelectPage from './pages/QuizSelectPage'
import QuizPage from './pages/QuizPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'


export default function App() {
  const location = useLocation()
  const { darkMode } = useApp()

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tentang" element={<AboutPage />} />
          <Route path="/galeri" element={<GalleryPage />} />
          <Route path="/alat-musik/:slug" element={<DetailPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/kuis" element={<QuizSelectPage />} />
          <Route path="/kuis/:slug" element={<QuizPage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiMenu, FiX, FiMusic } from 'react-icons/fi'
import { useApp } from '../../context/AppContext'

const navLinks = [
  { path: '/', label: 'Beranda' },
  { path: '/tentang', label: 'Tentang' },
  { path: '/galeri', label: 'Galeri' },
  { path: '/timeline', label: 'Timeline' },
  { path: '/faq', label: 'FAQ' },
]

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const isLanding = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isLanding && !scrolled
            ? 'bg-transparent'
            : darkMode
            ? scrolled
              ? 'bg-[#1A0A0A]/95 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-[#C9A84C]/20'
              : 'bg-[#1A0A0A]/90 backdrop-blur-md border-b border-[#C9A84C]/10'
            : scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-[#7B1E1E]/10 border-b border-[#C9A84C]/20'
            : 'bg-[#F5ECD7]/90 backdrop-blur-md border-b border-[#C9A84C]/15'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 20 }}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#7B1E1E] flex items-center justify-center"
              >
                <FiMusic className="text-white text-lg" />
              </motion.div>
              <span className="font-bold text-lg hidden sm:block" style={{ fontFamily: 'Cinzel, serif' }}>
                <span className="text-[#C9A84C]">Nusantara</span>
                <span className={darkMode ? 'text-[#F5ECD7]' : isLanding && !scrolled ? 'text-white' : 'text-[#7B1E1E]'}> Sound</span>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-[#C9A84C]/20 text-[#C9A84C]'
                        : isLanding && !scrolled
                        ? 'text-white/90 hover:text-[#C9A84C] hover:bg-white/10'
                        : darkMode
                        ? 'text-[#F5ECD7]/80 hover:text-[#C9A84C] hover:bg-[#C9A84C]/10'
                        : 'text-[#3D2B1F]/80 hover:text-[#7B1E1E] hover:bg-[#7B1E1E]/10'
                    }`
                  }
                  end={link.path === '/'}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Dark mode toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors ${
                  isLanding && !scrolled ? 'text-white hover:bg-white/10'
                  : darkMode ? 'text-[#C9A84C] hover:bg-[#C9A84C]/20' : 'text-[#3D2B1F] hover:bg-[#7B1E1E]/10'
                }`}
              >
                {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              </motion.button>

              {/* Mobile hamburger */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileOpen(true)}
                className={`lg:hidden p-2 rounded-full transition-colors ${
                  isLanding && !scrolled ? 'text-white hover:bg-white/10'
                  : darkMode ? 'text-[#F5ECD7] hover:bg-[#C9A84C]/20' : 'text-[#3D2B1F] hover:bg-[#7B1E1E]/10'
                }`}
              >
                <FiMenu size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90]"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className={`absolute right-0 top-0 h-full w-72 shadow-2xl p-6 pt-20 ${
                darkMode ? 'bg-[#1A0A0A]' : 'bg-white'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setMobileOpen(false)}
                className={`absolute top-5 right-5 p-2 rounded-full ${
                  darkMode ? 'text-[#F5ECD7] hover:bg-[#C9A84C]/20' : 'text-[#3D2B1F] hover:bg-[#7B1E1E]/10'
                }`}
              >
                <FiX size={22} />
              </button>
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-[#C9A84C]/15 text-[#C9A84C]'
                          : darkMode
                          ? 'text-[#F5ECD7]/80 hover:text-[#C9A84C]'
                          : 'text-[#3D2B1F]/80 hover:text-[#7B1E1E]'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

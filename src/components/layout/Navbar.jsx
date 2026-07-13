import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiSearch, FiMenu, FiX, FiBookmark, FiMusic } from 'react-icons/fi'
import { useApp } from '../../context/AppContext'

const navLinks = [
  { path: '/', label: 'Beranda' },
  { path: '/tentang', label: 'Tentang' },
  { path: '/galeri', label: 'Galeri' },
  { path: '/timeline', label: 'Timeline' },
  { path: '/faq', label: 'FAQ' },
]

export default function Navbar() {
  const { darkMode, toggleDarkMode, bookmarks, searchQuery, setSearchQuery } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/galeri?q=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? darkMode
              ? 'bg-[#1A0A0A]/95 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-[#C9A84C]/20'
              : 'bg-white/90 backdrop-blur-xl shadow-lg shadow-[#7B1E1E]/10 border-b border-[#C9A84C]/20'
            : 'bg-transparent'
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
                <span className={darkMode ? 'text-[#F5ECD7]' : 'text-[#7B1E1E]'}> Sound</span>
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
                        : !scrolled
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
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(true)}
                className={`p-2 rounded-full transition-colors ${
                  !scrolled ? 'text-white hover:bg-white/10'
                  : darkMode ? 'text-[#F5ECD7] hover:bg-[#C9A84C]/20' : 'text-[#3D2B1F] hover:bg-[#7B1E1E]/10'
                }`}
              >
                <FiSearch size={18} />
              </motion.button>

              <Link to="/galeri?filter=bookmarks">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-full relative transition-colors ${
                    !scrolled ? 'text-white hover:bg-white/10'
                    : darkMode ? 'text-[#F5ECD7] hover:bg-[#C9A84C]/20' : 'text-[#3D2B1F] hover:bg-[#7B1E1E]/10'
                  }`}
                >
                  <FiBookmark size={18} />
                  {bookmarks.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A84C] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                      {bookmarks.length}
                    </span>
                  )}
                </motion.div>
              </Link>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors ${
                  !scrolled ? 'text-white hover:bg-white/10'
                  : darkMode ? 'text-[#C9A84C] hover:bg-[#C9A84C]/20' : 'text-[#3D2B1F] hover:bg-[#7B1E1E]/10'
                }`}
              >
                {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileOpen(true)}
                className={`lg:hidden p-2 rounded-full transition-colors ${
                  !scrolled ? 'text-white hover:bg-white/10'
                  : darkMode ? 'text-[#F5ECD7] hover:bg-[#C9A84C]/20' : 'text-[#3D2B1F] hover:bg-[#7B1E1E]/10'
                }`}
              >
                <FiMenu size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -30, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-xl rounded-2xl p-6 shadow-2xl ${
                darkMode ? 'bg-[#1A0A0A] border border-[#C9A84C]/30' : 'bg-white border border-[#C9A84C]/30'
              }`}
            >
              <p className={`text-sm mb-3 font-medium ${darkMode ? 'text-[#C9A84C]' : 'text-[#7B1E1E]'}`}>
                Cari Alat Musik
              </p>
              <form onSubmit={handleSearch} className="flex gap-3">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Contoh: Gamelan, Angklung, Sasando..."
                  className={`flex-1 px-4 py-3 rounded-xl border outline-none text-sm transition-colors ${
                    darkMode
                      ? 'bg-[#2A1515] border-[#C9A84C]/30 text-[#F5ECD7] placeholder-[#8B5E3C] focus:border-[#C9A84C]'
                      : 'bg-[#F5ECD7] border-[#C9A84C]/40 text-[#3D2B1F] placeholder-[#8B5E3C] focus:border-[#C9A84C]'
                  }`}
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  Cari
                </button>
              </form>
              <button
                onClick={() => setSearchOpen(false)}
                className={`mt-3 text-xs ${darkMode ? 'text-[#F5ECD7]/50' : 'text-[#3D2B1F]/50'}`}
              >
                Tekan ESC atau klik di luar untuk menutup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

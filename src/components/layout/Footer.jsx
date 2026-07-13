import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMusic, FiInstagram, FiYoutube, FiGithub, FiHeart } from 'react-icons/fi'
import { useApp } from '../../context/AppContext'

const footerLinks = [
  { title: 'Jelajahi', links: [{ to: '/galeri', label: 'Galeri Alat Musik' }, { to: '/kuis', label: 'Kuis Interaktif' }, { to: '/timeline', label: 'Timeline Sejarah' }] },
  { title: 'Informasi', links: [{ to: '/tentang', label: 'Tentang Website' }, { to: '/faq', label: 'FAQ' }, { to: '/profil', label: 'Profil Developer' }] },
]

export default function Footer() {
  const { darkMode } = useApp()
  return (
    <footer className={`relative overflow-hidden pt-16 pb-8 batik-pattern ${darkMode ? 'bg-[#1A0A0A]' : 'bg-[#3D2B1F]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#C9A84C]/20">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#7B1E1E] flex items-center justify-center">
                <FiMusic className="text-white text-lg" />
              </div>
              <span className="font-bold text-xl text-[#C9A84C]" style={{ fontFamily: 'Cinzel,serif' }}>Nusantara Sound</span>
            </Link>
            <p className="text-[#F5ECD7]/60 text-sm leading-relaxed max-w-xs">
              Platform multimedia interaktif untuk mengenal dan melestarikan alat musik tradisional Indonesia yang kaya dan beragam.
            </p>
            <div className="flex gap-3 mt-5">
              {[{ Icon: FiInstagram, href: '#' }, { Icon: FiYoutube, href: '#' }, { Icon: FiGithub, href: '#' }].map(({ Icon, href }, i) => (
                <motion.a key={i} href={href} whileHover={{ scale: 1.15, y: -2 }}
                  className="w-9 h-9 rounded-full border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C]/20 transition-colors"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-[#C9A84C] font-semibold text-sm mb-4 tracking-wider uppercase">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-[#F5ECD7]/60 text-sm hover:text-[#C9A84C] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#F5ECD7]/40 text-sm">© 2025 Nusantara Sound. Semua hak dilindungi.</p>
          <p className="text-[#F5ECD7]/40 text-sm flex items-center gap-1">
            Dibuat dengan <FiHeart className="text-[#C9A84C]" size={12} /> untuk budaya Indonesia
          </p>
        </div>
      </div>
    </footer>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageWrapper from '../components/common/PageWrapper'
import { useApp } from '../context/AppContext'

export default function NotFoundPage() {
  const { darkMode } = useApp()
  return (
    <PageWrapper>
      <div className={`min-h-screen flex items-center justify-center text-center px-4 ${darkMode ? 'bg-[#1A0A0A]' : 'bg-[#F5ECD7]'}`}>
        <div>
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="text-8xl mb-6">🎵</motion.div>
          <h1 className={`text-6xl font-black mb-4 ${darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'}`} style={{ fontFamily: 'Playfair Display, serif' }}>404</h1>
          <h2 className={`text-xl font-bold mb-3 ${darkMode ? 'text-[#F5ECD7]/80' : 'text-[#3D2B1F]/80'}`}>Halaman Tidak Ditemukan</h2>
          <p className={`text-sm mb-8 ${darkMode ? 'text-[#F5ECD7]/50' : 'text-[#3D2B1F]/50'}`}>Sepertinya nada yang kamu cari tidak ada di sini.</p>
          <Link to="/">
            <motion.button whileHover={{ scale: 1.05 }} className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-white font-semibold">
              Kembali ke Beranda
            </motion.button>
          </Link>
        </div>
      </div>
    </PageWrapper>
  )
}

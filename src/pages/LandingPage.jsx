import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowDown, FiPlay, FiBookOpen, FiAward } from 'react-icons/fi'
import PageWrapper from '../components/common/PageWrapper'
import InstrumentCard from '../components/common/InstrumentCard'
import instruments from '../data/instruments.json'
import { useApp } from '../context/AppContext'


const features = [
  { icon: <FiPlay />, title: 'Audio & Video', desc: 'Dengarkan suara asli dan tonton video cara memainkan setiap alat musik.' },
  { icon: <FiBookOpen />, title: 'Informasi Lengkap', desc: 'Sejarah, fungsi, bahan, cara memainkan, dan fakta menarik tersedia.' },
  { icon: <FiAward />, title: 'Kuis Interaktif', desc: 'Uji pengetahuanmu langsung di setiap halaman alat musik dengan mini kuis 4 soal.' },
]

export default function LandingPage() {
  const { darkMode } = useApp()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const featured = instruments.filter(i => i.featured)

  return (
    <PageWrapper>
      {/* Hero */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="/images/hero-bg.jpg"
            alt="Gamelan background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          <div className="absolute inset-0 batik-pattern-dark" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-4 py-1.5 rounded-full border border-[#C9A84C]/50 text-[#C9A84C] text-sm font-medium mb-6 backdrop-blur-sm bg-black/20"
          >
            🎶 Warisan Budaya Nusantara
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Jelajahi Musik
            <span className="block gold-text">Tradisional Indonesia</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10"
          >
            Kenali kekayaan alat musik tradisional Nusantara melalui pengalaman multimedia yang interaktif dan mendalam.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/galeri">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-white font-semibold text-base shadow-lg shadow-[#C9A84C]/30 hover:shadow-[#C9A84C]/50 transition-shadow"
              >
                Jelajahi Sekarang
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <FiArrowDown size={18} />
        </motion.div>
      </section>


      {/* Featured */}
      <section className={`py-20 px-4 ${darkMode ? 'bg-[#1A0A0A]' : 'bg-[#F5ECD7]'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-2">Pilihan Unggulan</p>
            <h2 className={`text-4xl font-black ${darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'}`}>
              Alat Musik Terpopuler
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((inst, i) => <InstrumentCard key={inst.id} instrument={inst} index={i} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/galeri">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3.5 rounded-full border-2 border-[#C9A84C] text-[#C9A84C] font-semibold hover:bg-[#C9A84C] hover:text-white transition-all"
              >
                Lihat Semua Alat Musik
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={`py-20 px-4 ${darkMode ? 'bg-[#2A1515]' : 'bg-[#E8D5B5]'} batik-pattern`}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-4xl font-black ${darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'}`}>
              Fitur Website
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`p-6 rounded-2xl border ${darkMode ? 'bg-[#1A0A0A] border-[#C9A84C]/20' : 'bg-white border-[#C9A84C]/30'}`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#7B1E1E] flex items-center justify-center text-white text-xl mb-4">
                  {f.icon}
                </div>
                <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'}`}>{f.title}</h3>
                <p className={`text-sm ${darkMode ? 'text-[#F5ECD7]/60' : 'text-[#3D2B1F]/60'}`}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </PageWrapper>
  )
}

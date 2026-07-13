import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiPlay, FiStar } from 'react-icons/fi'
import PageWrapper from '../components/common/PageWrapper'
import instruments from '../data/instruments.json'
import { useApp } from '../context/AppContext'

const TYPE_COLORS = {
  Petik: 'from-amber-500 to-orange-600',
  Pukul: 'from-red-500 to-rose-700',
  Tiup: 'from-sky-500 to-blue-700',
  Gesek: 'from-violet-500 to-purple-700',
  Guncang: 'from-emerald-500 to-teal-700',
}

export default function QuizSelectPage() {
  const { darkMode } = useApp()
  const [search, setSearch] = useState('')

  const filtered = instruments.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.region.toLowerCase().includes(search.toLowerCase()) ||
      i.type.toLowerCase().includes(search.toLowerCase())
  )

  const bg = darkMode ? 'bg-[#1A0A0A]' : 'bg-[#F5ECD7]'
  const card = darkMode
    ? 'bg-[#2A1515] border-[#C9A84C]/20 hover:border-[#C9A84C]/60'
    : 'bg-white border-[#C9A84C]/30 hover:border-[#C9A84C]'
  const text = darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'
  const subtext = darkMode ? 'text-[#F5ECD7]/50' : 'text-[#3D2B1F]/50'

  return (
    <PageWrapper>
      <div className={`min-h-screen pt-24 pb-16 px-4 ${bg}`}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="text-6xl mb-4">🎓</div>
            <h1
              className={`text-4xl sm:text-5xl font-black mb-3 ${text}`}
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Pilih Kuis
            </h1>
            <p className={`text-base max-w-xl mx-auto ${subtext}`}>
              Pilih alat musik tertentu atau uji semua pengetahuanmu sekaligus!
            </p>
          </motion.div>

          {/* All instruments quiz card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8"
          >
            <Link to="/kuis/semua">
              <motion.div
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-[#7B1E1E] via-[#A07830] to-[#C9A84C] text-white shadow-xl shadow-[#C9A84C]/20 cursor-pointer"
              >
                <div className="absolute inset-0 batik-pattern-dark opacity-20" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FiStar className="text-yellow-300" />
                      <span className="text-sm font-semibold text-yellow-200 uppercase tracking-widest">
                        Kuis Lengkap
                      </span>
                    </div>
                    <h2 className="text-3xl font-black mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Semua Alat Musik
                    </h2>
                    <p className="text-white/70 text-sm">
                      {instruments.length * 4} soal · Mencakup seluruh {instruments.length} alat musik
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl"
                  >
                    🎵
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative mb-6"
          >
            <FiSearch className={`absolute left-4 top-1/2 -translate-y-1/2 ${subtext}`} size={18} />
            <input
              type="text"
              placeholder="Cari alat musik..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border text-sm outline-none transition-all ${
                darkMode
                  ? 'bg-[#2A1515] border-[#C9A84C]/30 text-[#F5ECD7] placeholder-[#F5ECD7]/30 focus:border-[#C9A84C]'
                  : 'bg-white border-[#C9A84C]/30 text-[#3D2B1F] placeholder-[#3D2B1F]/40 focus:border-[#C9A84C]'
              }`}
            />
          </motion.div>

          {/* Instrument Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((inst, i) => (
              <motion.div
                key={inst.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link to={`/kuis/${inst.slug}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    className={`group relative overflow-hidden rounded-2xl border transition-all cursor-pointer ${card}`}
                  >
                    {/* Thumbnail */}
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={inst.image}
                        alt={inst.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      {/* type badge */}
                      <span
                        className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${
                          TYPE_COLORS[inst.type] || 'from-gray-500 to-gray-700'
                        }`}
                      >
                        {inst.type}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className={`font-black text-base mb-0.5 ${text}`}>
                        {inst.name}
                      </h3>
                      <p className={`text-xs mb-3 ${subtext}`}>{inst.region}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs ${subtext}`}>4 soal</span>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-white text-xs font-semibold"
                        >
                          <FiPlay size={10} />
                          Mulai
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className={`text-center py-16 ${subtext}`}>
              <div className="text-5xl mb-3">🔍</div>
              <p>Tidak ada alat musik yang ditemukan.</p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}

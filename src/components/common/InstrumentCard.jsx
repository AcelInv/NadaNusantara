import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiBookmark, FiMapPin, FiMusic } from 'react-icons/fi'
import { useApp } from '../../context/AppContext'
import toast from 'react-hot-toast'

const typeColors = {
  Pukul: 'from-orange-400 to-red-500',
  Petik: 'from-emerald-400 to-teal-600',
  Tiup: 'from-sky-400 to-blue-600',
  Gesek: 'from-purple-400 to-violet-600',
  Guncang: 'from-pink-400 to-rose-600',
}

export default function InstrumentCard({ instrument, index = 0 }) {
  const { darkMode, toggleBookmark, isBookmarked } = useApp()
  const bookmarked = isBookmarked(instrument.id)

  const handleBookmark = (e) => {
    e.preventDefault()
    toggleBookmark(instrument.id)
    toast(bookmarked ? `Dihapus dari bookmark` : `${instrument.name} disimpan!`, {
      icon: bookmarked ? '🗑️' : '🔖',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="card-glow group"
    >
      <Link to={`/alat-musik/${instrument.slug}`}>
        <div className={`rounded-2xl overflow-hidden border transition-colors duration-300 ${
          darkMode
            ? 'bg-[#2A1515] border-[#C9A84C]/10 hover:border-[#C9A84C]/30'
            : 'bg-white border-[#C9A84C]/20 hover:border-[#C9A84C]/50'
        }`}>
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={instrument.image}
              alt={instrument.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                e.target.src = `https://placehold.co/600x400/7B1E1E/C9A84C?text=${encodeURIComponent(instrument.name)}`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Type badge */}
            <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${typeColors[instrument.type] || 'from-gray-400 to-gray-600'}`}>
              {instrument.type}
            </div>

            {/* Bookmark btn */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleBookmark}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
                bookmarked ? 'bg-[#C9A84C] text-white' : 'bg-black/30 text-white hover:bg-[#C9A84C]/80'
              }`}
            >
              <FiBookmark size={14} fill={bookmarked ? 'currentColor' : 'none'} />
            </motion.button>

            {/* Name overlay */}
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="text-white font-bold text-lg leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                {instrument.name}
              </h3>
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <FiMapPin size={12} className="text-[#C9A84C]" />
              <span className={`text-xs font-medium ${darkMode ? 'text-[#C9A84C]/80' : 'text-[#8B5E3C]'}`}>
                {instrument.region}
              </span>
            </div>
            <p className={`text-sm line-clamp-2 ${darkMode ? 'text-[#F5ECD7]/60' : 'text-[#3D2B1F]/60'}`}>
              {instrument.description}
            </p>

            <div className={`mt-3 flex items-center gap-1 text-xs font-medium ${darkMode ? 'text-[#C9A84C]' : 'text-[#7B1E1E]'}`}>
              <FiMusic size={12} />
              <span>Lihat Detail →</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

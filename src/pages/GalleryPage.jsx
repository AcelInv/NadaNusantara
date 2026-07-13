import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiGrid, FiList } from 'react-icons/fi'
import PageWrapper from '../components/common/PageWrapper'
import InstrumentCard from '../components/common/InstrumentCard'
import { SkeletonCard } from '../components/common/Skeleton'
import instruments from '../data/instruments.json'
import { useApp } from '../context/AppContext'

const regions = ['all', ...new Set(instruments.map(i => i.region))]
const types = ['all', ...new Set(instruments.map(i => i.type))]

export default function GalleryPage() {
  const { darkMode, bookmarks, filterRegion, setFilterRegion, filterType, setFilterType } = useApp()
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('grid')
  const [showBookmarks, setShowBookmarks] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  // Inisialisasi dari URL params saat pertama kali load
  useEffect(() => {
    const q = searchParams.get('q') || ''
    setSearchInput(q)
    if (searchParams.get('filter') === 'bookmarks') setShowBookmarks(true)
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Reactive: update input ketika URL berubah (misal dari navbar search)
  useEffect(() => {
    const q = searchParams.get('q') || ''
    setSearchInput(q)
  }, [searchParams])

  // Update URL saat user mengetik di kotak pencarian galeri
  const handleSearchChange = (val) => {
    setSearchInput(val)
    const params = new URLSearchParams(searchParams)
    if (val) params.set('q', val)
    else params.delete('q')
    setSearchParams(params, { replace: true })
  }

  const filtered = useMemo(() => {
    let list = instruments
    if (showBookmarks) list = list.filter(i => bookmarks.includes(i.id))
    if (searchInput.trim()) {
      const q = searchInput.toLowerCase()
      list = list.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.region.toLowerCase().includes(q) ||
        i.type.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q)
      )
    }
    if (filterRegion !== 'all') list = list.filter(i => i.region === filterRegion)
    if (filterType !== 'all') list = list.filter(i => i.type === filterType)
    return list
  }, [searchInput, filterRegion, filterType, showBookmarks, bookmarks])

  return (
    <PageWrapper>
      <div className={`min-h-screen pt-20 ${darkMode ? 'bg-[#1A0A0A]' : 'bg-[#F5ECD7]'}`}>
        {/* Header */}
        <div className={`py-16 px-4 text-center batik-pattern ${darkMode ? 'bg-[#2A1515]' : 'bg-[#3D2B1F]'}`}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3">
            Koleksi Lengkap
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Galeri Alat Musik Tradisional
          </motion.h1>
          <p className="text-white/60 mt-3 max-w-xl mx-auto">
            Temukan {instruments.length} alat musik tradisional dari berbagai penjuru Nusantara.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Filters */}
          <div className={`flex flex-col md:flex-row gap-4 mb-8 p-4 rounded-2xl border ${darkMode ? 'bg-[#2A1515] border-[#C9A84C]/20' : 'bg-white border-[#C9A84C]/20'}`}>
            {/* Search */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A84C]" size={16} />
              <input
                type="text"
                placeholder="Cari alat musik, daerah, atau jenis..."
                value={searchInput}
                onChange={e => handleSearchChange(e.target.value)}
                className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                  darkMode
                    ? 'bg-[#1A0A0A] border-[#C9A84C]/20 text-[#F5ECD7] placeholder-[#8B5E3C] focus:border-[#C9A84C]'
                    : 'bg-[#F5ECD7] border-[#C9A84C]/30 text-[#3D2B1F] focus:border-[#C9A84C]'
                }`}
              />
            </div>

            {/* Region filter */}
            <select
              value={filterRegion}
              onChange={e => setFilterRegion(e.target.value)}
              className={`px-4 py-2.5 rounded-xl border text-sm outline-none cursor-pointer ${
                darkMode ? 'bg-[#1A0A0A] border-[#C9A84C]/20 text-[#F5ECD7]' : 'bg-[#F5ECD7] border-[#C9A84C]/30 text-[#3D2B1F]'
              }`}
            >
              {regions.map(r => <option key={r} value={r}>{r === 'all' ? 'Semua Daerah' : r}</option>)}
            </select>

            {/* Type filter */}
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className={`px-4 py-2.5 rounded-xl border text-sm outline-none cursor-pointer ${
                darkMode ? 'bg-[#1A0A0A] border-[#C9A84C]/20 text-[#F5ECD7]' : 'bg-[#F5ECD7] border-[#C9A84C]/30 text-[#3D2B1F]'
              }`}
            >
              {types.map(t => <option key={t} value={t}>{t === 'all' ? 'Semua Jenis' : t}</option>)}
            </select>

            {/* Bookmark toggle */}
            <button
              onClick={() => setShowBookmarks(p => !p)}
              className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                showBookmarks
                  ? 'bg-[#C9A84C] border-[#C9A84C] text-white'
                  : darkMode
                  ? 'bg-[#1A0A0A] border-[#C9A84C]/20 text-[#F5ECD7]'
                  : 'bg-[#F5ECD7] border-[#C9A84C]/30 text-[#3D2B1F]'
              }`}
            >
              🔖 Favorit ({bookmarks.length})
            </button>

            {/* View toggle */}
            <div className={`flex rounded-xl border overflow-hidden ${darkMode ? 'border-[#C9A84C]/20' : 'border-[#C9A84C]/30'}`}>
              <button onClick={() => setView('grid')} className={`px-3 py-2.5 transition-colors ${view === 'grid' ? 'bg-[#C9A84C] text-white' : darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'}`}><FiGrid /></button>
              <button onClick={() => setView('list')} className={`px-3 py-2.5 transition-colors ${view === 'list' ? 'bg-[#C9A84C] text-white' : darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'}`}><FiList /></button>
            </div>
          </div>

          {/* Results count */}
          <p className={`text-sm mb-6 ${darkMode ? 'text-[#F5ECD7]/50' : 'text-[#3D2B1F]/50'}`}>
            Menampilkan <span className="text-[#C9A84C] font-semibold">{filtered.length}</span> alat musik
          </p>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🎵</div>
              <h3 className={`text-xl font-bold ${darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'}`}>Tidak Ada Hasil</h3>
              <p className={`text-sm mt-2 ${darkMode ? 'text-[#F5ECD7]/50' : 'text-[#3D2B1F]/50'}`}>Coba ubah filter atau kata kunci pencarian.</p>
            </div>
          ) : (
            <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'flex flex-col gap-4'}>
              {filtered.map((inst, i) => <InstrumentCard key={inst.id} instrument={inst} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}

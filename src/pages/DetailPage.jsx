import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowLeft, FiMapPin, FiMusic, FiX, FiChevronRight, FiPlay, FiRefreshCw } from 'react-icons/fi'
import PageWrapper from '../components/common/PageWrapper'
import instruments from '../data/instruments.json'
import { useApp } from '../context/AppContext'
import { generateQuizForInstrument } from '../utils/quizGenerator'
import ScaleDemonstrator from '../components/common/ScaleDemonstrator'

function AudioPlayer({ url }) {
  const { darkMode } = useApp()
  if (!url) return (
    <div className={`flex items-center gap-3 p-4 rounded-xl border ${darkMode ? 'bg-[#2A1515] border-[#C9A84C]/20' : 'bg-[#F5ECD7] border-[#C9A84C]/30'}`}>
      <FiMusic className="text-[#C9A84C]" />
      <span className={`text-sm ${darkMode ? 'text-[#F5ECD7]/50' : 'text-[#3D2B1F]/50'}`}>Audio akan segera tersedia</span>
    </div>
  )
  return (
    <audio controls className="w-full rounded-xl" style={{ accentColor: '#C9A84C' }}>
      <source src={url} type="audio/mpeg" />
    </audio>
  )
}

export default function DetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { darkMode } = useApp()
  const [activeImg, setActiveImg] = useState(null)
  const [activeTab, setActiveTab] = useState('sejarah')

  const instrument = instruments.find(i => i.slug === slug)

  // Quiz state
  const quizData = useMemo(
    () => instrument ? generateQuizForInstrument(instrument, instruments) : [],
    [slug] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const [quizPhase, setQuizPhase] = useState('idle') // idle | active | done
  const [qIdx, setQIdx] = useState(0)
  const [qSelected, setQSelected] = useState(null)
  const [qScore, setQScore] = useState(0)
  const [qAnswers, setQAnswers] = useState([])
  const [showExp, setShowExp] = useState(false)

  const resetQuiz = () => { setQuizPhase('idle'); setQIdx(0); setQSelected(null); setQScore(0); setQAnswers([]); setShowExp(false) }
  const handleQAnswer = (idx) => {
    if (qSelected !== null) return
    setQSelected(idx)
    setShowExp(true)
    if (idx === quizData[qIdx].answer) setQScore(s => s + 1)
    setQAnswers(prev => [...prev, { selected: idx, correct: quizData[qIdx].answer }])
  }
  const handleQNext = () => {
    if (qIdx + 1 < quizData.length) { setQIdx(i => i + 1); setQSelected(null); setShowExp(false) }
    else setQuizPhase('done')
  }

  if (!instrument) return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-[#1A0A0A] text-[#F5ECD7]' : 'bg-[#F5ECD7] text-[#3D2B1F]'}`}>
      <div className="text-center">
        <div className="text-6xl mb-4">🎵</div>
        <h2 className="text-2xl font-bold mb-2">Alat musik tidak ditemukan</h2>
        <Link to="/galeri" className="text-[#C9A84C] underline">Kembali ke Galeri</Link>
      </div>
    </div>
  )

  const tabs = ['sejarah', 'cara memainkan', 'bahan', 'fakta']

  const related = instruments.filter(i => i.region === instrument.region && i.id !== instrument.id).slice(0, 3)

  const tabContent = {
    sejarah: instrument.history,
    'cara memainkan': instrument.howToPlay,
    bahan: instrument.materials,
    fakta: instrument.facts?.join(' • ') ?? '-',
  }

  return (
    <PageWrapper>
      <div className={`min-h-screen pt-20 ${darkMode ? 'bg-[#1A0A0A]' : 'bg-[#F5ECD7]'}`}>
        {/* Back */}
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <button onClick={() => navigate(-1)} className={`flex items-center gap-2 text-sm font-medium mb-6 ${darkMode ? 'text-[#F5ECD7]/60 hover:text-[#C9A84C]' : 'text-[#3D2B1F]/60 hover:text-[#7B1E1E]'} transition-colors`}>
            <FiArrowLeft /> Kembali
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-4 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Image */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] cursor-zoom-in shadow-xl"
              onClick={() => setActiveImg(instrument.image)}
            >
              <img src={instrument.image} alt={instrument.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" onError={e => { e.target.src = `https://placehold.co/800x600/7B1E1E/C9A84C?text=${instrument.name}` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/50 text-white text-xs backdrop-blur-sm">Klik untuk perbesar</div>
            </motion.div>

            {/* Thumbnails */}
            {instrument.images?.length > 1 && (
              <div className="flex gap-2 mt-3">
                {instrument.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(img)} className="w-16 h-16 rounded-xl overflow-hidden border-2 border-[#C9A84C]/30 hover:border-[#C9A84C]">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Video */}
            {instrument.videoUrl && (
              <div className="mt-6">
                <h3 className={`font-bold mb-3 ${darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'}`}>🎬 Video Cara Memainkan</h3>
                <div className="rounded-xl overflow-hidden aspect-video">
                  <iframe src={instrument.videoUrl} title="Video" className="w-full h-full" allowFullScreen frameBorder="0" />
                </div>
              </div>
            )}
          </div>

          {/* Right: Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${darkMode ? 'bg-[#C9A84C]/20 text-[#C9A84C]' : 'bg-[#7B1E1E]/10 text-[#7B1E1E]'}`}>
                  {instrument.type}
                </div>
                <h1 className={`text-4xl font-black ${darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'}`} style={{ fontFamily: 'Playfair Display, serif' }}>
                  {instrument.name}
                </h1>
                <div className="flex items-center gap-1.5 mt-2">
                  <FiMapPin className="text-[#C9A84C]" size={14} />
                  <span className={`text-sm ${darkMode ? 'text-[#F5ECD7]/60' : 'text-[#8B5E3C]'}`}>{instrument.region}</span>
                </div>
              </div>
            </div>

            <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-[#F5ECD7]/70' : 'text-[#3D2B1F]/70'}`}>
              {instrument.description}
            </p>


            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
                    activeTab === tab
                      ? 'bg-[#C9A84C] text-white'
                      : darkMode
                      ? 'bg-[#2A1515] text-[#F5ECD7]/60 hover:text-[#C9A84C]'
                      : 'bg-[#E8D5B5] text-[#3D2B1F]/60 hover:text-[#7B1E1E]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-4 rounded-xl text-sm leading-relaxed mb-6 ${darkMode ? 'bg-[#2A1515] text-[#F5ECD7]/80' : 'bg-[#E8D5B5] text-[#3D2B1F]/80'}`}
              >
                {tabContent[activeTab]}
              </motion.div>
            </AnimatePresence>

            {/* Function */}
            <div className={`p-4 rounded-xl border mb-4 ${darkMode ? 'border-[#C9A84C]/20 bg-[#2A1515]' : 'border-[#C9A84C]/30 bg-white'}`}>
              <h4 className={`font-semibold text-sm mb-1 ${darkMode ? 'text-[#C9A84C]' : 'text-[#7B1E1E]'}`}>🎯 Fungsi</h4>
              <p className={`text-sm ${darkMode ? 'text-[#F5ECD7]/70' : 'text-[#3D2B1F]/70'}`}>{instrument.function}</p>
            </div>

            {/* Scale Demonstrator */}
            {instrument?.scaleData ? (
              <div className="mb-4">
                <ScaleDemonstrator 
                  scaleName={instrument.scaleData.name} 
                  notes={instrument.scaleData.notes || []} 
                  instrumentType={instrument.type}
                />
              </div>
            ) : (
              <div className="mb-4 p-4 rounded-xl border border-dashed border-gray-300 text-center opacity-60">
                Data audio belum tersedia
              </div>
            )}


            {/* Facts */}
            {instrument.facts?.length > 0 && (
              <div className="mt-6">
                <h4 className={`font-semibold text-sm mb-3 ${darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'}`}>💡 Fakta Menarik</h4>
                <ul className="space-y-2">
                  {instrument.facts.map((fact, i) => (
                    <li key={i} className={`flex items-start gap-2 text-sm ${darkMode ? 'text-[#F5ECD7]/70' : 'text-[#3D2B1F]/70'}`}>
                      <FiChevronRight className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className={`py-12 px-4 ${darkMode ? 'bg-[#2A1515]' : 'bg-[#E8D5B5]'}`}>
            <div className="max-w-6xl mx-auto">
              <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'}`}>Alat Musik Daerah yang Sama</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map((inst, i) => (
                  <Link key={inst.id} to={`/alat-musik/${inst.slug}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#C9A84C]/10 transition-colors">
                    <img src={inst.image} alt={inst.name} className="w-16 h-16 rounded-xl object-cover" onError={e => { e.target.src = `https://placehold.co/64/7B1E1E/C9A84C?text=${inst.name[0]}` }} />
                    <div>
                      <p className={`font-semibold text-sm ${darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'}`}>{inst.name}</p>
                      <p className="text-xs text-[#C9A84C]">{inst.type}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── KUIS INSTRUMEN ─────────────────────────────── */}
        <div className={`py-12 px-4 ${darkMode ? 'bg-[#1A0A0A]' : 'bg-[#F5ECD7]'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-1">Mini Kuis</p>
                <h3 className={`text-2xl font-black ${darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'}`}
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  Uji Pengetahuanmu tentang {instrument.name}
                </h3>
              </div>
              {quizPhase !== 'idle' && (
                <button onClick={resetQuiz}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    darkMode ? 'border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C]/10' : 'border-[#C9A84C]/50 text-[#C9A84C] hover:bg-[#C9A84C]/10'
                  }`}>
                  <FiRefreshCw size={12} /> Reset
                </button>
              )}
            </div>

            {/* IDLE */}
            {quizPhase === 'idle' && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className={`flex flex-col sm:flex-row items-center gap-6 p-8 rounded-2xl border ${
                  darkMode ? 'bg-[#2A1515] border-[#C9A84C]/20' : 'bg-white border-[#C9A84C]/20'
                }`}>
                <div className="text-6xl">🎓</div>
                <div className="flex-1 text-center sm:text-left">
                  <p className={`font-semibold mb-1 ${darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'}`}>
                    {quizData.length} soal tentang {instrument.name}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-[#F5ECD7]/50' : 'text-[#3D2B1F]/50'}`}>
                    Meliputi asal daerah, jenis, bahan, dan cara memainkan.
                  </p>
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setQuizPhase('active')}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-white font-bold text-sm">
                  <FiPlay size={14} /> Mulai Kuis
                </motion.button>
              </motion.div>
            )}

            {/* ACTIVE */}
            {quizPhase === 'active' && quizData[qIdx] && (() => {
              const q = quizData[qIdx]
              return (
                <AnimatePresence mode="wait">
                  <motion.div key={qIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className={`p-6 rounded-2xl border ${
                      darkMode ? 'bg-[#2A1515] border-[#C9A84C]/20' : 'bg-white border-[#C9A84C]/20'
                    }`}>
                    {/* Progress */}
                    <div className="flex justify-between text-xs mb-3">
                      <span className={darkMode ? 'text-[#F5ECD7]/50' : 'text-[#3D2B1F]/50'}>Soal {qIdx + 1} / {quizData.length}</span>
                      <span className="text-[#C9A84C] font-semibold">Skor: {qScore}</span>
                    </div>
                    <div className={`h-1.5 rounded-full mb-5 ${darkMode ? 'bg-[#3D2020]' : 'bg-[#E8D5B5]'}`}>
                      <motion.div className="h-1.5 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#A07830]"
                        animate={{ width: `${((qIdx + 1) / quizData.length) * 100}%` }} />
                    </div>
                    <p className={`font-bold text-base mb-4 ${darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'}`}>{q.question}</p>
                    <div className="space-y-2 mb-4">
                      {q.options.map((opt, idx) => {
                        let style = darkMode
                          ? 'bg-[#1A0A0A] border-[#C9A84C]/20 text-[#F5ECD7] hover:border-[#C9A84C]/50'
                          : 'bg-[#F5ECD7] border-[#C9A84C]/30 text-[#3D2B1F] hover:border-[#C9A84C]'
                        if (qSelected !== null) {
                          if (idx === q.answer) style = 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                          else if (idx === qSelected) style = 'bg-red-500/20 border-red-500 text-red-400'
                          else style = darkMode ? 'bg-[#1A0A0A] border-[#C9A84C]/10 text-[#F5ECD7]/40' : 'bg-[#F5ECD7] border-[#C9A84C]/10 text-[#3D2B1F]/40'
                        }
                        return (
                          <motion.button key={idx} whileHover={qSelected === null ? { x: 4 } : {}}
                            onClick={() => handleQAnswer(idx)}
                            className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${style}`}>
                            <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>{opt}
                          </motion.button>
                        )
                      })}
                    </div>
                    {showExp && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className={`p-3 rounded-xl text-xs mb-3 ${
                          qSelected === q.answer ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                        💡 {q.explanation}
                      </motion.div>
                    )}
                    {qSelected !== null && (
                      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ scale: 1.02 }}
                        onClick={handleQNext}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-white font-semibold text-sm">
                        {qIdx + 1 < quizData.length ? 'Soal Berikutnya →' : 'Lihat Hasil'}
                      </motion.button>
                    )}
                  </motion.div>
                </AnimatePresence>
              )
            })()}

            {/* DONE */}
            {quizPhase === 'done' && (() => {
              const pct = Math.round((qScore / quizData.length) * 100)
              const grade = pct >= 90 ? { label: 'Sempurna! 🏆', color: 'text-emerald-400' }
                : pct >= 70 ? { label: 'Bagus! 🎉', color: 'text-[#C9A84C]' }
                : pct >= 50 ? { label: 'Cukup Baik 👍', color: 'text-blue-400' }
                : { label: 'Pelajari Lagi 📚', color: 'text-red-400' }
              return (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className={`text-center p-8 rounded-2xl border ${
                    darkMode ? 'bg-[#2A1515] border-[#C9A84C]/20' : 'bg-white border-[#C9A84C]/20'
                  }`}>
                  <div className="text-5xl mb-3">🎉</div>
                  <p className={`text-3xl font-black my-2 ${grade.color}`}>{qScore} / {quizData.length}</p>
                  <p className={`text-base font-semibold mb-4 ${grade.color}`}>{grade.label}</p>
                  <div className="space-y-1.5 text-left mb-6 max-h-40 overflow-y-auto">
                    {qAnswers.map((a, i) => (
                      <div key={i} className={`flex items-start gap-2 text-xs p-2 rounded-lg ${
                        a.selected === a.correct ? 'bg-emerald-500/10' : 'bg-red-500/10'
                      }`}>
                        <span>{a.selected === a.correct ? '✅' : '❌'}</span>
                        <span className={darkMode ? 'text-[#F5ECD7]/70' : 'text-[#3D2B1F]/70'}>{quizData[i]?.question}</span>
                      </div>
                    ))}
                  </div>
                  <motion.button whileHover={{ scale: 1.05 }} onClick={resetQuiz}
                    className="px-7 py-3 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-white font-bold text-sm">
                    Ulangi Kuis
                  </motion.button>
                </motion.div>
              )
            })()}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.9)' }}
            onClick={() => setActiveImg(null)}
          >
            <button className="absolute top-4 right-4 text-white p-2 hover:text-[#C9A84C]" onClick={() => setActiveImg(null)}>
              <FiX size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={activeImg}
              alt="Full size"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}

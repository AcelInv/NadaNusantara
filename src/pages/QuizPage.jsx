import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowLeft, FiHome } from 'react-icons/fi'
import PageWrapper from '../components/common/PageWrapper'
import instruments from '../data/instruments.json'
import { generateQuizForInstrument, generateQuizForAll } from '../utils/quizGenerator'
import { useApp } from '../context/AppContext'

function getGrade(score, total) {
  const pct = (score / total) * 100
  if (pct >= 90) return { label: 'Sempurna! 🏆', color: 'text-emerald-400' }
  if (pct >= 70) return { label: 'Bagus! 🎉', color: 'text-[#C9A84C]' }
  if (pct >= 50) return { label: 'Cukup Baik 👍', color: 'text-blue-400' }
  return { label: 'Perlu Belajar Lagi 📚', color: 'text-red-400' }
}

export default function QuizPage() {
  const { slug } = useParams()
  const { darkMode } = useApp()

  const isAll = !slug || slug === 'semua'

  // Resolve instrument (null if "all")
  const instrument = useMemo(
    () => (isAll ? null : instruments.find((i) => i.slug === slug) || null),
    [slug, isAll]
  )

  // Generate questions once (memo so it doesn't re-shuffle on every render)
  const quizData = useMemo(() => {
    if (isAll) return generateQuizForAll(instruments)
    if (!instrument) return []
    return generateQuizForInstrument(instrument, instruments)
  }, [slug]) // eslint-disable-line react-hooks/exhaustive-deps

  const [phase, setPhase] = useState('intro') // intro | quiz | result
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)

  const q = quizData[current]
  const total = quizData.length

  const handleAnswer = (idx) => {
    if (selected !== null) return
    setSelected(idx)
    setShowExplanation(true)
    if (idx === q.answer) setScore((s) => s + 1)
    setAnswers((prev) => [...prev, { question: q.question, selected: idx, correct: q.answer }])
  }

  const handleNext = () => {
    if (current + 1 < total) {
      setCurrent((c) => c + 1)
      setSelected(null)
      setShowExplanation(false)
    } else {
      setPhase('result')
    }
  }

  const reset = () => {
    setPhase('intro')
    setCurrent(0)
    setSelected(null)
    setAnswers([])
    setScore(0)
    setShowExplanation(false)
  }

  const bg = darkMode ? 'bg-[#1A0A0A]' : 'bg-[#F5ECD7]'
  const card = darkMode ? 'bg-[#2A1515] border-[#C9A84C]/20' : 'bg-white border-[#C9A84C]/20'
  const text = darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'
  const subtext = darkMode ? 'text-[#F5ECD7]/60' : 'text-[#3D2B1F]/60'

  // 404 for unknown slug
  if (!isAll && !instrument) {
    return (
      <PageWrapper>
        <div className={`min-h-screen pt-24 pb-16 px-4 ${bg} flex items-center justify-center`}>
          <div className="text-center">
            <div className="text-6xl mb-4">😕</div>
            <p className={text}>Alat musik tidak ditemukan.</p>
            <Link to="/kuis" className="text-[#C9A84C] underline mt-4 inline-block">
              Kembali ke Pilih Kuis
            </Link>
          </div>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className={`min-h-screen pt-24 pb-16 px-4 ${bg}`}>
        <div className="max-w-2xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link
              to="/kuis"
              className={`inline-flex items-center gap-2 text-sm font-medium ${subtext} hover:text-[#C9A84C] transition-colors`}
            >
              <FiArrowLeft size={15} />
              Pilih Kuis Lain
            </Link>
          </motion.div>

          {/* ── INTRO ───────────────────────────────────────── */}
          {phase === 'intro' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center p-10 rounded-3xl border ${card}`}
            >
              {instrument?.image ? (
                <div className="w-28 h-28 rounded-2xl overflow-hidden mx-auto mb-5 shadow-lg">
                  <img
                    src={instrument.image}
                    alt={instrument.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="text-7xl mb-5">🎵</div>
              )}

              <h1
                className={`text-3xl font-black mb-2 ${text}`}
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {isAll ? 'Kuis Semua Alat Musik' : `Kuis: ${instrument.name}`}
              </h1>

              {instrument && (
                <p className={`text-sm mb-1 ${subtext}`}>
                  {instrument.region} · {instrument.type}
                </p>
              )}

              <p className={`text-sm mb-6 ${subtext}`}>
                {isAll
                  ? 'Uji pengetahuanmu tentang seluruh alat musik tradisional Indonesia'
                  : `Uji pengetahuanmu khusus tentang ${instrument.name}`}
              </p>

              <div className={`flex justify-center gap-8 my-6 text-sm ${subtext}`}>
                <div>📝 <span className="font-semibold">{total} Soal</span></div>
                <div>⏱️ <span className="font-semibold">Tanpa batas waktu</span></div>
                <div>🎯 <span className="font-semibold">Penilaian otomatis</span></div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setPhase('quiz')}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-white font-bold"
              >
                Mulai Kuis!
              </motion.button>
            </motion.div>
          )}

          {/* ── QUIZ ────────────────────────────────────────── */}
          {phase === 'quiz' && q && (
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className={`p-8 rounded-3xl border ${card}`}
              >
                {/* Progress */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs mb-2">
                    <span className={subtext}>Soal {current + 1} dari {total}</span>
                    <span className="text-[#C9A84C] font-semibold">Skor: {score}</span>
                  </div>
                  <div className={`h-2 rounded-full ${darkMode ? 'bg-[#3D2020]' : 'bg-[#E8D5B5]'}`}>
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#A07830]"
                      animate={{ width: `${((current + 1) / total) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question image */}
                {q.image && (
                  <div className="w-full h-44 rounded-2xl overflow-hidden mb-5">
                    <img
                      src={q.image}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  </div>
                )}

                <h2 className={`text-base font-bold mb-5 ${text}`}>{q.question}</h2>

                <div className="space-y-3 mb-5">
                  {q.options.map((opt, idx) => {
                    let optStyle = darkMode
                      ? 'bg-[#1A0A0A] border-[#C9A84C]/20 text-[#F5ECD7] hover:border-[#C9A84C]/50'
                      : 'bg-[#F5ECD7] border-[#C9A84C]/30 text-[#3D2B1F] hover:border-[#C9A84C]'
                    if (selected !== null) {
                      if (idx === q.answer) optStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      else if (idx === selected) optStyle = 'bg-red-500/20 border-red-500 text-red-400'
                      else optStyle = darkMode
                        ? 'bg-[#1A0A0A] border-[#C9A84C]/10 text-[#F5ECD7]/40'
                        : 'bg-[#F5ECD7] border-[#C9A84C]/10 text-[#3D2B1F]/40'
                    }
                    return (
                      <motion.button
                        key={idx}
                        whileHover={selected === null ? { x: 4 } : {}}
                        onClick={() => handleAnswer(idx)}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${optStyle}`}
                      >
                        <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                      </motion.button>
                    )
                  })}
                </div>

                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className={`p-3 rounded-xl text-sm mb-4 ${
                      selected === q.answer
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}
                  >
                    💡 {q.explanation}
                  </motion.div>
                )}

                {selected !== null && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={handleNext}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-white font-semibold"
                  >
                    {current + 1 < total ? 'Soal Berikutnya →' : 'Lihat Hasil'}
                  </motion.button>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* ── RESULT ──────────────────────────────────────── */}
          {phase === 'result' && (() => {
            const grade = getGrade(score, total)
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`text-center p-10 rounded-3xl border ${card}`}
              >
                <div className="text-7xl mb-4">🎉</div>
                <h2 className={`text-2xl font-black mb-1 ${text}`}>Kuis Selesai!</h2>
                <p className={`text-4xl font-black my-4 ${grade.color}`}>{score} / {total}</p>
                <p className={`text-lg font-semibold mb-6 ${grade.color}`}>{grade.label}</p>

                {/* Answer recap */}
                <div className="space-y-2 text-left mb-8 max-h-60 overflow-y-auto">
                  {answers.map((a, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-2 text-xs p-2 rounded-lg ${
                        a.selected === a.correct ? 'bg-emerald-500/10' : 'bg-red-500/10'
                      }`}
                    >
                      <span>{a.selected === a.correct ? '✅' : '❌'}</span>
                      <span className={darkMode ? 'text-[#F5ECD7]/80' : 'text-[#3D2B1F]/80'}>
                        {quizData[i]?.question}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={reset}
                    className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-white font-bold"
                  >
                    Ulangi Kuis
                  </motion.button>
                  <Link to="/kuis">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-[#C9A84C] font-bold ${
                        darkMode ? 'text-[#C9A84C]' : 'text-[#C9A84C]'
                      } hover:bg-[#C9A84C] hover:text-white transition-all`}
                    >
                      <FiHome size={15} />
                      Pilih Kuis Lain
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            )
          })()}
        </div>
      </div>
    </PageWrapper>
  )
}

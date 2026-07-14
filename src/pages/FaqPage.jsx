import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import PageWrapper from '../components/common/PageWrapper'
import { useApp } from '../context/AppContext'

const faqs = [
  { q: 'Apa tujuan website Nusantara Sound?', a: 'Website ini bertujuan untuk mengenalkan dan melestarikan alat musik tradisional Indonesia kepada masyarakat luas, terutama generasi muda, melalui platform multimedia interaktif.' },
  { q: 'Berapa banyak alat musik yang tersedia?', a: 'Saat ini tersedia 15 alat musik tradisional dari berbagai daerah di Indonesia. Koleksi ini akan terus bertambah secara berkala.' },
  { q: 'Apakah saya bisa mendengarkan suara alat musik?', a: 'Ya! Setiap halaman detail alat musik dilengkapi dengan player audio untuk mendengarkan suara asli alat musik tersebut.' },
  { q: 'Apakah website ini bisa diakses di ponsel?', a: 'Tentu! Website ini dirancang responsif dan dapat diakses dengan nyaman di semua perangkat, termasuk smartphone dan tablet.' },
  { q: 'Bagaimana cara menambahkan alat musik baru ke database?', a: 'Buka file src/data/instruments.json dan tambahkan objek baru mengikuti struktur yang sudah ada. Lihat README.md untuk panduan lengkap.' },
  { q: 'Apakah data alat musik akurat?', a: 'Kami berusaha menyajikan informasi yang akurat berdasarkan sumber-sumber terpercaya. Jika menemukan kesalahan, silakan hubungi kami.' },
  { q: 'Bagaimana cara mengaktifkan dark mode?', a: 'Klik ikon matahari/bulan di pojok kanan navbar untuk mengaktifkan atau menonaktifkan dark mode.' },
]

function FaqItem({ item, index }) {
  const { darkMode } = useApp()
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-[#2A1515] border-[#C9A84C]/20' : 'bg-white border-[#C9A84C]/20'}`}
    >
      <button
        onClick={() => setOpen(p => !p)}
        className={`w-full flex items-center justify-between p-5 text-left ${open ? 'text-[#C9A84C]' : darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'}`}
      >
        <span className="font-semibold text-sm pr-4">{item.q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} className="flex-shrink-0 text-[#C9A84C]">
          <FiChevronDown size={18} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className={`px-5 pb-5 text-sm leading-relaxed ${darkMode ? 'text-[#F5ECD7]/60' : 'text-[#3D2B1F]/60'}`}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FaqPage() {
  const { darkMode } = useApp()
  return (
    <PageWrapper>
      <div className={`min-h-screen pt-20 pb-16 ${darkMode ? 'bg-[#1A0A0A]' : 'bg-[#F5ECD7]'}`}>
        <div className={`py-16 px-4 text-center batik-pattern mb-12 ${darkMode ? 'bg-[#2A1515]' : 'bg-[#3D2B1F]'}`}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Pertanyaan Umum (FAQ)
          </motion.h1>
          <p className="text-white/60 mt-3">Temukan jawaban atas pertanyaan yang sering diajukan.</p>
        </div>
        <div className="max-w-2xl mx-auto px-4 space-y-3">
          {faqs.map((item, i) => <FaqItem key={i} item={item} index={i} />)}
        </div>
      </div>
    </PageWrapper>
  )
}

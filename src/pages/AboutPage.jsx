import { motion } from 'framer-motion'
import PageWrapper from '../components/common/PageWrapper'
import { useApp } from '../context/AppContext'

const values = [
  { icon: '🎵', title: 'Pelestarian Budaya', desc: 'Mendokumentasikan dan mengenalkan kekayaan alat musik tradisional agar tidak terlupakan.' },
  { icon: '📱', title: 'Teknologi Modern', desc: 'Menggunakan teknologi web terkini untuk pengalaman belajar yang menarik dan interaktif.' },
  { icon: '🌐', title: 'Akses Terbuka', desc: 'Gratis dan dapat diakses siapa saja, kapan saja, untuk memperluas pengetahuan budaya.' },
]

export default function AboutPage() {
  const { darkMode } = useApp()
  const text = darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'
  const muted = darkMode ? 'text-[#F5ECD7]/60' : 'text-[#3D2B1F]/60'
  const card = darkMode ? 'bg-[#2A1515] border-[#C9A84C]/20' : 'bg-white border-[#C9A84C]/20'

  return (
    <PageWrapper>
      <div className={`min-h-screen pt-20 ${darkMode ? 'bg-[#1A0A0A]' : 'bg-[#F5ECD7]'}`}>
        {/* Hero */}
        <div className={`relative py-20 px-4 overflow-hidden ${darkMode ? 'bg-[#2A1515]' : 'bg-[#3D2B1F]'}`}>
          <div className="absolute inset-0 batik-pattern" />
          <div className="relative max-w-3xl mx-auto text-center">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3">Tentang Kami</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Mengenal Nusantara Sound
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/70 text-lg leading-relaxed">
              Platform multimedia interaktif yang hadir untuk mengenalkan, mendokumentasikan, dan melestarikan kekayaan alat musik tradisional Indonesia kepada dunia.
            </motion.p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-16 space-y-10">
          {/* Mission */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`p-8 rounded-2xl border ${card}`}>
            <h2 className={`text-2xl font-black mb-4 ${text}`}>🎯 Misi Kami</h2>
            <p className={`text-sm leading-relaxed ${muted}`}>
              Indonesia memiliki lebih dari 300 jenis alat musik tradisional yang tersebar di ribuan pulau. Sayangnya, banyak di antaranya mulai terlupakan di tengah arus modernisasi. Nusantara Sound hadir sebagai jembatan antara warisan budaya masa lalu dengan generasi digital masa kini.
            </p>
            <p className={`text-sm leading-relaxed mt-3 ${muted}`}>
              Melalui konten multimedia yang kaya—audio, video, galeri foto, dan informasi mendalam—kami berharap dapat menumbuhkan kecintaan dan rasa bangga terhadap kekayaan budaya bangsa Indonesia.
            </p>
          </motion.div>

          {/* Values */}
          <div>
            <h2 className={`text-2xl font-black mb-6 text-center ${text}`}>💎 Nilai Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {values.map((v, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`p-6 rounded-2xl border text-center ${card}`}>
                  <div className="text-4xl mb-3">{v.icon}</div>
                  <h3 className={`font-bold text-base mb-2 ${text}`}>{v.title}</h3>
                  <p className={`text-sm ${muted}`}>{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className={`p-8 rounded-2xl border ${card}`}>
            <h2 className={`text-2xl font-black mb-6 ${text}`}>📊 Tentang Konten</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[{ n: '15+', l: 'Alat Musik' }, { n: '12', l: 'Provinsi' }, { n: '10', l: 'Soal Kuis' }, { n: '9', l: 'Halaman' }].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-black text-[#C9A84C]">{s.n}</div>
                  <div className={`text-sm mt-1 ${muted}`}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}

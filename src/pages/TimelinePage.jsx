import { motion } from 'framer-motion'
import PageWrapper from '../components/common/PageWrapper'
import { useApp } from '../context/AppContext'

const timelineEvents = [
  { year: '~400 M', title: 'Era Kerajaan Hindu-Buddha', desc: 'Alat musik perkusi dan petik sudah dikenal di kerajaan-kerajaan Nusantara. Relief candi menggambarkan berbagai instrumen musik.', icon: '🏛️' },
  { year: '~800 M', title: 'Gamelan Pertama', desc: 'Gamelan Jawa mulai dikenal dan disebutkan dalam prasasti kerajaan. Angklung juga sudah digunakan suku Sunda untuk ritual pertanian.', icon: '🎵' },
  { year: '~1000 M', title: 'Pengaruh Islam & Perdagangan', desc: 'Jalur perdagangan membawa pengaruh Arab dan Persia. Rebab masuk ke Nusantara dan diserap ke dalam gamelan Jawa dan Sunda.', icon: '⚓' },
  { year: '1365 M', title: 'Era Majapahit', desc: 'Nagarakretagama menyebutkan berbagai pertunjukan musik dan tari di istana Majapahit sebagai bagian dari kebudayaan tinggi.', icon: '👑' },
  { year: '~1600 M', title: 'Gamelan Kraton', desc: 'Gamelan berkembang menjadi seni istana yang sangat kompleks di Keraton Surakarta dan Yogyakarta dengan sistem nada pelog dan slendro.', icon: '🎭' },
  { year: '1800 M', title: 'Dokumentasi Belanda', desc: 'Pemerintah kolonial Belanda mulai mendokumentasikan alat musik tradisional Indonesia. Beberapa koleksi masuk ke museum Eropa.', icon: '📜' },
  { year: '1945 M', title: 'Pasca Kemerdekaan', desc: 'Alat musik tradisional dijadikan identitas budaya bangsa. Pemerintah mendukung pelestarian melalui sekolah seni dan lembaga budaya.', icon: '🇮🇩' },
  { year: '2010 M', title: 'Pengakuan UNESCO', desc: 'Angklung diakui UNESCO sebagai Warisan Budaya Tak Benda. Gamelan juga diakui pada tahun 2021, memperkuat posisi musik Indonesia di dunia.', icon: '🏆' },
  { year: '2025 M', title: 'Era Digital', desc: 'Alat musik tradisional mulai berpadu dengan teknologi digital. Konten edukasi online, platform streaming, dan website interaktif membantu pelestariannya.', icon: '💻' },
]

export default function TimelinePage() {
  const { darkMode } = useApp()
  return (
    <PageWrapper>
      <div className={`min-h-screen pt-20 pb-16 ${darkMode ? 'bg-[#1A0A0A]' : 'bg-[#F5ECD7]'}`}>
        <div className={`py-16 px-4 text-center batik-pattern mb-12 ${darkMode ? 'bg-[#2A1515]' : 'bg-[#3D2B1F]'}`}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Timeline Sejarah
          </motion.h1>
          <p className="text-white/60 mt-3">Perjalanan panjang alat musik tradisional Indonesia dari masa ke masa.</p>
        </div>

        <div className="max-w-3xl mx-auto px-4">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#C9A84C] via-[#C9A84C]/50 to-transparent" />
            <div className="space-y-8">
              {timelineEvents.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#7B1E1E] flex items-center justify-center text-2xl shadow-lg shadow-[#C9A84C]/20 z-10 relative">
                      {event.icon}
                    </div>
                  </div>
                  <div className={`flex-1 p-5 rounded-2xl border mb-2 ${darkMode ? 'bg-[#2A1515] border-[#C9A84C]/20' : 'bg-white border-[#C9A84C]/20'}`}>
                    <div className="text-[#C9A84C] text-xs font-bold tracking-widest mb-1">{event.year}</div>
                    <h3 className={`font-bold text-base mb-2 ${darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'}`}>{event.title}</h3>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-[#F5ECD7]/60' : 'text-[#3D2B1F]/60'}`}>{event.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

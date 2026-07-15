import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch } from 'react-icons/fi'
import PageWrapper from '../components/common/PageWrapper'
import { useApp } from '../context/AppContext'
import instruments from '../data/instruments.json'

// Per-instrument timeline milestones (derived from history + extra context)
const instrumentTimelines = {
  gamelan: [
    { year: '~800 M', title: 'Asal Usul', desc: 'Gamelan pertama kali disebutkan dalam prasasti kerajaan Hindu-Buddha di Jawa. Kata "gamel" berasal dari bahasa Jawa yang berarti memukul.', icon: '🏛️' },
    { year: '1365 M', title: 'Era Majapahit', desc: 'Nagarakretagama mencatat gamelan sebagai bagian penting pertunjukan istana Majapahit.', icon: '👑' },
    { year: '~1600 M', title: 'Seni Kraton', desc: 'Gamelan berkembang menjadi seni istana kompleks di Keraton Surakarta dan Yogyakarta dengan laras pelog dan slendro.', icon: '🎭' },
    { year: '1800 M', title: 'Dokumentasi Barat', desc: 'Pemerintah Belanda mendokumentasikan gamelan secara sistematis. Beberapa set gamelan dikirim ke Eropa.', icon: '📜' },
    { year: '1893 M', title: 'Paris World Fair', desc: 'Gamelan Jawa dipamerkan di Exposition Universelle Paris dan menginspirasi komposer Barat seperti Claude Debussy.', icon: '🌍' },
    { year: '1945 M', title: 'Identitas Nasional', desc: 'Pasca kemerdekaan, gamelan ditetapkan sebagai warisan budaya nasional dan diajarkan di sekolah seni seluruh Indonesia.', icon: '🇮🇩' },
    { year: '2021 M', title: 'Warisan UNESCO', desc: 'UNESCO mengakui gamelan sebagai Warisan Budaya Tak Benda kemanusiaan, memperkuat posisi musik Indonesia di dunia.', icon: '🏆' },
  ],
  angklung: [
    { year: '~700 M', title: 'Ritual Dewi Sri', desc: 'Angklung digunakan suku Sunda dalam upacara pemujaan Dewi Sri (dewi padi) untuk memohon kesuburan.', icon: '🌾' },
    { year: '~1000 M', title: 'Berkembang di Sunda', desc: 'Angklung menyebar luas di tanah Sunda sebagai instrumen rakyat yang mengiringi berbagai upacara adat.', icon: '🎵' },
    { year: '1938 M', title: 'Daeng Soetigna', desc: 'Daeng Soetigna mengembangkan angklung diatonis sehingga dapat memainkan lagu-lagu Barat, memperluas jangkauan musiknya.', icon: '🎓' },
    { year: '1966 M', title: 'Saung Angklung Udjo', desc: 'Udjo Ngalagena mendirikan Saung Angklung Udjo di Bandung yang menjadi pusat pelestarian dan pertunjukan angklung dunia.', icon: '🏠' },
    { year: '2010 M', title: 'Warisan UNESCO', desc: 'UNESCO mengakui angklung sebagai Warisan Budaya Tak Benda, menjadikannya instrumen Indonesia pertama yang mendapat pengakuan ini.', icon: '🏆' },
    { year: '2011 M', title: 'Rekor Dunia', desc: 'Lebih dari 5.000 orang memainkan angklung bersama di Bandung, mencatat rekor dunia Guinness.', icon: '🌟' },
  ],
  sasando: [
    { year: '~700 M', title: 'Legenda Sangguana', desc: 'Sasando konon diciptakan oleh pemuda Rote bernama Sangguana yang bermimpi memainkan alat musik mirip harpa di surga.', icon: '✨' },
    { year: '~1000 M', title: 'Berkembang di Rote', desc: 'Sasando berkembang sebagai instrumen utama masyarakat Pulau Rote untuk mengiringi nyanyian dan upacara adat.', icon: '🏝️' },
    { year: '1960-an', title: 'Pengenalan Nasional', desc: 'Sasando mulai diperkenalkan ke panggung nasional dan gambarnya dicetak di uang kertas Rp5.000.', icon: '💵' },
    { year: '2010 M', title: 'Modernisasi', desc: 'Sasando elektrik dikembangkan, memadukan suara tradisional dengan teknologi modern untuk panggung internasional.', icon: '⚡' },
    { year: '2018 M', title: 'Asian Games Jakarta', desc: 'Sasando tampil dalam upacara pembukaan Asian Games 2018 di Jakarta, memperkenalkannya kepada jutaan penonton Asia.', icon: '🏅' },
  ],
  sape: [
    { year: '~1000 M', title: 'Ritual Dayak', desc: 'Sape digunakan suku Dayak Kenyah dalam ritual pengobatan dan komunikasi dengan roh leluhur di Kalimantan.', icon: '🌿' },
    { year: '~1400 M', title: 'Tari & Hiburan', desc: 'Sape berkembang dari alat ritual menjadi pengiring tari tradisional Dayak dalam pesta panen dan perayaan.', icon: '💃' },
    { year: '1960-an', title: 'Dokumentasi Pertama', desc: 'Etnomusikollog mulai mendokumentasikan Sape secara akademis, memperkenalkannya ke dunia luar Kalimantan.', icon: '📚' },
    { year: '2000-an', title: 'Panggung Internasional', desc: 'Sape mulai tampil di festival musik internasional. Uyau Moris membawa Sape ke panggung dunia.', icon: '🌍' },
    { year: '2015 M', title: 'Identitas Kalimantan', desc: 'Sape ditetapkan sebagai identitas musik Kalimantan dan mulai diajarkan secara formal di sekolah-sekolah seni.', icon: '🎓' },
  ],
  kolintang: [
    { year: '~1000 M', title: 'Asal Minahasa', desc: 'Kolintang berasal dari suku Minahasa, Sulawesi Utara. Namanya dari bunyi alat ini: "tong ting tang".', icon: '🥁' },
    { year: '~1400 M', title: 'Ritual & Perang', desc: 'Kolintang digunakan dalam upacara adat dan sebagai alat komunikasi antar kampung di wilayah Minahasa.', icon: '⚔️' },
    { year: '1954 M', title: 'Modernisasi', desc: 'Nelwan Katuuk mengembangkan kolintang diatonis modern sehingga dapat memainkan berbagai genre musik.', icon: '🎵' },
    { year: '1970-an', title: 'Orkes Kolintang', desc: 'Orkes kolintang berkembang pesat, memadukan instrumen tradisional dengan iringan modern di gereja-gereja Minahasa.', icon: '⛪' },
    { year: '2022 M', title: 'Nominasi UNESCO', desc: 'Kolintang dinominasikan ke UNESCO sebagai Warisan Budaya Tak Benda, mengikuti jejak Gamelan dan Angklung.', icon: '🏆' },
  ],
  tifa: [
    { year: '~500 M', title: 'Asal Papua & Maluku', desc: 'Tifa digunakan suku-suku asli Papua dan Maluku sejak ratusan tahun sebagai alat komunikasi dan ritual.', icon: '🥁' },
    { year: '~1000 M', title: 'Ritual Perang', desc: 'Tifa menjadi instrumen utama dalam tarian perang, upacara inisiasi, dan penyambutan tamu kehormatan.', icon: '⚔️' },
    { year: '1945 M', title: 'Simbol Papua', desc: 'Pasca kemerdekaan, tifa menjadi simbol identitas budaya Papua dan Maluku yang diakui secara nasional.', icon: '🇮🇩' },
    { year: '2000-an', title: 'Festival Budaya', desc: 'Tifa tampil di berbagai festival budaya nasional dan internasional sebagai representasi kekayaan budaya Papua.', icon: '🎪' },
  ],
  rebab: [
    { year: '~900 M', title: 'Masuk dari Arab-Persia', desc: 'Rebab masuk ke Nusantara melalui jalur perdagangan Arab dan Persia, diserap ke dalam budaya Jawa dan Sunda.', icon: '⚓' },
    { year: '~1000 M', title: 'Integrasi Gamelan', desc: 'Rebab menjadi instrumen melodi utama dalam ansambel gamelan Jawa, menggantikan instrumen melodi sebelumnya.', icon: '🎵' },
    { year: '1365 M', title: 'Seni Istana', desc: 'Rebab disebutkan dalam teks Nagarakretagama sebagai instrumen penting dalam pertunjukan istana Majapahit.', icon: '👑' },
    { year: '~1600 M', title: 'Laras Slendro & Pelog', desc: 'Rebab dikembangkan untuk dapat memainkan kedua laras gamelan: slendro dan pelog, memperkaya warna musiknya.', icon: '🎼' },
    { year: '1800 M', title: 'Dokumentasi Belanda', desc: 'Von Hornbostel mendokumentasikan teknik bermain rebab Jawa secara ilmiah, memperkaya kajian etnomusikolgi.', icon: '📜' },
  ],
  kecapi: [
    { year: '~700 M', title: 'Kerajaan Sunda', desc: 'Kecapi sudah ada sejak masa Kerajaan Sunda. Bentuknya menyerupai perahu yang melambangkan perjalanan hidup manusia.', icon: '⛵' },
    { year: '~1200 M', title: 'Pantun Sunda', desc: 'Kecapi menjadi pengiring utama dalam tradisi pantun Sunda, seni bercerita epik yang menceritakan kisah pahlawan.', icon: '📖' },
    { year: '~1600 M', title: 'Tembang Sunda', desc: 'Kecapi berkembang sebagai instrumen utama tembang Sunda (Cianjuran), genre vokal klasik Sunda yang halus.', icon: '🎼' },
    { year: '1900-an', title: 'Kecapi Suling', desc: 'Genre kecapi suling berkembang pesat sebagai musik instrumental Sunda yang digemari masyarakat luas.', icon: '🎵' },
    { year: '1970-an', title: 'Radio & Rekaman', desc: 'Kecapi Suling masuk ke radio nasional dan direkam dalam piringan hitam, memperluas jangkauan pendengarnya.', icon: '📻' },
  ],
  suling: [
    { year: '~400 M', title: 'Alat Musik Tertua', desc: 'Suling bambu adalah salah satu alat musik tertua di Nusantara, ditemukan di berbagai kebudayaan dari Sabang sampai Papua.', icon: '🌿' },
    { year: '~800 M', title: 'Variasi Nusantara', desc: 'Suling berkembang dalam berbagai bentuk: suling Sunda (4 lubang), suling Jawa (6 lubang), dan suling Bali untuk upacara.', icon: '🎵' },
    { year: '~1000 M', title: 'Dalam Gamelan', desc: 'Suling menjadi bagian integral dari ansambel gamelan, memberikan warna melodi yang lembut dan mengalir.', icon: '🎼' },
    { year: '1900-an', title: 'Suling Modern', desc: 'Suling diatonis modern dikembangkan untuk dapat berinteraksi dengan instrumen Barat dalam pertunjukan kontemporer.', icon: '🎓' },
    { year: '2000-an', title: 'Musik Kontemporer', desc: 'Suling dipadukan dalam berbagai genre: jazz, pop, dan world music, membuktikan adaptabilitas instrumen ini.', icon: '🌍' },
  ],
  kendang: [
    { year: '~400 M', title: 'Relief Candi', desc: 'Kendang digambarkan dalam relief candi Hindu-Buddha di Jawa sejak abad ke-4, membuktikan usianya yang sangat tua.', icon: '🏛️' },
    { year: '~900 M', title: 'Prasasti Kerajaan', desc: 'Kendang disebutkan dalam prasasti kerajaan sebagai instrumen penting dalam upacara kerajaan dan ritual keagamaan.', icon: '📜' },
    { year: '~1000 M', title: 'Pemimpin Gamelan', desc: 'Kendang ditetapkan sebagai "pemimpin" ansambel gamelan, bertugas mengatur tempo, dinamika, dan perpindahan gending.', icon: '🎵' },
    { year: '~1600 M', title: 'Kendang Bali vs Jawa', desc: 'Dua tradisi kendang berkembang berbeda: kendang Bali yang lebih agresif dan kendang Jawa yang lebih lembut dan terukur.', icon: '⚡' },
    { year: '2000-an', title: 'Kendang Dangdut', desc: 'Kendang beradaptasi masuk ke musik dangdut dan pop Indonesia, menjadi instrumen perkusi populer di genre modern.', icon: '🎤' },
  ],
  gong: [
    { year: '~2000 SM', title: 'Asia Tenggara Kuno', desc: 'Gong dikenal di Asia Tenggara sejak 2000-3000 tahun lalu, menjadikannya salah satu instrumen paling kuno di kawasan ini.', icon: '⚱️' },
    { year: '~800 M', title: 'Gong Sakral Jawa', desc: 'Di Jawa, gong sakral disebut "Kanjeng Kyai" dan dianggap memiliki kekuatan spiritual yang dijaga turun-temurun.', icon: '✨' },
    { year: '1365 M', title: 'Pusaka Majapahit', desc: 'Gong-gong pusaka Majapahit dipercaya memiliki roh penjaga dan dibunyikan hanya pada upacara-upacara penting.', icon: '👑' },
    { year: '~1700 M', title: 'Kerajinan Gong', desc: 'Industri pembuatan gong berkembang di Klaten, Jawa Tengah dengan teknik menempa perunggu yang diwariskan turun-temurun.', icon: '⚒️' },
    { year: '2021 M', title: 'Bagian dari UNESCO', desc: 'Gong sebagai bagian integral gamelan ikut mendapatkan pengakuan UNESCO sebagai Warisan Budaya Tak Benda.', icon: '🏆' },
  ],
  karinding: [
    { year: '~800 M', title: 'Alatnya Para Petani', desc: 'Karinding awalnya digunakan petani Sunda untuk mengusir hama dengan frekuensi getarannya yang mengganggu serangga.', icon: '🌾' },
    { year: '~1200 M', title: 'Berkembang Jadi Musik', desc: 'Karinding bertransformasi dari alat pertanian menjadi instrumen musik yang dimainkan untuk hiburan dan ritual.', icon: '🎵' },
    { year: '~1600 M', title: 'Ritual Sunda', desc: 'Karinding digunakan dalam ritual-ritual Sunda kuno, dimainkan bersama kecapi dan suling.', icon: '🌿' },
    { year: '1990-an', title: 'Hampir Punah', desc: 'Karinding hampir punah seiring modernisasi, hanya dimainkan oleh sedikit maestro tua di pedalaman Jawa Barat.', icon: '⚠️' },
    { year: '2000-an', title: 'Kebangkitan', desc: 'Komunitas anak muda Bandung menghidupkan kembali karinding, memadukan suaranya dengan musik metal dan elektronik.', icon: '🔥' },
    { year: '2010-an', title: 'Karinding Attack', desc: 'Band Karinding Attack memperkenalkan karinding ke panggung internasional, membuktikan relevansi instrumen purba ini.', icon: '🎸' },
  ],
  'serune-kalee': [
    { year: '~1200 M', title: 'Era Kesultanan Aceh', desc: 'Serune Kalee digunakan sejak masa Kesultanan Aceh sebagai alat pemanggil prajurit dan pengiring prosesi kerajaan.', icon: '⚔️' },
    { year: '~1500 M', title: 'Pengiring Tari Saman', desc: 'Serune Kalee menjadi pengiring utama Tari Saman dan berbagai tari tradisional Aceh yang kaya ekspresi.', icon: '💃' },
    { year: '1873 M', title: 'Perang Aceh', desc: 'Selama Perang Aceh melawan Belanda, serune kalee dimainkan untuk membangkitkan semangat perjuangan.', icon: '🏳️' },
    { year: '1945 M', title: 'Identitas Aceh', desc: 'Pasca kemerdekaan, Serune Kalee ditetapkan sebagai identitas budaya Aceh yang wajib dilestarikan.', icon: '🇮🇩' },
    { year: '2011 M', title: 'Tari Saman UNESCO', desc: 'Tari Saman yang diiringi Serune Kalee diakui UNESCO, secara tidak langsung mengangkat status instrumen ini.', icon: '🏆' },
  ],
  aramba: [
    { year: '~1000 M', title: 'Upacara Nias', desc: 'Aramba digunakan dalam upacara adat suku Nias sejak ratusan tahun, terutama dalam perayaan kemenangan perang dan pesta adat.', icon: '🏺' },
    { year: '~1400 M', title: 'Lompat Batu', desc: 'Aramba mengiringi tradisi lompat batu (fahombo) yang menjadi ritual inisiasi pemuda Nias menuju kedewasaan.', icon: '🪨' },
    { year: '1900-an', title: 'Dokumentasi Belanda', desc: 'Pemerintah Belanda mendokumentasikan aramba sebagai bagian dari kebudayaan Nias yang unik dan perlu dilestarikan.', icon: '📜' },
    { year: '1945 M', title: 'Budaya Sumatera Utara', desc: 'Aramba ditetapkan sebagai bagian dari kekayaan budaya Sumatera Utara yang mewakili masyarakat Nias.', icon: '🇮🇩' },
    { year: '2000-an', title: 'Pariwisata Budaya', desc: 'Aramba menjadi daya tarik wisata budaya Nias, ditampilkan dalam pertunjukan seni untuk wisatawan domestik dan mancanegara.', icon: '🌏' },
  ],
  talempong: [
    { year: '~1300 M', title: 'Minangkabau Kuno', desc: 'Talempong sudah ada dalam peradaban Minangkabau sejak abad ke-13, digunakan dalam berbagai upacara adat Melayu.', icon: '🏔️' },
    { year: '~1500 M', title: 'Pengiring Adat', desc: 'Talempong menjadi instrumen wajib dalam upacara adat Minangkabau: pernikahan, pengangkatan penghulu, dan penyambutan tamu.', icon: '👰' },
    { year: '1900-an', title: 'Talempong Pacik', desc: 'Talempong pacik (dipegang tangan) berkembang sebagai variasi yang lebih fleksibel untuk dimainkan sambil berjalan.', icon: '🎵' },
    { year: '1945 M', title: 'Identitas Sumatera Barat', desc: 'Talempong ditetapkan sebagai identitas musik Sumatera Barat yang membedakan budaya Minangkabau dari daerah lain.', icon: '🇮🇩' },
    { year: '2000-an', title: 'Modernisasi', desc: 'Talempong mulai diaransemen bersama instrumen modern, menciptakan genre Minang kontemporer yang populer.', icon: '🎼' },
    { year: '2023 M', title: 'Nominasi UNESCO', desc: 'Talempong dalam proses nominasi sebagai Warisan Budaya Tak Benda UNESCO bersama kesenian Minangkabau lainnya.', icon: '🏆' },
  ],
}

const typeIcons = { Pukul: '🥁', Petik: '🪕', Tiup: '🎺', Gesek: '🎻', Guncang: '🪘' }
const typeColors = {
  Pukul: 'bg-red-500/20 text-red-400 border-red-500/30',
  Petik: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Tiup: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Gesek: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Guncang: 'bg-green-500/20 text-green-400 border-green-500/30',
}

const types = ['Semua', ...new Set(instruments.map(i => i.type))]

export default function TimelinePage() {
  const { darkMode } = useApp()
  const [selected, setSelected] = useState(instruments[0])
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('Semua')

  const text = darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'
  const muted = darkMode ? 'text-[#F5ECD7]/60' : 'text-[#3D2B1F]/60'
  const card = darkMode ? 'bg-[#2A1515] border-[#C9A84C]/20' : 'bg-white border-[#C9A84C]/20'
  const sidebarBg = darkMode ? 'bg-[#200E0E]' : 'bg-[#EDE0C4]'
  const inputBg = darkMode
    ? 'bg-[#1A0A0A] border-[#C9A84C]/20 text-[#F5ECD7] placeholder-[#8B5E3C]'
    : 'bg-white border-[#C9A84C]/30 text-[#3D2B1F]'

  const filtered = useMemo(() => {
    let list = instruments
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(i => i.name.toLowerCase().includes(q) || i.region.toLowerCase().includes(q))
    }
    if (filterType !== 'Semua') list = list.filter(i => i.type === filterType)
    return list
  }, [search, filterType])

  const milestones = instrumentTimelines[selected.slug] || []

  return (
    <PageWrapper>
      <div className={`min-h-screen pt-20 ${darkMode ? 'bg-[#1A0A0A]' : 'bg-[#F5ECD7]'}`}>

        {/* Hero */}
        <div className={`relative py-14 px-4 text-center overflow-hidden ${darkMode ? 'bg-[#2A1515]' : 'bg-[#3D2B1F]'}`}>
          <div className="absolute inset-0 batik-pattern" />
          <div className="relative">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3">
              Sejarah Per Instrumen
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-white"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Timeline Alat Musik Nusantara
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-white/60 mt-3 max-w-xl mx-auto"
            >
              Pilih alat musik untuk melihat perjalanan sejarahnya dari masa ke masa.
            </motion.p>
          </div>
        </div>

        {/* Main layout */}
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-6">

          {/* === LEFT SIDEBAR === */}
          <div className={`lg:w-72 flex-shrink-0 rounded-2xl border overflow-hidden ${card} lg:self-start lg:sticky lg:top-24`}>
            <div className={`p-4 border-b ${darkMode ? 'border-[#C9A84C]/20' : 'border-[#C9A84C]/20'} ${sidebarBg}`}>
              {/* Search */}
              <div className="relative mb-3">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A84C]" size={14} />
                <input
                  type="text"
                  placeholder="Cari alat musik..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className={`w-full pl-8 pr-3 py-2 rounded-xl border text-sm outline-none transition-colors focus:border-[#C9A84C] ${inputBg}`}
                />
              </div>
              {/* Type filter pills */}
              <div className="flex flex-wrap gap-1.5">
                {types.map(t => (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                      filterType === t
                        ? 'bg-[#C9A84C] text-white border-[#C9A84C]'
                        : darkMode ? 'bg-[#2A1515] border-[#C9A84C]/20 text-[#F5ECD7]/60 hover:border-[#C9A84C]/50' : 'bg-white border-[#C9A84C]/30 text-[#3D2B1F]/60 hover:border-[#C9A84C]'
                    }`}
                  >
                    {t === 'Semua' ? '🎵 Semua' : `${typeIcons[t] || ''} ${t}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Instrument list */}
            <div className="max-h-[60vh] lg:max-h-[calc(100vh-280px)] overflow-y-auto">
              {filtered.length === 0 ? (
                <p className={`p-4 text-sm text-center ${muted}`}>Tidak ditemukan</p>
              ) : (
                filtered.map(inst => (
                  <button
                    key={inst.id}
                    onClick={() => setSelected(inst)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all border-b last:border-b-0 ${
                      darkMode ? 'border-[#C9A84C]/10' : 'border-[#C9A84C]/10'
                    } ${
                      selected.id === inst.id
                        ? darkMode ? 'bg-[#C9A84C]/15' : 'bg-[#C9A84C]/10'
                        : darkMode ? 'hover:bg-[#C9A84C]/8' : 'hover:bg-[#C9A84C]/5'
                    }`}
                  >
                    <img
                      src={inst.image}
                      alt={inst.name}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                      onError={e => { e.target.style.display = 'none' }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-bold truncate ${selected.id === inst.id ? 'text-[#C9A84C]' : text}`}>
                        {inst.name}
                      </div>
                      <div className={`text-xs truncate ${muted}`}>{inst.region}</div>
                    </div>
                    {selected.id === inst.id && (
                      <div className="w-1.5 h-8 rounded-full bg-[#C9A84C] flex-shrink-0" />
                    )}
                  </button>
                ))
              )}
            </div>

            {/* Count */}
            <div className={`px-4 py-2 text-xs border-t ${darkMode ? 'border-[#C9A84C]/10 text-[#F5ECD7]/40' : 'border-[#C9A84C]/10 text-[#3D2B1F]/40'}`}>
              {filtered.length} dari {instruments.length} alat musik
            </div>
          </div>

          {/* === RIGHT: TIMELINE === */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Instrument header */}
                <div className={`p-6 rounded-2xl border mb-8 flex flex-col sm:flex-row gap-5 items-start ${card}`}>
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${typeColors[selected.type] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                        {typeIcons[selected.type]} {selected.type}
                      </span>
                      <span className={`text-xs px-2.5 py-1 rounded-full border ${darkMode ? 'border-[#C9A84C]/20 text-[#C9A84C]' : 'border-[#C9A84C]/30 text-[#7B1E1E]'}`}>
                        📍 {selected.region}
                      </span>
                    </div>
                    <h2 className={`text-2xl font-black mb-2 ${text}`} style={{ fontFamily: 'Playfair Display, serif' }}>
                      {selected.name}
                    </h2>
                    <p className={`text-sm leading-relaxed ${muted}`}>{selected.description}</p>
                    <Link to={`/alat-musik/${selected.slug}`}>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        className="mt-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-white text-xs font-semibold"
                      >
                        Lihat Detail Lengkap →
                      </motion.button>
                    </Link>
                  </div>
                </div>

                {/* Timeline milestones */}
                {milestones.length === 0 ? (
                  <div className={`text-center py-16 ${muted}`}>
                    <div className="text-5xl mb-3">📜</div>
                    <p>Data timeline belum tersedia untuk instrumen ini.</p>
                  </div>
                ) : (
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#C9A84C] via-[#C9A84C]/40 to-transparent" />

                    <div className="space-y-6">
                      {milestones.map((m, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className="flex gap-4 items-start"
                        >
                          {/* Step dot */}
                          <div className="relative flex-shrink-0 flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#A07830] flex items-center justify-center text-xs font-black text-white shadow-md shadow-[#C9A84C]/20 z-10 relative">
                              {i + 1}
                            </div>
                          </div>

                          {/* Milestone card */}
                          <motion.div
                            whileHover={{ x: 4 }}
                            className={`flex-1 p-5 rounded-2xl border mb-2 transition-colors ${card}`}
                          >
                            <div className="text-[#C9A84C] text-xs font-bold tracking-widest mb-1">{m.year}</div>
                            <h3 className={`font-black text-base mb-2 ${text}`}>{m.title}</h3>
                            <p className={`text-sm leading-relaxed ${muted}`}>{m.desc}</p>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>

                    {/* End marker */}
                    <div className="flex gap-4 items-center mt-6">
                      <div className="w-8 flex justify-center flex-shrink-0">
                        <div className="w-3 h-3 rounded-full bg-[#C9A84C]/50 border-2 border-[#C9A84C]" />
                      </div>
                      <p className={`text-sm italic pt-0.5 ${muted}`}>
                        Perjalanan {selected.name} terus berlanjut hingga hari ini...
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

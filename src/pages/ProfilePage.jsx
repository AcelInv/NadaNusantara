import { motion } from 'framer-motion'
import PageWrapper from '../components/common/PageWrapper'
import { useApp } from '../context/AppContext'
import { FiGithub, FiInstagram, FiLinkedin, FiCode, FiLayers, FiZap } from 'react-icons/fi'

const skills = ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'Node.js', 'HTML5 Audio API', 'UI/UX Design']
const techStack = [
  { icon: <FiCode />, name: 'React.js + Vite', desc: 'Frontend framework' },
  { icon: <FiLayers />, name: 'Tailwind CSS', desc: 'Styling system' },
  { icon: <FiZap />, name: 'Framer Motion', desc: 'Animations' },
]

export default function ProfilePage() {
  const { darkMode } = useApp()
  const card = darkMode ? 'bg-[#2A1515] border-[#C9A84C]/20' : 'bg-white border-[#C9A84C]/20'

  return (
    <PageWrapper>
      <div className={`min-h-screen pt-20 pb-16 ${darkMode ? 'bg-[#1A0A0A]' : 'bg-[#F5ECD7]'}`}>
        <div className={`py-16 px-4 text-center batik-pattern mb-12 ${darkMode ? 'bg-[#2A1515]' : 'bg-[#3D2B1F]'}`}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Profil Developer
          </motion.h1>
        </div>

        <div className="max-w-3xl mx-auto px-4 space-y-6">
          {/* Profile Card */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className={`p-8 rounded-3xl border text-center ${card}`}>
            <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-[#C9A84C] to-[#7B1E1E] flex items-center justify-center text-5xl mb-5 shadow-xl">
              👨‍💻
            </div>
            <h2 className={`text-2xl font-black mb-1 ${darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'}`}>Nusantara Sound Team</h2>
            <p className="text-[#C9A84C] text-sm font-medium mb-3">Senior Full Stack Developer & UI/UX Designer</p>
            <p className={`text-sm leading-relaxed max-w-md mx-auto mb-6 ${darkMode ? 'text-[#F5ECD7]/60' : 'text-[#3D2B1F]/60'}`}>
              Passionate tentang pelestarian budaya Indonesia melalui teknologi. Website ini dibuat sebagai kontribusi nyata dalam mendokumentasikan dan mengenalkan kekayaan alat musik tradisional Nusantara.
            </p>
            <div className="flex justify-center gap-3">
              {[FiGithub, FiInstagram, FiLinkedin].map((Icon, i) => (
                <motion.a key={i} href="#" whileHover={{ scale: 1.15, y: -2 }}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${darkMode ? 'border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C]/20' : 'border-[#C9A84C]/40 text-[#7B1E1E] hover:bg-[#C9A84C]/10'}`}>
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`p-6 rounded-2xl border ${card}`}>
            <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'}`}>🛠️ Keahlian</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold ${darkMode ? 'bg-[#C9A84C]/20 text-[#C9A84C]' : 'bg-[#7B1E1E]/10 text-[#7B1E1E]'}`}>
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`p-6 rounded-2xl border ${card}`}>
            <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'}`}>⚡ Tech Stack Website Ini</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {techStack.map((tech, i) => (
                <div key={i} className={`p-4 rounded-xl ${darkMode ? 'bg-[#1A0A0A]' : 'bg-[#F5ECD7]'}`}>
                  <div className="text-[#C9A84C] text-xl mb-2">{tech.icon}</div>
                  <div className={`font-semibold text-sm ${darkMode ? 'text-[#F5ECD7]' : 'text-[#3D2B1F]'}`}>{tech.name}</div>
                  <div className={`text-xs mt-1 ${darkMode ? 'text-[#F5ECD7]/50' : 'text-[#3D2B1F]/50'}`}>{tech.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}

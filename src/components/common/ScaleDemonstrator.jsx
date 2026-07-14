import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiPlay, FiVolume2 } from 'react-icons/fi'
import { useApp } from '../../context/AppContext'

function playPukulSound(frequency) {
  if (!frequency) return
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioContext()
    const fund = ctx.createOscillator()
    const overtone1 = ctx.createOscillator()
    const overtone2 = ctx.createOscillator()
    const gainNode = ctx.createGain()

    fund.type = 'sine'
    fund.frequency.value = frequency

    overtone1.type = 'sine'
    overtone1.frequency.value = frequency * 2.71

    overtone2.type = 'sine'
    overtone2.frequency.value = frequency * 4.45

    const overGain1 = ctx.createGain()
    const overGain2 = ctx.createGain()
    overGain1.gain.value = 0.25
    overGain2.gain.value = 0.10

    fund.connect(gainNode)
    overtone1.connect(overGain1).connect(gainNode)
    overtone2.connect(overGain2).connect(gainNode)
    gainNode.connect(ctx.destination)

    const now = ctx.currentTime
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(0.6, now + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.2)

    fund.start(now)
    overtone1.start(now)
    overtone2.start(now)
    fund.stop(now + 1.3)
    overtone1.stop(now + 1.3)
    overtone2.stop(now + 1.3)
  } catch (e) {
    console.error("Failed to play hit bronze chime sound:", e)
  }
}

function playPetikSound(frequency) {
  if (!frequency) return
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioContext()
    const gainNode = ctx.createGain()
    gainNode.connect(ctx.destination)

    const harmonics = [1, 2, 3, 4]
    const gains = [0.5, 0.25, 0.12, 0.05]
    const decays = [1.0, 0.5, 0.25, 0.12]

    const now = ctx.currentTime
    harmonics.forEach((h, index) => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.value = frequency * h

      g.gain.setValueAtTime(0, now)
      g.gain.linearRampToValueAtTime(gains[index], now + 0.005)
      g.gain.exponentialRampToValueAtTime(0.001, now + decays[index])

      osc.connect(g).connect(gainNode)
      osc.start(now)
      osc.stop(now + decays[index] + 0.05)
    })

    gainNode.gain.setValueAtTime(1.0, now)
  } catch (e) {
    console.error("Failed to play plucked string sound:", e)
  }
}

function playTiupSound(frequency) {
  if (!frequency) return
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 5.5
    lfoGain.gain.value = frequency * 0.015

    lfo.connect(lfoGain).connect(osc.frequency)

    osc.type = 'sine'
    osc.frequency.value = frequency
    osc.connect(gainNode).connect(ctx.destination)

    const now = ctx.currentTime
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(0.4, now + 0.12)
    gainNode.gain.setValueAtTime(0.4, now + 0.6)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.9)

    lfo.start(now)
    osc.start(now)
    lfo.stop(now + 0.95)
    osc.stop(now + 0.95)
  } catch (e) {
    console.error("Failed to play blown woodwind sound:", e)
  }
}

function playGesekSound(frequency) {
  if (!frequency) return
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const filter = ctx.createBiquadFilter()
    const gainNode = ctx.createGain()

    // Bowed vibrato
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 6.0
    lfoGain.gain.value = frequency * 0.02

    lfo.connect(lfoGain).connect(osc.frequency)

    osc.type = 'sawtooth'
    osc.frequency.value = frequency

    filter.type = 'lowpass'
    filter.frequency.value = frequency * 2.5

    osc.connect(filter).connect(gainNode).connect(ctx.destination)

    const now = ctx.currentTime
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(0.35, now + 0.18)
    gainNode.gain.setValueAtTime(0.35, now + 0.6)
    gainNode.gain.linearRampToValueAtTime(0.001, now + 0.9)

    lfo.start(now)
    osc.start(now)
    lfo.stop(now + 0.95)
    osc.stop(now + 0.95)
  } catch (e) {
    console.error("Failed to play bowed sound:", e)
  }
}

// 5. Guncang (Shaken bamboo rattle - e.g. Angklung)
function playGuncangSound(frequency) {
  if (!frequency) return
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioContext()
    const now = ctx.currentTime
    const gainNode = ctx.createGain()
    gainNode.connect(ctx.destination)

    // Simulate double hollow bamboo chime strikes in a rattle pattern
    const playBambooStrike = (time, volume) => {
      const frequencies = [frequency, frequency * 2.0] // Octave spacing typical of Angklung resonators
      frequencies.forEach((f, idx) => {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        const filter = ctx.createBiquadFilter()

        filter.type = 'bandpass'
        filter.frequency.value = f
        filter.Q.value = 10.0

        osc.type = 'triangle'
        osc.frequency.value = f

        g.gain.setValueAtTime(0, time)
        g.gain.linearRampToValueAtTime(volume * (idx === 0 ? 0.35 : 0.22), time + 0.005)
        g.gain.exponentialRampToValueAtTime(0.001, time + 0.08)

        osc.connect(filter).connect(g).connect(gainNode)
        osc.start(time)
        osc.stop(time + 0.1)
      })
    }

    // Rattle tremor strikes (three strikes spaced 80ms apart)
    playBambooStrike(now, 1.0)
    playBambooStrike(now + 0.08, 0.75)
    playBambooStrike(now + 0.16, 0.5)

    gainNode.gain.setValueAtTime(1.0, now)
  } catch (e) {
    console.error("Failed to play shaken bamboo sound:", e)
  }
}

// 6. Membran / Drum (Body resonance sweep & slap transient - e.g. Kendang, Tifa)
function playMembranSound(frequency) {
  if (!frequency) return
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioContext()
    const now = ctx.currentTime

    // Skin boom: quick pitch sweep from high to low
    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(frequency * 2.2, now)
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.75, now + 0.09)

    oscGain.gain.setValueAtTime(0, now)
    oscGain.gain.linearRampToValueAtTime(0.8, now + 0.005)
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

    osc.connect(oscGain).connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.35)

    // Slap transient: high frequency filtered noise burst
    const bufferSize = ctx.sampleRate * 0.05
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 950
    filter.Q.value = 3.5

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.28, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

    noise.connect(filter).connect(noiseGain).connect(ctx.destination)
    noise.start(now)
    noise.stop(now + 0.05)
  } catch (e) {
    console.error("Failed to play drum sound:", e)
  }
}

// Router to match sound type
function playSoundForType(frequency, type) {
  const cleanType = (type || "").toLowerCase()
  switch (cleanType) {
    case 'petik':
      playPetikSound(frequency)
      break
    case 'tiup':
      playTiupSound(frequency)
      break
    case 'gesek':
      playGesekSound(frequency)
      break
    case 'guncang':
      playGuncangSound(frequency)
      break
    case 'pukul':
      playPukulSound(frequency)
      break
    default:
      // Check if it is a drum/membranofon
      if (['tifa', 'kendang', 'perkusi', 'ketipung', 'atowo'].some(kw => cleanType.includes(kw))) {
        playMembranSound(frequency)
      } else {
        playPukulSound(frequency)
      }
  }
}

export default function ScaleDemonstrator({ scaleName, notes, instrumentType }) {
  const { darkMode } = useApp()
  const [playingIndex, setPlayingIndex] = useState(null)
  const [isPlayingSequence, setIsPlayingSequence] = useState(false)
  const isMounted = useRef(true)
  const activeAudioRef = useRef(null)
  const activeCtxRef = useRef(null)

  useEffect(() => {
    isMounted.current = true
    return () => {
      // Stop everything when navigating away
      isMounted.current = false
      if (activeAudioRef.current) {
        activeAudioRef.current.pause()
        activeAudioRef.current = null
      }
      if (activeCtxRef.current) {
        activeCtxRef.current.close()
        activeCtxRef.current = null
      }
    }
  }, [])

  // Validation if notes array is missing or empty
  if (!notes || notes.length === 0) {
    return (
      <div className={`p-6 rounded-2xl border border-dashed text-center opacity-60 text-sm ${darkMode ? 'border-[#C9A84C]/25 text-[#F5ECD7]' : 'border-[#C9A84C]/35 text-[#3D2B1F]'
        }`}>
        Data audio belum tersedia
      </div>
    )
  }

  const playNote = async (index, note) => {
    if (isPlayingSequence) return
    setPlayingIndex(index)

    let audioPlayed = false
    if (note.audio) {
      try {
        const audio = new Audio(note.audio)
        activeAudioRef.current = audio
        await audio.play()
        audioPlayed = true
      } catch (err) {
        // Fall back to synth on fail
      }
    }

    if (!audioPlayed && note.frequency) {
      playSoundForType(note.frequency, instrumentType)
    }

    // Maintain active glow highlight for 500ms
    setTimeout(() => {
      if (isMounted.current) setPlayingIndex(null)
    }, 500)
  }

  const playSequence = async () => {
    if (isPlayingSequence) return
    setIsPlayingSequence(true)

    for (let i = 0; i < notes.length; i++) {
      if (!isMounted.current) break  // Stop loop if navigated away

      const note = notes[i]
      setPlayingIndex(i)

      let audioPlayed = false
      if (note.audio) {
        try {
          const audio = new Audio(note.audio)
          activeAudioRef.current = audio
          await audio.play()
          audioPlayed = true
        } catch (e) {
          // ignore, fall back
        }
      }

      if (!isMounted.current) break  // Check again after await

      if (!audioPlayed && note.frequency) {
        playSoundForType(note.frequency, instrumentType)
      }

      // Delay before trigger next note in traditional scale demonstration
      await new Promise(resolve => setTimeout(resolve, 600))
    }

    if (isMounted.current) {
      setPlayingIndex(null)
      setIsPlayingSequence(false)
    }
  }

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 ${darkMode
        ? 'bg-[#2A1515] border-[#C9A84C]/25 text-[#F5ECD7]'
        : 'bg-[#FDFBF7] border-[#C9A84C]/35 text-[#3D2B1F]'
      } shadow-lg shadow-[#7B1E1E]/5`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-1">
            Demonstrasi Tangga Nada Tradisional
          </p>
          <h3 className="text-xl font-bold font-serif text-[#C9A84C] lg:text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
            {scaleName || "Skala Tradisional"}
          </h3>
        </div>

        <motion.button
          whileHover={isPlayingSequence ? {} : { scale: 1.03 }}
          whileTap={isPlayingSequence ? {} : { scale: 0.97 }}
          onClick={playSequence}
          disabled={isPlayingSequence}
          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm shadow-md transition-all ${isPlayingSequence
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#7B1E1E] to-[#9E2A2A] text-white hover:shadow-lg hover:shadow-[#7B1E1E]/20'
            }`}
        >
          <FiPlay className={isPlayingSequence ? 'animate-pulse' : ''} />
          {isPlayingSequence ? 'Memutar...' : 'Mainkan Tangga Nada'}
        </motion.button>
      </div>

      <div className="flex flex-wrap gap-3 py-2">
        {notes.map((note, index) => {
          const isCurrent = playingIndex === index
          return (
            <motion.button
              key={index}
              onClick={() => playNote(index, note)}
              disabled={isPlayingSequence}
              animate={isCurrent ? { scale: 1.12, y: -2 } : { scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={`relative flex flex-col items-center justify-center min-w-[75px] px-4 py-3 rounded-xl border font-semibold text-sm transition-colors duration-200 ${isCurrent
                  ? 'bg-gradient-to-br from-[#C9A84C] to-[#A07830] text-white border-[#C9A84C] shadow-lg shadow-[#C9A84C]/30'
                  : isPlayingSequence
                    ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                    : darkMode
                      ? 'bg-[#1A0A0A]/40 border-[#C9A84C]/25 text-[#F5ECD7]/80 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C] hover:border-[#C9A84C]'
                      : 'bg-white border-[#C9A84C]/35 text-[#3D2B1F] hover:bg-[#F5ECD7] hover:border-[#7B1E1E] hover:text-[#7B1E1E]'
                }`}
            >
              <span className="text-[10px] opacity-60 mb-1">Nada</span>
              <span className="text-base font-bold">{note.label}</span>
              {isCurrent && (
                <motion.span
                  layoutId="activeGlow"
                  className="absolute inset-0 rounded-xl bg-[#C9A84C]/10 animate-pulse pointer-events-none"
                />
              )}
            </motion.button>
          )
        })}
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-xs opacity-60">
        <FiVolume2 size={13} className="text-[#C9A84C]" />
        <span>Klik masing-masing nada untuk memainkannya secara manual</span>
      </div>
    </div>
  )
}

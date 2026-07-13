/**
 * Generate quiz questions dynamically from instrument data.
 * For each instrument we produce 4 question types:
 *  1. Asal daerah
 *  2. Jenis alat musik (tipe)
 *  3. Bahan utama
 *  4. Cara memainkan (identifikasi instrumen dari cara main)
 */

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function pick(arr, exclude, count) {
  return shuffle(arr.filter((x) => x !== exclude)).slice(0, count)
}

export function generateQuizForInstrument(instrument, allInstruments) {
  const others = allInstruments.filter((i) => i.slug !== instrument.slug)
  const questions = []

  // Q1: Asal daerah
  const regionOptions = [
    instrument.region,
    ...pick(
      others.map((i) => i.region),
      instrument.region,
      3
    ),
  ]
  const shuffledRegions = shuffle(regionOptions)
  questions.push({
    id: `${instrument.slug}-q1`,
    question: `Dari daerah mana alat musik ${instrument.name} berasal?`,
    options: shuffledRegions,
    answer: shuffledRegions.indexOf(instrument.region),
    explanation: `${instrument.name} adalah alat musik dari ${instrument.region}.`,
    image: instrument.image,
  })

  // Q2: Jenis alat musik
  const allTypes = [...new Set(allInstruments.map((i) => i.type))]
  const typeOptions = [
    instrument.type,
    ...pick(
      allTypes,
      instrument.type,
      3
    ),
  ]
  const shuffledTypes = shuffle(typeOptions)
  questions.push({
    id: `${instrument.slug}-q2`,
    question: `Termasuk jenis apa alat musik ${instrument.name}?`,
    options: shuffledTypes,
    answer: shuffledTypes.indexOf(instrument.type),
    explanation: `${instrument.name} termasuk kategori alat musik ${instrument.type}.`,
    image: instrument.image,
  })

  // Q3: Bahan utama – tebak instrumen dari bahan
  const materialHint = instrument.materials.split(',')[0].trim()
  const wrongInstruments = pick(
    others.map((i) => i.name),
    instrument.name,
    3
  )
  const nameOptions = shuffle([instrument.name, ...wrongInstruments])
  questions.push({
    id: `${instrument.slug}-q3`,
    question: `Alat musik yang terbuat dari "${materialHint}" dan berasal dari ${instrument.region} adalah...`,
    options: nameOptions,
    answer: nameOptions.indexOf(instrument.name),
    explanation: `${instrument.name} terbuat dari ${instrument.materials}.`,
    image: instrument.image,
  })

  // Q4: Cara memainkan
  const playHint =
    instrument.howToPlay.length > 80
      ? instrument.howToPlay.slice(0, 80) + '...'
      : instrument.howToPlay
  const nameOptions2 = shuffle([
    instrument.name,
    ...pick(
      others.map((i) => i.name),
      instrument.name,
      3
    ),
  ])
  questions.push({
    id: `${instrument.slug}-q4`,
    question: `Alat musik manakah yang cara memainkannya: "${playHint}"?`,
    options: nameOptions2,
    answer: nameOptions2.indexOf(instrument.name),
    explanation: `Cara memainkan ${instrument.name}: ${instrument.howToPlay}`,
    image: instrument.image,
  })

  return questions
}

export function generateQuizForAll(allInstruments) {
  const allQuestions = allInstruments.flatMap((inst) =>
    generateQuizForInstrument(inst, allInstruments)
  )
  return shuffle(allQuestions)
}

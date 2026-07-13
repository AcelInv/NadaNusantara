import { useApp } from '../../context/AppContext'

export function SkeletonCard() {
  const { darkMode } = useApp()
  return (
    <div className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-[#2A1515]' : 'bg-white'}`}>
      <div className={`h-52 skeleton`} />
      <div className="p-4 space-y-3">
        <div className={`h-4 w-3/4 rounded skeleton`} />
        <div className={`h-3 w-1/2 rounded skeleton`} />
        <div className={`h-3 w-full rounded skeleton`} />
        <div className={`h-3 w-2/3 rounded skeleton`} />
      </div>
    </div>
  )
}

export function SkeletonDetail() {
  return (
    <div className="space-y-6">
      <div className="h-72 rounded-2xl skeleton" />
      <div className="h-6 w-1/2 rounded skeleton" />
      <div className="h-4 w-1/4 rounded skeleton" />
      <div className="h-24 rounded skeleton" />
    </div>
  )
}

import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true')
  const [bookmarks, setBookmarks] = useState(() => JSON.parse(localStorage.getItem('bookmarks') || '[]'))
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRegion, setFilterRegion] = useState('all')
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  const toggleDarkMode = () => setDarkMode(p => !p)

  const toggleBookmark = (id) => {
    setBookmarks(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    )
  }

  const isBookmarked = (id) => bookmarks.includes(id)

  return (
    <AppContext.Provider value={{
      darkMode, toggleDarkMode,
      bookmarks, toggleBookmark, isBookmarked,
      searchQuery, setSearchQuery,
      filterRegion, setFilterRegion,
      filterType, setFilterType,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)

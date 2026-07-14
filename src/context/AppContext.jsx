import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true')

  const [filterRegion, setFilterRegion] = useState('all')
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])



  const toggleDarkMode = () => setDarkMode(p => !p)



  return (
    <AppContext.Provider value={{
      darkMode, toggleDarkMode,
      filterRegion, setFilterRegion,
      filterType, setFilterType,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)

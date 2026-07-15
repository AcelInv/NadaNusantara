import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
        <Toaster position="top-right" toastOptions={{ duration: 3000, style: { background: '#2A1515', color: '#F5ECD7', border: '1px solid #C9A84C' } }} />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
)


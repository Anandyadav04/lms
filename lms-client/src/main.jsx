import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import AuthProvider from './context/AuthContext'
import { CoursesProvider } from './context/CoursesContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CoursesProvider>
          <App />
        </CoursesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
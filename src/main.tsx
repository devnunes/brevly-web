import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app.tsx'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error("Root element with id 'root' not found")
}

const isDevelopment = import.meta.env.NODE_ENV === 'development'

createRoot(rootElement).render(
  isDevelopment ? (
    <App />
  ) : (
    <StrictMode>
      <App />
    </StrictMode>
  )
)

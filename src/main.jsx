import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App'
import { StoreProvider } from './context/StoreContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter basename="/pizza-store-20260410">
      <StoreProvider>
        <App />
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>
)

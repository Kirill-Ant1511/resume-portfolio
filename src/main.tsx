import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ToggleLanguageButton } from './components/ToggleLanguageButton.tsx'
import './index.css'
import { LanguageProvider } from './providers/LanguageProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
      <ToggleLanguageButton />
    </LanguageProvider>
  </StrictMode>,
)

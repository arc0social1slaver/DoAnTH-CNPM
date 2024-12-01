// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './apps/App'

import { ThemeProvider } from "@material-tailwind/react";
// import { AuthProvider } from "react-auth-kit"

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
      <App />
  </ThemeProvider>
)

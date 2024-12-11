// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './apps/App'

import { ThemeProvider } from "@material-tailwind/react";
import {Provider} from "react-redux";
import 'sweetalert2/dist/sweetalert2.js'
import { store } from './redux/store';
// import { AuthProvider } from "react-auth-kit"

createRoot(document.getElementById('root')).render(
  // <ThemeProvider>
  //     <App />
  // </ThemeProvider>
  <Provider store={store}>
    <App/>
  </Provider>
)

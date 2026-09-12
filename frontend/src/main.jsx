import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import ShopeContextProvider from "./context/ShopeContext.jsx";

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
   <ShopeContextProvider>
    <App/>
   </ShopeContextProvider>
  </BrowserRouter>,
)
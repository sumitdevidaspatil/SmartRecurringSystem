import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App.jsx'
// import Rduser from './Rduser.jsx'
// import Home from './Home.jsx'
// import Rddata from './Rddata.jsx'
// import RDForm from './History.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)

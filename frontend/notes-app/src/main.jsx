import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Aqui eu defino a rota principal, que é a rota raiz, que é a rota que o usuário vai acessar para ver a aplicação
ReactDOM.createRoot(document.getElementById('root')).render(
  // Aqui eu defino o App que é o componente principal da aplicação
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Template from './Template'
import './index.css'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Template />}>
        <Route index element={<App />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)

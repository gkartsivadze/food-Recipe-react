import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import './index.css'
import Template from './Template'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Template />}>
        <Route index element={<App />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)

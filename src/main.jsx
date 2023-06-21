import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Main from './directions/MainPage.jsx'
import ProductPage from './directions/ProductPage.jsx'
import './index.css'
import Categories from './directions/Categories.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Main />}/>
          <Route path='product-page' element={<ProductPage />} />
          <Route path='categories' element={<Categories />} />
        </Route>
      </Routes>
    </BrowserRouter>,
)

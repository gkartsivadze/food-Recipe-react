import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Main from './directions/MainPage.jsx'
import ProductPage from './directions/ProductPage.jsx'
import './index.css'
import SearchPage from './directions/SearchPage.jsx'
import Favourites from './directions/Favourites.jsx'
import { Provider } from 'react-redux'
import store from './store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Main />} />
          <Route path='product-page' element={<ProductPage />} />
          <Route path='search-page' element={<SearchPage />} />
          <Route path='favourites' element={<Favourites />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)

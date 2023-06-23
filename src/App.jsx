import './App.css'
import { Outlet } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store} >
    <Header />
      <Outlet />
    <Footer />
    </Provider>
  )
}

export default App

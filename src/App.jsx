import React, {useEffect} from 'react'
import './App.css'
import { Outlet } from 'react-router'
import Header from './components/Header'
import { connect } from 'react-redux'

function App({variable, updateVariable}) {
  useEffect(() => {

    let data = localStorage.getItem('loved');
    console.log(data);
    if(data !== "" && data !== null) {
        data = data.split(",");
      updateVariable(data)
    } else {
      localStorage.setItem("loved", "")
    }
  } , [])
  if(typeof(variable) == "object") {
    localStorage.setItem("loved", variable)
  }
  return (
    <>
      <Header />
      <Outlet hele="hi" />
    </>
  )
}

const mapStateToProps = (state) => ({
  variable: state.variable
})

const mapDispatchToProps = (dispatch) => ({
  updateVariable: (newVariable) => dispatch({ type: 'SYNCHRONIZE', payload: newVariable })
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
import { useEffect, useState } from 'react'
import FoodCard from './components/FoodCard'

function App() {
  useEffect(() => {
    
  }, [])
  return (
    <main>
      <section className="food_list_container grid_container">
      <FoodCard />
      <FoodCard />
      <FoodCard />
      </section>
    </main>
  )
}

export default App

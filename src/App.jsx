import { useEffect, useState } from 'react'
import FoodCard from './components/FoodCard'

function App() {
  const [foodDetails, setDetails] = useState({name: "Giorgi"})
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(data => data.json())
        .then(data => {
          console.log(data.meals[0]);
          setDetails(data.meals[0])})
  }, [])
  return (
    <main>
      <FoodCard foodData={foodDetails} />
    </main>
  )
}

export default App

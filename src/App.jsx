import FoodCard from './components/FoodCard'

function App() {
  
  return (
    <main>
      <section id="welcome_section">
        <h1>BON APPETITO</h1>
      </section>
      <section className="food_list_container grid_container">
      <FoodCard />
      <FoodCard />
      <FoodCard />
      <FoodCard />
      <FoodCard />
      </section>
    </main>
  )
}

export default App

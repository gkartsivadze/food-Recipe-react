import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ProductPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const id = queryParams.get("id");
  const [foodData, setFoodData] = useState({})
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(data => data.json())
        .then(data => setFoodData(data.meals[0]));
  }, [])
  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= 20; i++) {
      if (foodData["strIngredient" + i] !== "") {
        arr.push({
          id: i,
          name: foodData["strIngredient" + i],
          amount: foodData["strMeasure" + i],
        });
      }
    }
    setIngredients(arr);
  }, [foodData]);
  // Use the retrieved data as needed

  return (
    <main id="product_page">
          <h1 className='food_name'>{foodData.strMeal}</h1>
      <section className='top_section'>
        <img src={foodData.strMealThumb} alt={foodData.strMeal} />
        <div className='grid_container'>
          <h2>INGREDIENTS</h2>
          <ul>
          {ingredients.map((elem) => {
              return (
                <li key={elem.id}>
                  <p>{elem.name}</p>
                  <p>{elem.amount}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section className='details_section'>

      </section>
      <p className='food_instruction'>{foodData.strInstructions}</p>
    </main>
  );
};
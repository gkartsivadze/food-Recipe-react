import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

function ProductPage({variable, updateVariable}) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
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
  function toggleFavourite() {
    if(variable != 0) {
      variable.includes(foodData.idMeal) ?
        updateVariable(variable.filter(elem => elem != foodData.idMeal))
      :
        updateVariable([...variable, foodData.idMeal])
    } else {
      updateVariable([foodData.idMeal])
    }
  }

  return (
    <main id="product_page">
      <h1 className='hero_text'>{foodData.strMeal}</h1>
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
          <button className='favourite-btn' onClick={toggleFavourite}>
              {
                <FontAwesomeIcon icon={variable != 0 && variable.includes(foodData.idMeal) ? faHeartCircleCheck : faHeart} />
              }
            </button>
        </div>
      </section>
      <section className='details_section'>
            <p>{foodData.strCategory ? `Category : ${foodData.strCategory}` : ''}</p>
            <p>{foodData.strArea ? `Area : ${foodData.strArea}` : ''}</p>
            <p>{foodData.strTags ? `Tags : ${foodData.strTags}` : ''}</p>
      </section>
      <section className='food_instruction'>
        <h1>INSTRUCTION</h1>
        <p>{foodData.strInstructions}</p>
      </section>
    </main>
  );
};

const mapStateToProps = (state) => ({
  variable: state.variable
})

const mapDispatchToProps = (dispatch) => ({
  updateVariable: (newVariable) => dispatch({ type: 'SYNCHRONIZE', payload: newVariable })
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
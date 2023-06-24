import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux"

function PreviewCard({ productId, data_mode, fullData, deleteState, variable, updateVariable }) {
  const [foodData, setFoodData] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const elementRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (productId) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${productId}`)
        .then((data) => data.json())
        .then((data) => setFoodData(data.meals[0]));
    } else if (fullData) {
      setFoodData(fullData);
    } else {
      fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((data) => data.json())
        .then((data) => setFoodData(data.meals[0]));
    }
  }, []);

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

  function redirectToProduct() {
    const queryParams = {
      id: foodData.idMeal,
    };

    const searchParams = new URLSearchParams(queryParams).toString();
    navigate(`/product-page?${searchParams}`);
  }
  function unFavouriteMe() {
    let newVal = localStorage.getItem("loved").split(",").filter(x => x != productId);
    // localStorage.setItem("loved", newVal)
    updateVariable(newVal)
    // containerRef.current.remove();
  }
  return (
    <div ref={containerRef} data-state={data_mode} className="preview_card" data-food-id={foodData.idMeal}>
      <div className="image_container" onClick={redirectToProduct} ><img src={foodData.strMealThumb} alt={foodData.strMeal} /></div>
      <div className="food_info">
        <h3 title={foodData.strMeal}>{foodData.strMeal}</h3>
        <ul ref={elementRef}>
          {ingredients.map((elem) => {
            return (
              <li key={elem.id}>
                <p>{elem.name}</p>
                <p>{elem.amount}</p>
              </li>
            );
          })}
        </ul>
        {
          deleteState && <div className="delete_btn_container">
            <button onClick={unFavouriteMe}><FontAwesomeIcon icon={faTrashCan} /></button>
          </div>
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  variable: state.variable
})

const mapDispatchToProps = (dispatch) => ({
  updateVariable: (newVariable) => dispatch({ type: 'SYNCHRONIZE', payload: newVariable })
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviewCard);
import React, { useEffect, useRef, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

export default function PreviewCard({ productId, data_mode, fullData }) {
  const [foodData, setFoodData] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const elementRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${productId}`)
        .then((data) => data.json())
        .then((data) => setFoodData(data.meals[0]));
    } else if (fullData) {
      setFoodData(fullData);
      console.log(fullData);
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
  useEffect(() => {
    let element = elementRef.current;
    const hasScrollbar = element.scrollHeight > element.clientHeight;
    if (hasScrollbar) {
      // Check for scrollbar
      console.log('Scrollbar exists:', hasScrollbar);
    }
  },[ingredients])

  function redirectToProduct() {
    const queryParams = {
      id: foodData.idMeal,
    };

    const searchParams = new URLSearchParams(queryParams).toString();
    navigate(`/product-page?${searchParams}`);
  }
  return (
    <div data-state={data_mode} className="preview_card">
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
      </div>
    </div>
  );
}

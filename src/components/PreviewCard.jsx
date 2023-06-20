import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

export default function PreviewCard() {
  const [foodData, setFoodData] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [more, setMore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((data) => data.json())
      .then((data) => setFoodData(data.meals[0]));
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

  function handleDelete() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((data) => data.json())
      .then((data) => setFoodData(data.meals[0]));
  }

  function handleLove() {
    // Your implementation for handling love button click
  }

  function redirectToProduct() {
    const queryParams = {
      id: foodData.idMeal,
    };

    const searchParams = new URLSearchParams(queryParams).toString();
    navigate(`/product-page?${searchParams}`);
  }

  return (
    <div className="preview_card">
      <button className="open_full_link" onClick={redirectToProduct}>
        <img src={foodData.strMealThumb} alt={foodData.strMeal} />
      </button>
      <div className="food_info">
        <h3 title={foodData.strMeal}>{foodData.strMeal}</h3>
        <div className={`grid_collapse ${more ? "open" : ""}`}>
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
      </div>
      <div className="food_buttons">
        <button className="delete_btn" onClick={handleDelete}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <button className="full_list" onClick={() => setMore((prev) => !prev)}>
          Receipt
        </button>
        <button className="love_btn" onClick={handleLove}>
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
    </div>
  );
}

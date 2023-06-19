import React from "react";

export default function FoodCard({ foodData }) {
    let ingredientArray = [];
    for (let i = 1; i <= 20; i++) {
        if (foodData["strIngredient" + i] != "") {
            ingredientArray.push(foodData["strIngredient" + i])
        }
    }
    return (
        <div className="food_thumb_card">
            <img src={foodData.strMealThumb} alt="" />
            <div className="info_div">
                <h2>{foodData.strMeal}</h2>
                {/* <p>{foodData.strInstructions}</p> */}
                <h3>Ingredients</h3>
                <ul>
                    {ingredientArray.map(elem => {
                        return <li>{elem}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}
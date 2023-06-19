import React from "react";

export default function FoodCard({foodData}) {
    let ingredientArray = [];
    for(let i = 1; i <= 20; i++) {
        if (foodData["strIngredient" + i] != "") {
            ingredientArray.push(foodData["strIngredient" + i])
        }
    }
    return(
        <div>
            <h1>{foodData.strMeal}</h1>
            <p>{foodData.strInstructions}</p>
                <h3>Ingredients</h3>
            <ul>
                {ingredientArray.map(elem => {
                    return <li>{elem}</li>
                })}
            </ul>
        </div>
    )
}
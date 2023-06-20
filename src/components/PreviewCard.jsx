import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


export default function PreviewCard() {
    const [foodData, setFoodData] = useState({})
    const [ingredients, setIngredients] = useState([]);
    const [favourites, setFavourites] = useState([]);
    
    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then(data => data.json())
            .then(data => setFoodData(data.meals[0]))
    }, [])
    useEffect(() => {
        let arr = []
        for (let i = 1; i <= 20; i++) {
            if (foodData["strIngredient" + i] != "") {
                arr.push({
                    id: i,
                    name: foodData["strIngredient" + i],
                    amount: foodData["strMeasure" + i]
                })
            }
        }
        setIngredients(arr)
    }, [foodData])

    function handleDelete() {
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then(data => data.json())
            .then(data => setFoodData(data.meals[0]))
    }

    function handleLove() {
        setFavourites(prev => [
            ...prev,
            {
                num: favourites.length + 1,
                id: foodData.idMeal
            }
        ])
    }

    useEffect(() => {
        favourites.forEach(elem => {
            localStorage.setItem(elem.num, elem.id);
        })
    }, [favourites])

    return <div className="preview_card">
        <img src={foodData.strMealThumb} />
        <div className="food_info">
            <h1>{foodData.strMeal}</h1>
            <ul>
                {ingredients.map(elem => {
                    return <li key={elem.id}><p>{elem.name}</p><p>{elem.amount}</p></li>
                })}
            </ul>
        </div>
        <div className="food_buttons">
            <button className="delete_btn" onClick={handleDelete}><FontAwesomeIcon icon={faXmark} /></button>
            <button className="love_btn" onClick={handleLove}><FontAwesomeIcon icon={faHeart} /></button>
        </div>
    </div>
}
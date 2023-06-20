import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

export default function FoodCard() {
    const [ingredients, setIngredients] = useState([]);
    const [openState, setOpenState] = useState(false);
    const [foodDetails, setDetails] = useState({ name: "Giorgi" })

    useEffect(() => {
        setIngredients([]);
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then(data => data.json())
            .then(data => {
                let details = data.meals[0];
                console.log(details);
                setDetails(data.meals[0])
                // get ingredients
                for (let i = 1; i <= 20; i++) {
                    // Check ingredients existence
                    if (details["strIngredient" + i] != "") {
                        setIngredients(prev => [
                            ...prev,
                            {
                                id: i,
                                ingredient: details["strIngredient" + i],
                                amount: details["strMeasure" + i]
                            }
                        ])
                    }
                }
            })

    }, [])

    return (
        <div className="food_thumb_card">
            <img src={foodDetails.strMealThumb} alt="" />
            <div className="info_div">
                    <h3>{foodDetails.strMeal}</h3>
                <morquee direction="top" className="showup_grid">
                    <ul className={openState ? "open" : ""}>
                        {ingredients.map(elem => {
                            return <li key={elem.id}><p>{elem.ingredient}</p><p>{elem.amount}</p></li>
                        })}
                    </ul>
                </morquee>
                {ingredients.length > 3 && <button className="btn orange-black-btn" onClick={() => setOpenState(prev => !prev)}>
                    <FontAwesomeIcon icon={openState ? faCaretUp : faCaretDown} />
                </button>}
            </div>
        </div>
    )
}
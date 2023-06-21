import { useEffect, useState } from "react";

export default function SearchPage() {
    const [categories, setCategories] = useState([]);
    const [areas, setAreas] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
            .then(data => data.json())
            .then(data => {
                data.meals.forEach(elem => {
                    setCategories(prev => [
                        ...prev,
                        elem.strCategory
                    ])
                })
            });
        fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
            .then(data => data.json())
            .then(data => {
                data.meals.forEach(elem => {
                    setAreas(prev => [
                        ...prev,
                        elem.strArea
                    ])
                })
            });
        fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
            .then(data => data.json())
            .then(data => {
                data.meals.forEach(elem => {
                    setIngredients(prev => [
                        ...prev,
                        elem.strIngredient
                    ])
                })
            });
    }, [])
    return <main>
        <div className="category_selector">
            <label>Category: </label>
            <select name="category">
                <option>Any</option>
                {
                    categories.map((elem, ind) => {
                        return <option key={ind}>{elem}</option>
                    })
                }
            </select>
            <label>Country: </label>
            <select name="country">
                <option>Any</option>
                {
                    areas.map((elem, ind) => {
                        return <option key={ind}>{elem}</option>
                    })
                }
            </select>
            <label>Ingredient: </label>
            <select name="ingredient">
                <option>Any</option>
                {
                    ingredients.map((elem, ind) => {
                        return <option key={ind}>{elem}</option>
                    })
                }
            </select>
        </div>
        
    </main>
}
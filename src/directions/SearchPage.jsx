import { useEffect, useRef, useState } from "react";
import PreviewCard from "../components/PreviewCard";
import { useLocation } from "react-router-dom";

export default function SearchPage() {
    const [categories, setCategories] = useState([]);
    const [areas, setAreas] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [filter, setFilter] = useState({})
    const [filteredFoods, setFilteredFoods] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const importedCategory = queryParams.get("category");
    const categoryElem = useRef(0);

    useEffect(() => {
        if (importedCategory) {
            setFilter(prev => ({
                ...prev,
                category: importedCategory
            }))
            categoryElem.value = importedCategory;
        }
        fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
            .then(data => data.json())
            .then(data => {
                let sortedData = data.meals.sort((a, b) => a - b);
                sortedData.forEach(elem => {
                    setCategories(prev => [
                        ...prev,
                        elem.strCategory
                    ])
                })
            });
        fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
            .then(data => data.json())
            .then(data => {
                let sortedData = data.meals.sort((a, b) => a - b);
                sortedData.forEach(elem => {
                    setAreas(prev => [
                        ...prev,
                        elem.strArea
                    ])
                })
            });
        fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
            .then(data => data.json())
            .then(data => {
                let sortedData = data.meals.sort((a, b) => a - b);
                sortedData.forEach(elem => {
                    setIngredients(prev => [
                        ...prev,
                        elem.strIngredient
                    ])
                })
            });
        return () => {
            setCategories([]);
            setAreas([]);
            setIngredients([]);
        }
    }, [])
    function synchronizeData(event) {
        setFilter(prev => ({
            ...prev,
            [event.target.name]: event.target.value == "Any" ? "" : event.target.value
        }))
    }
    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter.category}`)
            .then(data => data.json())
            .then(data => {
                setFilteredFoods(data.meals)
            });
    }, [filter])
    
    return <main>
        <div className="category_selector">
            <div className='display-flex'>
                <label>Category: </label>
                <select value={filter.category} ref={categoryElem} onChange={synchronizeData} name="category">
                    <option>Any</option>
                    {
                        categories.map((elem, ind) => {
                            return <option key={ind}>{elem}</option>
                        })
                    }
                </select>
            </div>
            <div className='display-flex'>
                <label>Country: </label>
                <select onChange={synchronizeData} name="country">
                    <option>Any</option>
                    {
                        areas.map((elem, ind) => {
                            return <option key={ind}>{elem}</option>
                        })
                    }
                </select>
            </div>
            <div className='display-flex'>
                <label>Ingredient: </label>
                <select onChange={synchronizeData} name="ingredient">
                    <option>Any</option>
                    {
                        ingredients.map((elem, ind) => {
                            return <option key={ind}>{elem}</option>
                        })
                    }
                </select>
            </div>
        </div>
        <section className="card_list_container">
            {filteredFoods ?
                filteredFoods.map(elem => {
                    return <PreviewCard key={elem.idMeal} productId={elem.idMeal} />
                })
                :
                <h1 className="popup-text">Nothing Found</h1>
            }
        </section>
    </main>
}
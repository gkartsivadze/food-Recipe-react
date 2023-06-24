import { useEffect, useRef, useState } from "react";
import PreviewCard from "../components/PreviewCard";
import { useLocation } from "react-router-dom";

export default function SearchPage() {
    const [categories, setCategories] = useState([]);
    const [areas, setAreas] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [filter, setFilter] = useState({
        category: "",
        country: "",
        ingredient: ""

    })
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
    }, [])
    function synchronizeData(event) {
        setFilter(prev => ({
            ...prev,
            [event.target.name]: event.target.value.startsWith("Choose") ? "" : event.target.value
        }))
    }
    useEffect(() => {
        let foodByCategory;
        let foodByArea;
        let foodByIngredient;
        getData();
        async function getData() {
            let newData = [];
            let count = 0;
            if (filter.category != "") {
                await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter.category}`)
                    .then(data => data.json())
                    .then(data => {
                        foodByCategory = data.meals;
                        count += 1;
                    });
            }
            if (filter.country != "") {
                await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${filter.country}`)
                    .then(data => data.json())
                    .then(data => {
                        foodByArea = data.meals;
                        count += 1;
                    });
            }
            if (filter.ingredient != "") {
                await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${filter.ingredient}`)
                    .then(data => data.json())
                    .then(data => {
                        foodByIngredient = data.meals;
                        count += 1;
                    });
            }
            foodByCategory ? newData.push(...foodByCategory) : "";
            foodByArea ? newData.push(...foodByArea) : "";
            foodByIngredient ? newData.push(...foodByIngredient) : "";
            let filteredData = []
            newData.forEach(elem => {
                if (newData.filter((x) => x.idMeal === elem.idMeal).length == count && !filteredData.includes(elem.idMeal)) {
                    filteredData.push(elem.idMeal);
                }
            });
            setFilteredFoods(filteredData);
        }
    }, [filter])

    return <main>
        <div className="category_selector">
            <div className='display-flex'>
                <label>Category: </label>
                <select value={filter.category} ref={categoryElem} onChange={synchronizeData} name="category">
                    <option>Choose Category</option>
                    {
                        categories.map(elem => {
                            return <option key={elem}>{elem}</option>
                        })
                    }
                </select>
            </div>
            <div className='display-flex'>
                <label>Country: </label>
                <select onChange={synchronizeData} name="country">
                    <option>Choose Area</option>
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
                    <option>Choose Ingredient</option>
                    {
                        ingredients.map((elem, ind) => {
                            return <option key={ind}>{elem}</option>
                        })
                    }
                </select>
            </div>
        </div>
        <section className="card_list_container">
            {filteredFoods.length > 0 && filteredFoods.map(elem => {
                    return <PreviewCard key={elem} productId={elem} />
                })
            }
        </section>
        {
            filteredFoods.length > 0 || <h1 className="popup_text text-center">Nothing Found</h1> 
        }
    </main>
}
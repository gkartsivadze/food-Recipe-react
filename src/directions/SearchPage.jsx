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
        ingredient: "",
        name: ""

    })
    const [searchingState, setSearchingState] = useState(false);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const importedCategory = queryParams.get("category");
    const categoryElem = useRef(0);
    const popupTextRef = useRef(0);

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
            setFilteredFoods([]);
            setCategories([]);
            setAreas([]);
            setIngredients([]);
        }
    }, [])
    function synchronizeData(event) {
        setFilter(prev => ({
            ...prev,
            [event.target.name]: event.target.value.startsWith("Choose") ? "" : event.target.value
        }))
    }
    async function getData() {
        popupTextRef.current.style.opacity = 0;
        let foodByName;
        let foodByCategory;
        let foodByArea;
        let foodByIngredient;
        let newData = [];
        let count = 0;
        if (filter.name.length >= 3) {
            
            await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${filter.name}`)
            .then(data => data.json())
            .then(data => {
                foodByName = data.meals;
                count += 1;
            });
        }
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
            foodByName ? newData.push(...foodByName) : "";
            foodByCategory ? newData.push(...foodByCategory) : "";
            foodByArea ? newData.push(...foodByArea) : "";
            foodByIngredient ? newData.push(...foodByIngredient) : "";
            let filteredData = []
            newData.forEach(elem => {
                if (newData.filter((x) => x.idMeal === elem.idMeal).length == count && !filteredData.includes(elem.idMeal)) {
                    filteredData.push(elem.idMeal);
                }
            });
            if(count > 0) {
                setSearchingState(true);
            } else {
                setSearchingState(true);
            }
        popupTextRef.current.style.opacity = 1;
        setFilteredFoods(filteredData);
    }

    return <main id="search_page">
        <div className="category_selector">
            <label>Search by name : <input type="text"
                placeholder="Peperoni"
                onChange={synchronizeData}
                name="name" />
            </label>
            <select value={filter.category} ref={categoryElem} onChange={synchronizeData} name="category">
                <option>Choose Category</option>
                {
                    categories.map(elem => {
                        return <option key={elem}>{elem}</option>
                    })
                }
            </select>
            <select onChange={synchronizeData} name="country">
                <option>Choose Area</option>
                {
                    areas.map((elem, ind) => {
                        return <option key={ind}>{elem}</option>
                    })
                }
            </select>
            <select onChange={synchronizeData} name="ingredient">
                <option>Choose Ingredient</option>
                {
                    ingredients.map((elem, ind) => {
                        return <option key={ind}>{elem}</option>
                    })
                }
            </select>
            <button onClick={getData}>Search</button>
        </div>
        <section className="card_list_container">
            {filteredFoods.length > 0 && filteredFoods.map(elem => {
                return <PreviewCard key={elem} productId={elem} loveState={true} />
            })
            }
        </section>
        {
            filteredFoods.length > 0 || <h2 ref={popupTextRef} className="popup_text text-center">{searchingState ? "Nothing Found" : "Let's find something"}</h2>
        }
    </main>
}
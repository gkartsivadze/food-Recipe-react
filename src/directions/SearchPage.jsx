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
            setCountries(prev => [
                ...prev,
                elem.strArea
            ])
        })
    });
fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    .then(data => data.json())
    .then(data => {
        data.meals.forEach(elem => {
            setIngredient(prev => [
                ...prev,
                elem.strIngredient
            ])
        })
    });

<div className="category_selector">
    <label>Category: </label>
    <select name="category" onChange={handleFiltering}>
        <option>Any</option>
        {
            categories.map(elem => {
                return <option>{elem}</option>
            })
        }
    </select>
    <label>Country: </label>
    <select name="country" onChange={handleFiltering}>
        <option>Any</option>
        {
            countries.map(elem => {
                return <option>{elem}</option>
            })
        }
    </select>
    <label>Ingredient: </label>
    <select name="ingredient" onChange={handleFiltering}>
        <option>Any</option>
        {
            ingredient.map(elem => {
                return <option>{elem}</option>
            })
        }
    </select>

</div>
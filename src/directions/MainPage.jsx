import React, { useState, useEffect } from "react"
import PreviewCard from "../components/PreviewCard"

export default function Main() {
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([])
    const [ingredient, setIngredient] = useState([])
    const [currentCategory, setCurrentCategory] = useState("");
    const [currentCountry, setCurrentCountry] = useState("");
    const [currentIngredient, setCurrentIngredient] = useState("");

    useEffect(() => {
        return () => {
            setIngredient([])
            setCountries([])
            setCategories([])

        }
    }, [])
    
    function handleFiltering(event) {
        let value = event.target.value == "Any" ? "" : event.target.value;
        switch (event.target.name) {
            case "category":
                setCurrentCategory(value);
                break;
            case "country":
                setCurrentCountry(value);
                break;
            case "ingredient":
                setCurrentIngredient(value);
                break;
        };

    }
    return <main id="home">
        <section className="card_list_container">
            <PreviewCard category={currentCategory} country={currentCountry} ingredient={currentIngredient} />
        </section>
    </main>
}
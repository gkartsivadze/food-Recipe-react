import React from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryCard({categoryName, categoryThumb}) {
    const navigate = useNavigate();
    function handleNavigation() {
        const queryParams = {
            category: categoryName
        }
        const searchParams = new URLSearchParams(queryParams).toString();
        navigate(`/search-page?${searchParams}`)

    }
    return <div onClick={handleNavigation} tabIndex={1} className="category_card">
        <img src={categoryThumb} alt={categoryName} />
        <h2>{categoryName}</h2>
    </div>
}
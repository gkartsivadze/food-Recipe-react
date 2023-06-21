import React from "react";

export default function CategoryCard({categoryName, categoryThumb}) {
    return <div tabIndex={1} className="category_card">
        <img src={categoryThumb} alt="" />
        <h1>{categoryName}</h1>
    </div>
}
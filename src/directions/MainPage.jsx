import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PreviewCard from "../components/PreviewCard";

export default function Main() {
    const [data, setData] = useState({});
    const [elements, setElements] = useState(["active","inactive"])
    function handleDelete() {
        document.querySelector(".preview_card[data-state='active']").setAttribute("data-state", "delete");
        document.querySelector(".preview_card[data-state='inactive']").setAttribute("data-state", "active");
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((data) => data.json())
        .then((data) => setData(data.meals[0]));
        setTimeout(() => {
            document.querySelector(".preview_card[data-state='delete']").remove();
        }, 500)
    }
    function handleLove() {
        // Your implementation for handling love button click
    }
    return <main id="home">
        <h1 className="hero_text">BON APPETITO</h1>
        <section className="card_list_container">
            {
                elements.map((elem,ind) => {
                    return <PreviewCard key={ind} data_mode={elem} />
                })
            }
        </section>
        <section className="food_buttons">
            <button className="delete_btn" onClick={handleDelete}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <button className="love_btn" onClick={handleLove}>
                <FontAwesomeIcon icon={faHeart} />
            </button>
        </section>
    </main>
}
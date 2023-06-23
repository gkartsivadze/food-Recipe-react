import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PreviewCard from "../components/PreviewCard";

export default function Main() {
    const [elements, setElements] = useState(["active","inactive"])
    const [loved, setLoved] = useState([]);
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('loved'));
        if(data !== null) {
            setLoved(data)
        }
    } , [])
    function handleDelete() {
        document.querySelector(".preview_card[data-state='active']").setAttribute("data-state", "delete");
        document.querySelector(".preview_card[data-state='inactive']").setAttribute("data-state", "active");
        setElements(prev => [
            ...prev,
            "inactive"
        ])
        setTimeout(() => {
            document.querySelector(".preview_card[data-state='delete']").remove();
        }, 500)
    }
    function handleLove() {
        document.querySelector(".preview_card[data-state='active']").setAttribute("data-state", "loved");
        document.querySelector(".preview_card[data-state='inactive']").setAttribute("data-state", "active");
        let newItem = document.querySelector(".preview_card[data-state='loved']").getAttribute("data-food-id");
        let newLoved = [
            ...loved, newItem
        ]
        setLoved(newLoved)
        localStorage.setItem('loved', JSON.stringify(newLoved));
        setElements(prev => [
            ...prev,
            "inactive"
        ])
        setTimeout(() => {
            document.querySelector(".preview_card[data-state='loved']").remove();
        }, 500)
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
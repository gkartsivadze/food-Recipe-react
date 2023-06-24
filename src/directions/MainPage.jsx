import React, {  useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PreviewCard from "../components/PreviewCard";
import { connect } from "react-redux";

function Main({ variable, updateVariable }) {
    const [elements, setElements] = useState(["active","inactive"])
    function handleDelete() {
        document.querySelector(".preview_card[data-state='inactive']").setAttribute("data-state", "active");
        document.querySelector(".preview_card[data-state='active']").setAttribute("data-state", "delete");
        setElements(prev => [
            ...prev,
            "inactive"
        ])
        setTimeout(() => {
            document.querySelector(".preview_card[data-state='delete']").remove();
        }, 500)
    }
    function handleLove() {
        let newItem = document.querySelector(".preview_card[data-state='active']").getAttribute("data-food-id");
        document.querySelector(".preview_card[data-state='active']").setAttribute("data-state", "loved");
        document.querySelector(".preview_card[data-state='inactive']").setAttribute("data-state", "active");
        setElements(prev => [
            ...prev,
            "inactive"
        ])
        if(typeof(variable) != "object") {
            updateVariable(Array(newItem))
        } else {
            updateVariable([...variable, newItem])
        }
        setTimeout(() => {
            document.querySelector(".preview_card[data-state='loved']").remove();
        }, 500)
    }
    return <main id="home">
        <h1 className="hero_text">BON APPETIT</h1>
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

const mapStateToProps = (state) => ({
    variable: state.variable
})

const mapDispatchToProps = (dispatch) => ({
    updateVariable: (newVariable) => dispatch({ type: 'SYNCHRONIZE', payload: newVariable })
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
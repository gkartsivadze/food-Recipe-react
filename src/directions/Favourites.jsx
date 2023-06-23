import React, { useState, useEffect } from "react";
import { connect } from "react-redux"
import PreviewCard from "../components/PreviewCard";

function Favourite({ variable, updateVariable }) {
    const [loved, setLoved] = useState([]);
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('loved'));
        if (data !== null) {
            setLoved(data)
        }
    }, [])
    return (
        <main id="favourites">
            <section className="card_list_container">
                {loved.map((elem, ind) => {
                    return <PreviewCard key={ind} productId={elem} />
                })}
            </section>
        </main>
    )
}

const mapStateToProps = (state) => ({
    variable: state.variable
})

const mapDispatchToProps = (dispatch) => ({
    updateVariable: (newVariable) => dispatch({ type: 'SYNCHRONIZE', payload: newVariable })
})

export default connect(mapStateToProps, mapDispatchToProps)(Favourite);
import React, { useState, useEffect } from "react";
import { connect } from "react-redux"
import PreviewCard from "../components/PreviewCard";

function Favourite({ variable, updateVariable }) {
    useEffect(() => {
        if(variable === 0 && localStorage.getItem("loved") != "") {
            let newData = localStorage.getItem('loved');
            updateVariable(newData.split(","))
        }
    },[variable])
    function unFavouriteHandle(id) {
        
    }
    return (
        <main id="favourites">
            <section className="card_list_container">
                {variable.length > 0 ? variable.map((elem, ind) => {
                    return <PreviewCard key={ind} productId={elem} deleteState={true} unFavourite={unFavouriteHandle} />
                }) : ("Nothing Found")}
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
import React, { useState, useEffect } from "react";
import { connect } from "react-redux"
import PreviewCard from "../components/PreviewCard";

function Favourite({ variable }) {
    return (
        <main id="favourites">
            <section className="card_list_container">
                {variable.length > 0 && variable.reverse().map((elem, ind) => {
                    return <PreviewCard key={elem} productId={elem} deleteState={true} />
                })}
            </section>
            { variable.length > 0 || (<h1 className="popup_text text-center">Nothing Found</h1>)}
        </main>
    )
}

const mapStateToProps = (state) => ({
    variable: state.variable
})

export default connect(mapStateToProps)(Favourite);
import React, { useState } from "react"
import { Link, useSearchParams } from "react-router-dom";
import { connect } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

function Header({ variable }) {
    const [menuState, setMenuState] = useState(false)
    return <nav>
        <h1 className="logo">Receptionera</h1>
        <div className="navigation" style={window.innerWidth < 950 && menuState ? {transform: "translate(0)"} : {}}>
            <Link onClick={() => setMenuState(false)} to="/">HOME</Link>
            <Link onClick={() => setMenuState(false)} to="/categories">CATEGORIES</Link>
            <Link onClick={() => setMenuState(false)} to="/search-page">SEARCH</Link>
            <Link onClick={() => setMenuState(false)} to="/favourites">FAVOURITES<span id="favourite_counter">
                {typeof(variable) == "object" ? variable.length : 0}
                </span></Link>
        </div>
        <button onClick={() => setMenuState(prev => !prev)} id="menu_button">
            <FontAwesomeIcon icon={menuState ? faX : faBars} />
        </button>
    </nav>
}

const mapStateToProps = (state) => ({
    variable: state.variable
})

export default connect(mapStateToProps)(Header);
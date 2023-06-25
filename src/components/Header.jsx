import React, { useState } from "react"
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

function Header({ variable }) {
    const [menuState, setMenuState] = useState(false)
    const [darkMode, setDarkMode] = useState(false);

    function toggleDarkMode() {
        setDarkMode(prev => !prev)
        if (darkMode) {
            document.documentElement.style = undefined;
        } else {
            document.documentElement.style.setProperty("--orange", "rgb(0, 255, 0)");
            document.documentElement.style.setProperty("--light-green", "white");
            document.documentElement.style.setProperty("--green", "#79a985");
            document.documentElement.style.setProperty("--cream", "rgb(15,26,21");
            document.documentElement.style.setProperty("--white", "grey");
            document.documentElement.style.setProperty("--nav-background", "white");
            document.documentElement.style.setProperty("--transparent-black", "rgba(255, 255, 255, 0.4)");
            document.documentElement.style.setProperty("--root-background", "linear-gradient(to left bottom, #c5eed0, #c0e8ca, #bce2c4, #b7dcbf, #b3d6b9)");
        }
    }

    return <nav>
        <h1 className="logo">Receptionera</h1>
        <div className="navigation" style={window.innerWidth < 950 && menuState ? { transform: "translate(0)" } : {}}>
            <Link onClick={() => setMenuState(false)} to="/">HOME</Link>
            <Link onClick={() => setMenuState(false)} to="/search-page">SEARCH</Link>
            <Link onClick={() => setMenuState(false)} to="/favourites">FAVOURITES<span id="favourite_counter">
                {typeof (variable) == "object" ? variable.length : 0}
            </span>
            </Link>
            <button className="light_toggle" onClick={toggleDarkMode}><FontAwesomeIcon icon={darkMode ? faMoon : faSun} /></button>
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
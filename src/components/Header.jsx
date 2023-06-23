import React from "react"
import { Link } from "react-router-dom";
import { connect } from "react-redux"

function Header({ variable }) {
    return <nav>
        <h1 className="logo">Receptionera</h1>
        <div className="navigation">
            <Link to="/">HOME</Link>
            <Link to="/categories">CATEGORIES</Link>
            <Link to="/favourites">FAVOURITES<span id="favourite_counter">
                {typeof(variable) == "object" ? variable.length : 0}
                </span></Link>
        </div>
    </nav>
}

const mapStateToProps = (state) => ({
    variable: state.variable
})

export default connect(mapStateToProps)(Header);
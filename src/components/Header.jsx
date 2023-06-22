import React from "react"
import { Link } from "react-router-dom";

export default function Header() {
    return <nav>
        <Link to='/'><h1 className="logo">Receptionera</h1></Link>
        <div className="navigation">
            <Link to="/">HOME</Link>
            <Link to="/categories">CATEGORIES</Link>
            <Link to="/favourites">FAVOURITES<span id="favourite_counter">{localStorage.length}</span></Link>
        </div>
    </nav>
}
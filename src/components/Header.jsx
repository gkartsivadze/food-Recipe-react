import React from "react"
import { Link } from "react-router-dom";

export default function Header() {
    return <nav>
        <h1 className="logo">Receptionera</h1>
        <div className="navigation">
            <Link path="/">HOME</Link>
            <Link path="/categories">CATEGORIES</Link>
            <Link path="/favourites">FAVOURITES</Link>
        </div>
    </nav>
}
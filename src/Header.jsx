import React from "react"
import { Link } from "react-router-dom"

export default function Header() {
    return (
        <nav>
            <h1 className="logo">Receptionera</h1>
            <div className="navigation_list">
                <Link path='/'>Home</Link>
                <Link path='/'>Search</Link>
            </div>
        </nav>
    )
}
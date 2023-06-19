import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from './Header'
import Footer from './Footer'
import './style.css'

export default function Template() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
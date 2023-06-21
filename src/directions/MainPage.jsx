import React from "react"
import PreviewCard from "../components/PreviewCard"

export default function Main() {

    return <main id="home">
        <h1 className="hero_text">BON APPETITO</h1>
        <section className="card_list_container">
            <PreviewCard />
            <PreviewCard />
            <PreviewCard />
            <PreviewCard />
            <PreviewCard />
            <PreviewCard />
            <PreviewCard />
            <PreviewCard />
        </section>
    </main>
}
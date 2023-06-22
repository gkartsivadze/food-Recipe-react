import React, { useState } from "react"
import PreviewCard from "../components/PreviewCard"

export default function Main() {
    const [refresh, setRefresh] = useState(false);
    function handleRegeneration() {
        setRefresh(prev => !prev)
    }
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
        <section>
            <button onClick={handleRegeneration}>Regenerate</button>
        </section>
    </main>
}
import React, { useState, useEffect } from "react"
import PreviewCard from "../components/PreviewCard"

export default function Main() {

    return <main id="home">
        <section className="card_list_container">
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
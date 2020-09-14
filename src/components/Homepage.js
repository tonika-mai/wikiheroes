import React from "react";
import HeroesShowcase from "./HeroesShowcase";
import Top from "./Top";

export default function Homepage() {
    return (
        <div className="pageContainer">
            <Top />
            <HeroesShowcase />
        </div>
    )
};
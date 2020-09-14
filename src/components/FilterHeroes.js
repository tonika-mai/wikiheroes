import React, { useEffect, useContext, useState } from "react";
import "../styles/filterHeroes.css";
import { Link } from "react-router-dom";
import { ConnectionContext } from "../Contexts";
import Filter from "./Filter";
import HeroesResults from "./HeroesResults";
import { default as heroes } from "../heroes.json";
import Home from "../imgs/home.png";

export default function FilterHeroes() {
    const [filteredHeroes, setFilteredHeroes] = useState(heroes);
    const [currentPage, setCurrentPage] = useState(1);

    function applyAll() {
        setCurrentPage(1);
        setFilteredHeroes(heroes);
    };

    function applyAlignment(event) {
        const target = event.target;
        const filtered = heroes.filter(hero => {
            return hero.biography.alignment === target.value;
        });
        setCurrentPage(1);
        setFilteredHeroes(filtered);
    };

    function applyGender(event) {
        const target = event.target;
        const filtered = heroes.filter(hero => {
            return hero.appearance.gender.toLowerCase() === target.value;
        });
        setCurrentPage(1);
        setFilteredHeroes(filtered);
    };

    function applySkill(event) {
        const target = event.target;
        const filtered = heroes.filter(hero => {
            return parseInt(hero.powerstats[target.value]) >= 85;
        })
        setCurrentPage(1);
        setFilteredHeroes(filtered);
    };

    // const [cors, url, token] = useContext(ConnectionContext);

    // useEffect(() => {
    //     async function fetchHeroes() {
    //         const heroes = [];
    //         const idsList = [];
    //         const array = Array(731).fill(1);
    //         for (let i = 0; i < array.length; i++) {
    //             let number = array[i] + i;
    //             idsList.push(number);
    //         }
    //         for (let i = 0; i < idsList.length; i++) {
    //             let result = await fetch(`${cors}${url}${token}${idsList[i]}`)
    //             let hero = await result.json()
    //             heroes.push(hero)
    //         }
    //         console.log("ready")
    //         navigator.clipboard.writeText(JSON.stringify(heroes))
    //     };

    //     fetchHeroes();
    // }, []);

    return (
        <div className="pageContainer">
            <div className="top browseTop">
                <header className="browseHeader">
                    <h1 className="browseTitle">FILTERS</h1>
                </header>
            </div>
            <main>
                <div className="filtersBar">
                    <Link to={"/"}>
                        <input className="linkbutton"
                            type="image"
                            src={Home}
                            alt="back to homepage"
                        />
                    </Link>
                    <p>FILTER BY:</p>
                    <menu className="buttonsContainer">
                        <div className="filter">
                            <button className="filterButton"
                                onClick={applyAll}>ALL</button>
                        </div>
                        <Filter dropBtn="alignment"
                            btnArray={["good", "bad"]}
                            applyFilter={applyAlignment} />
                        <Filter dropBtn="gender"
                            btnArray={["male", "female"]}
                            applyFilter={applyGender} />
                        <Filter dropBtn="skill"
                            btnArray={["intelligence", "strength", "speed", "durability", "power", "combat"]}
                            applyFilter={applySkill} />
                    </menu>
                </div>
                <HeroesResults results={filteredHeroes}
                    lighterContainer="lighterContainer"
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage} />
            </main>
        </div>
    )
};
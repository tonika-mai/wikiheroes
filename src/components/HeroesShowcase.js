import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/homepage.css"
import { ConnectionContext } from "../Contexts";
import HeroCard from "./HeroCard";

export default function HeroesShowcase() {
    const [cors, url, token] = useContext(ConnectionContext);
    const [popularHeroes, setPopularHeroes] = useState([]);


    // API REQUEST => UPDATE STATE AND SET LOCALSTORAGE
    async function fetchPopularHeroes() {

        // MOST POPULAR HEROES FOR HOMEPAGE
        const popularHeroesIds = [70, 480, 225, 332, 638, 370, 620, 423, 644, 659, 717, 333, 720, 162, 346, 344, 680, 107]
        const popularHeroesList = []
        for (let i = 0; i < popularHeroesIds.length; i++) {
            try {
                let result = await fetch(`${cors}${url}${token}${popularHeroesIds[i]}`);
                let data = await result.json();
                popularHeroesList.push(data);
            } catch (error) {
                console.log(error);
            }
        };

        setPopularHeroes(popularHeroesList);
        localStorage.setItem("popularHeroes", JSON.stringify(popularHeroesList));
    };

    // CHECK LOCALSTORAGE, IF EMPTY => API REQUEST
    useEffect(() => {
        const popularHeroesStorage = JSON.parse(localStorage.getItem("popularHeroes"));
        if (popularHeroesStorage) {
            setPopularHeroes(popularHeroesStorage);
        } else {
            fetchPopularHeroes();
        }
    }, []);

    // CREATING HEROCARDS
    const heroCards = popularHeroes.map(hero => {
        return (
            <Link to={`/superheroes/${hero.id}`} key={hero.id}>
                <HeroCard hero={hero} />
            </Link>
        )
    });

    return (
        <div>
            <h2 className="heroCardsTitle">MOST POPULAR</h2>
            <div className="heroCardsContainer">
                {heroCards}
            </div>
        </div>
    );
};
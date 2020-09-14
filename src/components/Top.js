import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ConnectionContext } from "../Contexts";
import "../styles/top.css";
import Dice from "../imgs/dice.png";
import Filters from "../imgs/filters.png"
import Search from "../imgs/search.png";
import HeroesResults from "./HeroesResults";

export default function Top() {
    const [cors, url, token] = useContext(ConnectionContext);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // DICE BUTTON
    const randomID = Math.floor(Math.random() * 731) + 1;

    // SEARCH INPUT
    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        const res = await fetch(`${cors}${url}${token}search/${query}`);
        const result = await res.json();
        setIsLoading(false);

        if (result.response === "success") {
            setResults(result.results);
        } else {
            setError(true);
        }
    };

    function handleChange(event) {
        setQuery(event.target.value);
        setResults([]);
        setError(false);
    };

    return (
        <div>
            <header>
                <h1>WIKIHEROES</h1>
                <p>Find your favorite superhero among more than 700 profiles! </p>
                <div className="search">
                    <form onSubmit={handleSubmit}>
                        <input type="search"
                            name="query"
                            value={query}
                            placeholder="Ex. Deadpool..."
                            onChange={handleChange} />
                        <input type="image"
                            src={Search}
                            alt="search a hero by name" />
                    </form>
                    <div className="buttonsContainer">
                        <Link to={`/superheroes/${randomID}`}>
                            <input className="linkbutton"
                                type="image"
                                src={Dice}
                                alt="get a random hero" />
                        </Link>
                        <Link to="/superheroes">
                            <input className="linkbutton"
                                type="image"
                                src={Filters}
                                alt="access filters" />
                        </Link>
                    </div>
                </div>
            </header>
            {isLoading
                ?
                <div className="spinnerContainer">
                    <div className="spinner"></div>
                </div>
                :
                results.length > 0
                    ?
                    <HeroesResults results={results} query={query} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    :
                    null}
            {error ? <div className="errorContainer"><p>Sorry, no superheroes found with this name...<br />Try again!</p></div> : null}
        </div>
    )
};
import React from "react";
import { Link } from "react-router-dom";
import HeroCard from "./HeroCard";

export default function HeroesResults(props) {

    // PAGE NUMBERING
    const resultsPerPage = 30;
    const firstResult = (props.currentPage * resultsPerPage) - resultsPerPage;
    const lastResult = props.currentPage * resultsPerPage;

    // GENERATING PAGE CARDS
    const heroCards = props.results.slice(firstResult, lastResult).map(hero => {
        return (
            <Link to={`/superheroes/${hero.id}`} key={hero.id}>
                <HeroCard hero={hero} />
            </Link>
        )
    });

    // GENERATING PAGE BUTTONS
    const pages = [];
    const numberOfPages = Math.ceil(props.results.length / resultsPerPage);
    const array = Array(numberOfPages).fill(1);
    for (let i = 0; i < array.length; i++) {
        let number = array[i] + i;
        pages.push(number);
    }
    const pageButtons = pages.map(page => {
        return (
            <button value={page}
                key={page}
                onClick={setPage}
                className="pageButton"
                style={{ color: props.currentPage === page ? "rgb(225, 225, 225)" : null }}>
                {page}
            </button>
        )
    });

    function setPage(event) {
        props.setCurrentPage(parseInt(event.target.value))
    };

    // DETERMINING TITLE DEPENDING ON THE CONTAINER RESULTS: QUERY OR FILTER
    function determineTitle() {
        let title = `${props.results.length} RESULT${props.results.length > 1 ? "S" : null} FOUND`
        if (props.query) {
            title = title + ` FOR "${props.query}"`;
        }
        return title;
    };

    return (
        <div className={`resultsContainer ${props.lighterContainer}`}>
            <h2 className="heroCardsTitle">{determineTitle()}</h2>
            <div className={`heroCardsContainer resultsContainer ${props.lighterContainer}`}>
                {heroCards}
            </div>
            <div className="pageButtonsContainer" style={{ display: numberOfPages > 1 ? "flex" : "none", }}>
                {pageButtons}
            </div>
        </div>
    )
};
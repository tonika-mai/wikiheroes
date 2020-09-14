import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FavoritesContext } from "../Contexts";
import FavoritesCard from "./FavoritesCard";

export default function FavoritesList() {
    const [favorites, setFavorites] = useContext(FavoritesContext);

    // CHECK LOCALSTORAGE, IF EMPTY => STATE IS OK
    useEffect(() => {
        const favoritesStorage = JSON.parse(localStorage.getItem("favorites"));
        if (favoritesStorage) {
            setFavorites(favoritesStorage);
        }
    }, []);

    // CREATING CARDS
    const favoritesCards = favorites.map(hero => {
        return (
            <Link to={`/superheroes/${hero.id}`} key={hero.id}>
                <FavoritesCard hero={hero} />
            </Link>
        )
    });

    // CLOSING DRAWER ON URL CHANGE AND ON CLICK
    let url = useLocation();  // since it's a hook, it updates automatically
    useEffect(() => {
        document.querySelector(".drawerHandle").classList.remove("active");
    }, [url]);

    function handleDrawer() {
        document.querySelector(".drawerHandle").classList.toggle("active");
    };


    return (
        <div className="drawer">
            <div className="drawerHandle"
                onClick={handleDrawer}>
                <h3>MY FAVORITES</h3>
            </div>
            <div className="favoritesContainer">
                {favoritesCards}
            </div>
        </div>
    )
};
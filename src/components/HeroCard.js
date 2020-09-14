import React, { useState, useContext } from "react";
import "../styles/heroCard.css";
import { FavoritesContext } from "../Contexts";
import MaleAvatar from "../imgs/maleAvatar.jpg";
import FemaleAvatar from "../imgs/femaleAvatar.jpg";
import EmptyHeart from "../imgs/heart_empty.png";
import FullHeart from "../imgs/heart_full.png";

export default function HeroCard(props) {
    const [showingHeroName, setShowingHeroName] = useState(true);
    const [favorites, setFavorites] = useContext(FavoritesContext);

    function flipTitle() {
        setShowingHeroName(previous => !previous);
    };

    function placeholderAvatar(event) {
        event.target.onerror = null;    // prevents loop in case the new img also causes an error
        event.target.src = props.hero.appearance.gender.toLowerCase() === "male" ? MaleAvatar : FemaleAvatar;
    };

    function updateFavorites(event) {
        event.preventDefault()  // removing link to HeroDetail from heart button
        const index = favorites.findIndex(hero => hero.id === props.hero.id);
        // If not liked yet, add to favorites and localStorage
        if (index === -1) {
            const newFavorites = [...favorites, props.hero];
            setFavorites(newFavorites);
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
            //If already liked, remove from favorites and localStorage
        } else {
            const newFavorites = favorites.filter(hero => hero.id !== props.hero.id);
            setFavorites(newFavorites);
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
        }
    };

    function displayFavoriteStatus() {
        const index = favorites.findIndex(hero => hero.id === props.hero.id);
        if (index === -1) {
            return EmptyHeart;
        }
        return FullHeart;
    };

    return (
        <div className="heroCard">
            <input type="image"
                src={displayFavoriteStatus()}
                alt="add to/remove from favorites"
                className="heartButton"
                onClick={updateFavorites} />
            <img src={props.hero.image.url}
                alt={props.hero.name}
                onError={placeholderAvatar} />
            <h3 onMouseEnter={flipTitle}
                onMouseOut={flipTitle}
                style={{ display: showingHeroName ? "block" : "none" }}>
                {props.hero.name}</h3>
            <h3 onMouseEnter={flipTitle}
                onMouseOut={flipTitle}
                style={{
                    display: showingHeroName ? "none" : "block",
                    color: props.hero.biography.alignment === "good" ? "rgb(79, 135, 255)" : "rgb(255, 79, 79)"
                }}>
                {props.hero.biography.alignment === "good" ? "hero" : "villain"}</h3>

        </div>
    )
};
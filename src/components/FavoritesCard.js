import React from "react";

export default function FavoritesCard(props) {
    return (
        <div className="favoritesCard">
            <img src={props.hero.image.url}
                alt={props.hero.name} />
            <div className="favoritesInfo">
                <h4>{props.hero.name}</h4>
                <p>{props.hero.biography.alignment === "good" ? "hero" : "villain"}</p>
            </div>
        </div>
    )
};
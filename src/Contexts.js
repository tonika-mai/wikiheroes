import React, { createContext, useState } from "react";

// CONNECTION
export const ConnectionContext = createContext();

export function ConnectionProvider(props) {
    const cors = "https://cors-anywhere.herokuapp.com/"
    const url = "https://superheroapi.com/api/";
    const token = "10221519469071755/";

    return (
        <ConnectionContext.Provider value={[cors, url, token]}>
            {props.children}
        </ConnectionContext.Provider>
    )
};

// FAVORITES
export const FavoritesContext = createContext();

export function FavoritesProvider(props) {
    const [favorites, setFavorites] = useState([]);

    return (
        <FavoritesContext.Provider value={[favorites, setFavorites]}>
            {props.children}
        </FavoritesContext.Provider>
    )
};

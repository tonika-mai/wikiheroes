import React from "react";
import "../styles/homepage.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ConnectionProvider, FavoritesProvider, FavoritesContext } from "../Contexts";
import Homepage from "./Homepage";
import FilterHeroes from "./FilterHeroes";
import HeroDetail from "./HeroDetail";
import FavoritesList from "./FavoritesList";

export default function App() {
    return (
        <Router>
            <ConnectionProvider>
                <FavoritesProvider>
                    <FavoritesList />
                    <Switch>
                        <Route path="/" exact component={Homepage} />
                        <Route path="/superheroes" exact component={FilterHeroes} />
                        <Route path="/superheroes/:id" component={HeroDetail} />
                    </Switch>
                </FavoritesProvider>
            </ConnectionProvider>
        </Router>
    );
};
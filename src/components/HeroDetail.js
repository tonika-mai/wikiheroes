import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/heroDetail.css";
import { ConnectionContext } from "../Contexts";
import Brain from "../imgs/brain.png";
import Muscle from "../imgs/muscle.png";
import Speed from "../imgs/speed.png";
import Battery from "../imgs/battery.png";
import Star from "../imgs/star.png";
import Combat from "../imgs/combat.png";
import FemalePortrait from "../imgs/femalePortrait.jpg";
import MalePortrait from "../imgs/malePortrait.jpg";
import Home from "../imgs/home.png";

export default function HeroDetail({ match }) {
    const [cors, url, token] = useContext(ConnectionContext);
    const [hero, setHero] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // GET DATA
    async function fetchHero() {
        setIsLoading(true);
        const result = await fetch(`${cors}${url}${token}${match.params.id}`);
        const hero = await result.json();
        setHero(hero);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchHero()
    }, [match.params.id]);

    // HANDLE BROKEN IMGS
    function placeholderPortrait(event) {
        event.target.onerror = null;
        event.target.src = hero.appearance.gender.toLowerCase() === "male" ? MalePortrait : FemalePortrait;
    };

    // NORMALIZE TEXT
    function capitalize(string) {
        if (string) {
            const lowerCase = string.slice(1).toLowerCase();
            return string[0].toUpperCase() + lowerCase;
        }
    };

    return (
        isLoading
            ?
            <div className="spinnerContainer">
                <div className="spinner"></div>
            </div>
            :
            <div className="showAlignment"
                style={{ background: hero.biography?.alignment === "good" ? "linear-gradient(12deg, rgba(27,27,27,1) 12%, rgba(7,135,161,1) 50%, rgba(27,27,27,1) 88%)" : "linear-gradient(12deg, rgba(27,27,27,1) 12%, rgba(215,32,32,1) 50%, rgba(27,27,27,1) 88%)" }}>
                <main className="heroDetailContainer">
                    <Link to={"/"}>
                        <input className="home"
                            type="image"
                            src={Home}
                            alt="back to homepage"
                        />
                    </Link>
                    <img src={hero.image?.url}
                        alt={hero.name}
                        onError={placeholderPortrait} />
                    <section className="heroDetailInfo">
                        <h1 style={{ color: hero.biography?.alignment === "good" ? "rgba(7,135,161,1)" : "rgba(215,32,32,1)" }}>{hero.name}</h1>
                        <div className="infoPair">
                            <h3>Full name:</h3>
                            <p>{hero.biography?.["full-name"]}</p>
                        </div>
                        <div className="infoPair">
                            <h3>Place of birth:</h3>
                            <p>{hero.biography?.["place-of-birth"]}</p>
                        </div>
                        <div className="infoPair">
                            <h3>Gender:</h3>
                            <p>{capitalize(hero.appearance?.gender)}</p>
                        </div>
                        <div className="infoPair">
                            <h3>Race:</h3>
                            <p>{capitalize(hero.appearance?.race)}</p>
                        </div>
                        <div className="infoPair">
                            <h3>Height:</h3>
                            <p>{hero.appearance?.height.join(" or ")}</p>
                        </div>
                        <div className="infoPair">
                            <h3>Weight:</h3>
                            <p>{hero.appearance?.weight.join(" or ")}</p>
                        </div>
                        <div className="infoPair">
                            <h3>Eyes:</h3>
                            <p>{capitalize(hero.appearance?.["eye-color"])}</p>
                        </div>
                        <div className="infoPair">
                            <h3>Hair:</h3>
                            <p>{capitalize(hero.appearance?.["hair-color"])}</p>
                        </div>
                        <div className="infoPair">
                            <h3>Occupation:</h3>
                            <p>{hero.work?.occupation}</p>
                        </div>
                        <div className="infoPair">
                            <h3>Base:</h3>
                            <p>{hero.work?.base}</p>
                        </div>
                        <div className="infoPair">
                            <h3>Alter egos:</h3>
                            <p>{hero.biography?.["alter-egos"]}</p>
                        </div>
                        <div className="infoPair">
                            <h3>Aliases:</h3>
                            <p>{hero.biography?.aliases.join(", ")}</p>
                        </div>
                        <div className="infoPair">
                            <h3>First appearance:</h3>
                            <p>{hero.biography?.["first-appearance"]}</p>
                        </div>
                        <div className="infoPair">
                            <h3>Publisher:</h3>
                            <p>{hero.biography?.publisher}</p>
                        </div>
                    </section>
                    <section className="powerStatsContainer">
                        <h2>Powerstats</h2>
                        <div className="powerstatIcon" style={{ backgroundImage: `url(${Brain})` }}>
                            <div className="powerstatBorder">
                                <div className="powerstatBar" style={{ width: `${hero.powerstats?.intelligence}%`, backgroundColor: "rgb(136, 74, 248)" }}></div>
                            </div>
                        </div>
                        <div className="powerstatIcon" style={{ backgroundImage: `url(${Muscle})` }}>
                            <div className="powerstatBorder">
                                <div className="powerstatBar" style={{ width: `${hero.powerstats?.strength}%`, backgroundColor: "rgb(255, 95, 9)" }}></div>
                            </div>
                        </div>
                        <div className="powerstatIcon" style={{ backgroundImage: `url(${Speed})`, backgroundSize: "contain" }}>
                            <div className="powerstatBorder">
                                <div className="powerstatBar" style={{ width: `${hero.powerstats?.speed}%`, backgroundColor: "rgb(16, 210, 18)" }}></div>
                            </div>
                        </div>
                        <div className="powerstatIcon" style={{ backgroundImage: `url(${Battery})` }}>
                            <div className="powerstatBorder">
                                <div className="powerstatBar" style={{ width: `${hero.powerstats?.durability}%`, backgroundColor: "rgb(244, 255, 0)" }}></div>
                            </div>
                        </div>
                        <div className="powerstatIcon" style={{ backgroundImage: `url(${Star})` }}>
                            <div className="powerstatBorder">
                                <div className="powerstatBar" style={{ width: `${hero.powerstats?.power}%`, backgroundColor: "rgb(7, 144, 181)" }}></div>
                            </div>
                        </div>
                        <div className="powerstatIcon" style={{ backgroundImage: `url(${Combat})` }}>
                            <div className="powerstatBorder">
                                <div className="powerstatBar" style={{ width: `${hero.powerstats?.combat}%`, backgroundColor: "rgb(255, 20, 16)" }}></div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
    )
};
import React from "react";

export default function Filter(props) {
    // CHANGING "GOOD" AND "BAD" WITH "HERO" AND "VILLAIN"
    function buttonName(buttonValue) {
        if (buttonValue === "good") {
            return "hero";
        } else if (buttonValue === "bad") {
            return "villain";
        }
        return buttonValue;
    };

    // CREATING BUTTONS
    const buttons = props.btnArray.map(button => {
        return (
            <button className="filterButton"
                key={button}
                value={button}
                onClick={props.applyFilter}>
                {buttonName(button)}
            </button>
        )
    });

    return (
        <div className="filter dropdown">
            <button className="filterButton dropBtn">
                {props.dropBtn}
            </button>
            <div className="dropContent">
                {buttons}
            </div>
        </div>
    )
};
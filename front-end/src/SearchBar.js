import React, { useState, useEffect } from "react";
import GameOptions from "./GameOptions";
import "./SearchBar.css";

export default function SearchBar(props) {
    const [userText, setUserText] = useState('');
    const [games, setGames] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const handleInputChange = (e) => {
        setUserText(e.target.value);
    }
    useEffect(() => {

    },[games])
    const handleAPICall = async (userText) => {
        if(userText === ""){
            return;
        }
        props.setLoading(true);
        props.setIsButtonDisabled(true);
        try {
            const response = await fetch("http://localhost:5000/get-game", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: userText,
              }),
            });
            const data = await response.json();
            // checks if a game was found
            if (data[0] === undefined){
                alert("Game Could not be Found!");
                props.setLoading(false);
                props.setIsButtonDisabled(false);
                return;
            }
            if(!data[1]){
                //one game
                setShowSearch(false);
                props.setGame(data);
                setGames([]);
                props.setShowGame(true);
            }else{
                // multiple games
                setShowSearch(true);
                setGames(data);
            }
            props.setLoading(false);
            props.setIsButtonDisabled(false);
        } catch (error) {
            console.log("Error:", error);
        }
    }

    return (
    <>
        <section className="search">
            <div className="icon-bar-container">
                <ion-icon
                name="search-outline"
                className="search-icon"
                id="search-icon"
                ></ion-icon>
                <input
                type="text"
                className="search-box"
                placeholder="Choose a Game You Would Like to Play"
                onChange={handleInputChange}
                ></input>
                {showSearch && <GameOptions games={games} handleAPICall={handleAPICall}/>}
            </div>
            <button className="search-button" onClick={() => handleAPICall(userText)} disabled={props.isButtonDisabled}>
                Search
            </button>
        </section>
    </>
    );
}

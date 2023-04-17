import React, { useState, useEffect } from 'react';
import "./Game_Display.css";

export default function GameDisplay(props){
    const [gameData, setGameData] = useState({
        imageURL: "",
        name: "",
        genre: "",
        platforms: "",
        perspectives: "",
        releaseDate: "",
        rating: ""
    });
  
    useEffect(() => {
      setGameData({
        imageURL: props.game[0].imageURL,
        name: props.game[0].name,
        genre: props.game[0].genre,
        platforms: props.game[0].platforms,
        perspectives: props.game[0].perspectives,
        releaseDate: props.game[0].releaseDate,
        rating: props.game[0].rating
      });
    }, [props.game]);
    const { imageURL, name, genre, platforms, perspectives, releaseDate, rating } = gameData;

    // making release date string
    var releaseDateDescriptor = "Release Date: " + releaseDate.substring(0, releaseDate.indexOf('T'));
    
    // making rating string
    var ratingDescriptor = Math.floor(rating) + "%";
    // making platforms string
    var platformDescriptor = "";
    if(Array.isArray(platforms)){
        for(let i = 0; i < platforms.length; i++){
            platformDescriptor += platforms[i].name;
            if(i < platforms.length - 1){
                platformDescriptor += ", ";
            }
        }
    }else{
        platformDescriptor += platforms;
    }
    // making perspective string
    var perspectiveDescriptor = "";
    if(Array.isArray(perspectives)){
        for(let i = 0; i < perspectives.length; i++){
            perspectiveDescriptor += perspectives[i].name;
            if(i < perspectives.length - 1){
                perspectiveDescriptor += ", ";
            }
        }
    }else{
        perspectiveDescriptor += perspectives;
    }

    return(
        <>
            <section className="game-display">
                <img src={imageURL} alt={`Cover of ${name}`} className="game-cover"></img>
                <div className="game-description-box">
                    <p className='game-descriptor'>Name: {name}</p>
                    <p className='game-descriptor'>Genre: {genre}</p>
                    <p className='game-descriptor'>Platforms: {platformDescriptor}</p>
                    <p className='game-descriptor'>Perspectives: {perspectiveDescriptor}</p>
                    <p className='game-descriptor'>Release Date: {releaseDateDescriptor}</p>
                    <p className='game-descriptor'>Rating: {ratingDescriptor}</p>
                </div>
            </section>
        </>
    )
}
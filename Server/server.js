const express = require("express");
const cors = require("cors");
const axios = require("axios");
const env = require("dotenv").config();
const app = express();
const port = 5000;

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const apiKey = process.env.API_KEY;

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:3000"],
  })
);


app.use(express.json());

app.post("/get-game", async (req, res) => {
  try {
    const gameList = await getGameData(req.body.name, req.body.userPreference);
    // const apiResponse = await getGameAnalysis();
    // console.log(apiResponse)
    // checks if there are multiple games (if there are this will be a search bar moment!)
    if (gameList[1]){
      // this .name statement exists to see if there actually is a name. If this is undefined it means no game was found
      gameList[0].name;
      res.send(gameList);
    }else{
      gameList.name;
      res.send(gameList);
    }
    
  } catch (error) {
    // to-do: figure out how to send back an error message to be displayed to the user
    //informing them that hte game search didn't work. Remember that the front end is expecting the JSON object in game
    res.send({error: error});
    console.log(error);
  }
});

app.post("/get-analysis", async (req, res) => {
  try{
    const apiResponse = await getGameAnalysis(req.body.prompt);
    console.log(apiResponse);
    res.send({response: apiResponse});
  }catch (error){
    console.log(error);
  }
})

async function getGameData(gameName, userPreference) {
  const response = await axios.post(
    `https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`
  );
  const accessToken = response.data.access_token;
  // const aiOpinion = await getGameAnalysis(game, req.body.userPreference);
  try {
    const responseGame = await axios({
      url: "https://api.igdb.com/v4/games",
      method: "POST",
      headers: {
        "Client-ID": clientID,
        Authorization: `Bearer ${accessToken}`,
      },
      data: `fields name, cover.image_id, genres.name, rating, platforms.name, first_release_date;
             search "${gameName}";
             where category != 3 & category != 1 & category != 2 & category != 10 & category != 9 
             & platforms.category != 8 & platforms.category != 9 
             & aggregated_rating_count > 1
             & first_release_date < ${Math.floor(Date.now() / 1000)};
             limit 5;`,
             
    });

    // organizes the data and sends it back to the endpoint
    let game = [];
    game[0] = responseGame.data[0];
    // checks for the first game that has the same name that the user typed in just in case the games aren't ordered well in the response
    let exactGameExists = false;
    for (let i = 0; i < responseGame.data.length; i++) {
      if (responseGame.data[i].name.toLowerCase() === gameName.toLowerCase()) {
        game[0] = responseGame.data[i];
        exactGameExists = true;
        break; 
      }
    }
    if(exactGameExists){
      checkGameParameters(game[0]);
      // const aiOpinion = await getGameAnalysis(game[0], userPreference);
      game[0] = {
        name: game[0].name,
        imageURL: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game[0].cover.image_id}.jpg`,
        genre: game[0].genres[0].name,
        platforms: game[0].platforms,
        perspectives: game[0].player_perspectives,
        releaseDate: new Date(game[0].first_release_date * 1000),
        rating: game[0].rating,
        // analysis: aiOpinion,
      }
      return game;
    }else{
      // send back a lot of games
      // I can't send back AI opinion for ALL of these so I'm just going to send another API request when the user clicks which game they want to play. Since we will have the exact name,
      // exactGameExists will always be true
      const numGamesToSend = (responseGame.data).length > 5 ? 5 : (responseGame.data).length;
      let games = [];
      for (let i = 0; i < numGamesToSend; i++){
        let currGame = responseGame.data[i];
        currGame = {
          name: currGame.name,
          imageURL: `https://images.igdb.com/igdb/image/upload/t_cover_big/${currGame.cover.image_id}.jpg`,
          genre: currGame.genres[0].name,
          platforms: currGame.platforms,
          perspectives: currGame.player_perspectives,
          releaseDate: new Date(currGame.first_release_date * 1000),
          rating: currGame.rating,
        }
        checkGameParameters(currGame);
        games.push(currGame);
      }
      return games;
    }
  } catch (error) {
    console.log(error);
  }
}


// make API call to OpenAI and return the response
async function getGameAnalysis(prompt) {
  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: `${prompt}`},
    ],
  };
  const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  const endpointURL = "https://api.openai.com/v1/chat/completions";
  console.log("HELLO");
  try {
    const response = await axios.post(endpointURL, requestBody, { headers: requestHeaders });
    console.log(response);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.log(error);
    return `There was an error: ${error.message}`;
  }
}

function checkGameParameters(game){
  const parameterList = ["name", "genres", "rating", "platforms", "first_release_date", "player_perspectives"]
  for (const param of parameterList){
    const value = game[param];
    if (!value){
      game[param] = "N/A";
    }
  }
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

import { useState } from "react";

import "./App.css";
import "./Loading_Animation.css";

import SearchBar from "./SearchBar";
import GameDisplay from "./GameDisplay";
import ResponseContainer from "./ResponseContainer";
import PreferencePage from "./Preference_Pages/PreferencePage";
import BackArrow from './Preference_Pages/BackArrow'


function App() {
  const [game, setGame] = useState(null);
  const [showGame, setShowGame] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [preferences, setPreferences] = useState([]);
  const [suggestion, setSuggestion] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handlePreferences = (preference) => {
    let duplicateChoice = false;
  
    // Find index of duplicate choice
    const duplicateIndex = preferences.findIndex(choice => choice[0].toString() === preference[0].toString());
  
    if (duplicateIndex !== -1) {
      // If duplicate choice found, remove it from preferences array
      setPreferences(prevPreferences => {
        const updatedPreferences = [...prevPreferences];
        updatedPreferences.splice(duplicateIndex, 1);
        return updatedPreferences;
      });
      duplicateChoice = true;
      
    }
    if (!duplicateChoice) {
      // If not a duplicate choice, add it to preferences array
      setPreferences(prevPreferences => [...prevPreferences, preference]);
    }
    console.log(preferences);
  }
  
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  }

  // const prevPage = () => {
  //   setCurrentPage(currentPage - 1);
  // }
  
  const renderPage = () => {
    switch(currentPage) {
      case 1:
        return <PreferencePage nextPage={nextPage} handlePreferences={handlePreferences} preferences={preferences}/>
      case 2:
        return (
          <>
            <h1>Check if a Game is Right For You</h1>
            <SearchBar setLoading={setLoading} setGame={setGame} setShowGame={setShowGame} isButtonDisabled={isButtonDisabled} setIsButtonDisabled={setIsButtonDisabled}/>
            {isLoading && <><div id="loading"></div></>}
            {showGame && <><GameDisplay game={game}/>
                          <ResponseContainer game={game} preferences={preferences} suggestion={suggestion} 
                          setSuggestion={setSuggestion} setLoading={setLoading} setIsButtonDisabled={setIsButtonDisabled}
                          />
              </>
            }
            <BackArrow onClick={prevPage} />
          </>
        )
      default:
        return null;
    }
  }
  
  return (
    <>
      {renderPage()}
    </>
  );
}
export default App;

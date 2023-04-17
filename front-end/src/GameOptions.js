import GameOption from "./GameOption"


export default function GameOptions(props) {
    // for every game in props.games, return <GameOption game = game/>
    return(
        <>
            {props.games.map((game) => <GameOption key={game.name} game={game} handleAPICall={props.handleAPICall}/>)}
        </>
    )
}
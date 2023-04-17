import "./GameOption.css";

export default function GameOption(props){
    var releaseDateDescriptor = "Release Date: " + props.game.releaseDate.substring(0, props.game.releaseDate.indexOf('T'));
    return (
        <>
            <div className="game-display showing-results"  onClick = {() => props.handleAPICall(props.game.name)}>
                <img className="game-cover showing-results" src={props.game.imageURL} alt={`Cover of ${props.game.name}`}></img>
                <div className="game-description-box showing-results">
                    <p className="game-descriptor showing-results">Name: {props.game.name}</p>
                    <p className="game-descriptor showing-results">Genre: {props.game.genre}</p>
                    <p className="game-descriptor showing-results">Release Date: {releaseDateDescriptor}</p>
                </div>
            </div>
        </>
    )
}


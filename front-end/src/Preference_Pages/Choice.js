import "./Choice.css";

export default function Choice(props){
    function checkIfChoiceIncluded(choice) {
        const foundIndex = props.preferences.findIndex(option => option[0].toString() === choice[0].toString());
        return foundIndex !== -1;
      }
      
    return(
        <>
            <div
                className={`choice ${checkIfChoiceIncluded(props.choice) ? 'selected' : ''}`}
                onClick={() => props.handlePreferences(props.choice)}
            >
                <h2 className="header">{props.choice[0]}</h2>
                <p className="description">{props.choice[1]}</p>
            </div>
        </>
    )
}
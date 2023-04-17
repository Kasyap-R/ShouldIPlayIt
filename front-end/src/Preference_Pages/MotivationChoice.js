import "./MotivationChoice.css"

export default function MotivationChoice(props) {
    return(
        <>
            <div className="container">
                <h4 className="motiv-head">{props.header}</h4>
                <p className="motiv-descript"></p>
            </div>
        </>    
    )
}
import './BackArrow.css'

export default function BackArrow(props) {
    return (
        <>
            <div className="page-btn" onClick={props.onClick}>
                    <span className="circle-border back">
                        <ion-icon name="arrow-back-outline" id="back-arrow"></ion-icon>
                    </span>
            </div>
        </>
    )
}
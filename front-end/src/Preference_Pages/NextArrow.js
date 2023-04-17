import './NextArrow.css'

export default function NextArrow(props) {
    return(
        <>
            {props.showCondition && 
                <div className="page-btn" onClick={props.onClick}>
                    <span className="circle-border">
                        <ion-icon name="arrow-forward-outline" id="next-page"></ion-icon>
                    </span>
                </div>
            }
        </>
    )
}

import {NasaResponseType} from "../type/NasaResponseType";
import "./Card.css";

type CardProps = {
    nasaApiData: NasaResponseType,
}

export default function Card(props: CardProps) {

    return <>
        <div className="cardContainer">
            <div className="cardContainerHead">
                <h3>{props.nasaApiData.title}</h3>
            </div>

            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img src={props.nasaApiData.url} alt={props.nasaApiData.title} className={"cardImage"}/>
                    </div>
                    <div className="flip-card-back">
                        <p className="explanation">
                            {props.nasaApiData.explanation}
                        </p>
                    </div>
                </div>
            </div>

            <div className="cardContainerFooter">
                <button>Click</button>
                <button>Click</button>
                <button>Click</button>
            </div>
        </div>
    </>
}

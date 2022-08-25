import {NasaResponseType} from "../type/NasaResponseType";
import "./Card.css";
import {FaShoppingCart} from "react-icons/fa";
import {MdFavorite} from "react-icons/md";

type CardProps = {
    nasaApiData: NasaResponseType,
    me: string,
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
            {
                props.me !== "anonymousUser" ?
                    <div className="cardContainerFooter">
                        <button className="cardBtn favouriteBtn">
                            <MdFavorite/>
                            <span className="btnHoverText">Add to favourite</span>
                        </button>
                        <button className="cardBtn cartBtn">
                            <FaShoppingCart/>
                            <span className="btnHoverText">Move it to cart</span>
                        </button>
                    </div>
                    :
                    <></>
            }

        </div>
    </>
}

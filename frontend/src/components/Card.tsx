import "./Card.css";
import {FaShoppingCart} from "react-icons/fa";
import {MdFavorite} from "react-icons/md";
import {AxiosResponse} from "axios";
import {UserItemType} from "../type/UserItemType";

type CardProps = {
    filteredNasaData: UserItemType,
    me: string,
    addItem: (username: string, explanation: string, title: string, url: string) => Promise<AxiosResponse<any, any>>,
    favouriteBtnDisplay: boolean,
}

export default function Card(props: CardProps) {

    return <>
        <div className="cardContainer">
            <div className="cardContainerHead">
                <h3>{props.filteredNasaData.title}</h3>
            </div>

            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img src={props.filteredNasaData.url} alt={props.filteredNasaData.title}
                             className={"cardImage"}/>
                    </div>
                    <div className="flip-card-back">
                        <p className="explanation">
                            {props.filteredNasaData.explanation}
                        </p>
                    </div>
                </div>
            </div>
            {
                props.me !== "anonymousUser" ?
                    <div className="cardContainerFooter">
                        <button className="cardBtn favouriteBtn"
                                style={{'display': `${props.favouriteBtnDisplay ? 'inline' : 'none'}`}}
                                onClick={() => props.addItem(props.me, props.filteredNasaData.explanation, props.filteredNasaData.title, props.filteredNasaData.url)}>
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

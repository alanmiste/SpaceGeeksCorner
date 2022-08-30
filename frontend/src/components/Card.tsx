import "./Card.css";
import {FaShoppingCart} from "react-icons/fa";
import {MdFavorite} from "react-icons/md";
import {AxiosResponse} from "axios";
import {UserItemToSave, UserItemType} from "../type/UserItemType";
import {useState} from "react";

type CardProps = {
    filteredNasaData: UserItemType,
    me: string,
    addItem: (username: string, explanation: string, title: string, url: string) => Promise<AxiosResponse<any, any>>,
    favouriteBtnDisplay: boolean,
    userItemsList: UserItemToSave[],
}

export default function Card(props: CardProps) {

    const [cardDisplay, setCardDisplay] = useState<boolean>(true);

    const handleAddToFavourite = () => {
        const userItem: UserItemToSave = {
            username: props.me, explanation: props.filteredNasaData.explanation,
            title: props.filteredNasaData.title, url: props.filteredNasaData.url
        }
        if (props.userItemsList.includes(userItem))
            console.log("you have this photo!")
        else {
            // userItem.username.push(props.me)
            props.addItem(props.me, props.filteredNasaData.explanation, props.filteredNasaData.title, props.filteredNasaData.url)
                .then(() => setCardDisplay(!cardDisplay))
            console.log("photo added")
        }
    }

    return <>
        <div className="cardContainer" style={{'display': `${cardDisplay ? 'inherit' : 'none'}`}}>
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
                                onClick={handleAddToFavourite}>
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

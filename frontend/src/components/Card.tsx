import "./Card.css";
import {FaShoppingCart} from "react-icons/fa";
import {MdDeleteForever, MdFavorite} from "react-icons/md";
import {AxiosResponse} from "axios";
import {UserItemType} from "../type/UserItemType";
import {useState} from "react";

type CardProps = {
    filteredNasaData: UserItemType,
    me: string,
    addItem: (username: string, explanation: string, title: string, url: string) => Promise<AxiosResponse<any>>,
    favouriteBtnDisplay: boolean,
    deleteItem: (id: string) => void,
    makeMockup: (imageUrl: string) => void,
}

export default function Card(props: CardProps) {

    const [cardDisplay, setCardDisplay] = useState<boolean>(true);

    const handleAddToFavourite = () => {
        props.addItem(props.me, props.filteredNasaData.explanation, props.filteredNasaData.title, props.filteredNasaData.url)
            .then(() => setCardDisplay(!cardDisplay))
    }

    return <>
        <div className="cardContainer" style={{'display': `${cardDisplay ? 'inherit' : 'none'}`}}>

            <h3 className="cardTitle">{props.filteredNasaData.title}</h3>

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
                        <button className="cardBtn cartBtn"
                                onClick={() => {
                                    props.makeMockup(props.filteredNasaData.url)
                                }}
                        >
                            <FaShoppingCart/>
                            <span className="btnHoverText">Move it to cart</span>
                        </button>
                        <button className="cardBtn deleteBtn"
                                style={{'display': `${!props.favouriteBtnDisplay ? 'inline' : 'none'}`}}
                                onClick={() => props.deleteItem(props.filteredNasaData.url)}
                        >
                            <MdDeleteForever/>
                            <span className="btnHoverText">Delete from favourite</span>
                        </button>
                    </div>
                    :
                    <></>
            }

        </div>
    </>
}

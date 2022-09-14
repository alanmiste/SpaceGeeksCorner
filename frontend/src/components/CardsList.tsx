import Card from "./Card";
import "./CardsList.css";
import {AxiosResponse} from "axios";
import {UserItemType} from "../type/UserItemType";
import EarthAndMoon from "./EarthAndMoon";

type CardsListProps = {
    filteredNasaData: UserItemType[],
    me: string,
    addItem: (username: string, explanation: string, title: string, url: string) => Promise<AxiosResponse<any, any>>,
    favouriteBtnDisplay: boolean,
    deleteItem: (id: string) => void,
    makeMockup: (imageUrl: string) => void,
}

export default function CardsList(props: CardsListProps) {
    return <div className={"cardList"}>
        {props.filteredNasaData.length === 0 ? <EarthAndMoon/> : props.filteredNasaData.map(card =>
            <Card key={card.url} filteredNasaData={card} me={props.me}
                  addItem={props.addItem} favouriteBtnDisplay={props.favouriteBtnDisplay}
                  deleteItem={props.deleteItem} makeMockup={props.makeMockup}/>
        )}
    </div>
}

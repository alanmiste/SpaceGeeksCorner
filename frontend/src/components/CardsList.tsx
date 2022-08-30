import Card from "./Card";
import "./CardsList.css";
import {AxiosResponse} from "axios";
import {UserItemToSave, UserItemType} from "../type/UserItemType";

type CardsListProps = {
    filteredNasaData: UserItemType[],
    me: string,
    addItem: (username: string, explanation: string, title: string, url: string) => Promise<AxiosResponse<any, any>>,
    favouriteBtnDisplay: boolean,
    userItemsList: UserItemToSave[],
}

export default function CardsList(props: CardsListProps) {
    return <div className={"cardList"}>
        {props.filteredNasaData.length === 0 ? <div className={"rocket"}></div> : props.filteredNasaData.map(card =>
            <Card key={card.url} filteredNasaData={card} me={props.me}
                  addItem={props.addItem} favouriteBtnDisplay={props.favouriteBtnDisplay}
                  userItemsList={props.userItemsList}/>
        )}
    </div>
}

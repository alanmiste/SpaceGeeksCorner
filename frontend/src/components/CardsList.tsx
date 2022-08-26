import {NasaResponseType} from "../type/NasaResponseType";
import Card from "./Card";
import "./CardsList.css";
import {AxiosResponse} from "axios";

type CardsListProps = {
    nasaApiDataList: NasaResponseType[],
    me: string,
    addItem: (explanation: string, title: string, url: string) => Promise<AxiosResponse<any, any>>,
}

export default function CardsList(props: CardsListProps) {
    return <div className={"cardList"}>
        {props.nasaApiDataList.length === 0 ? <div className={"rocket"}></div> : props.nasaApiDataList.map(card =>
            <Card key={card.url} nasaApiData={card} me={props.me} addItem={props.addItem}/>
        )}
    </div>
}

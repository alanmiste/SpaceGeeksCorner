import {NasaResponseType} from "../type/NasaResponseType";
import Card from "./Card";
import "./CardsList.css";

type CardsListProps = {
    nasaApiDataList: NasaResponseType[],
    me: string,
}

export default function CardsList(props: CardsListProps) {
    return <div className={"cardList"}>
        {props.nasaApiDataList.length === 0 ? <div className={"rocket"}></div> : props.nasaApiDataList.map(card =>
            <Card key={card.url} nasaApiData={card} me={props.me}/>
        )}
    </div>
}

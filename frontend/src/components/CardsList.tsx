import {NasaResponseType} from "../type/NasaResponseType";
import Card from "./Card";
import "./CardsList.css";

type CardsListProps = {
    nasaApiDataList: NasaResponseType[],
}

export default function CardsList(props: CardsListProps) {
    return <>
        {props.nasaApiDataList.length === 0 ? <div className={"rocket"}></div> : props.nasaApiDataList.map(card =>
            <Card nasaApiData={card}/>
        )}
    </>
}

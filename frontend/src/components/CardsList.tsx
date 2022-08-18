import {NasaResponseType} from "../type/NasaResponseType";
import Card from "./Card";

type CardsListProps = {
    nasaApiDataList: NasaResponseType[],
}

export default function CardsList(props: CardsListProps) {
    return <>
        {props.nasaApiDataList.map(card =>
            <Card nasaApiData={card}/>
        )}
    </>
}

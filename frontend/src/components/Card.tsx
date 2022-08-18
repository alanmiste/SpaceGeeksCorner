import {NasaResponseType} from "../type/NasaResponseType";

type CardProps = {
    nasaApiData: NasaResponseType,
}
export default function Card(props: CardProps) {
    return <>
        <h3>{props.nasaApiData.title}</h3>
        <p>{props.nasaApiData.explanation}</p>
    </>
}
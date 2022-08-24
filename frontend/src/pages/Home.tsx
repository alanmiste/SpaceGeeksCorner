import Header from "../components/Header";
import {NasaResponseType} from "../type/NasaResponseType";
import CardsList from "../components/CardsList";

type HomeProps = {
    sgcHook: {
        nasaApiData: NasaResponseType[],
    },
    me: string,
}
export default function Home(props: HomeProps) {
    return <>
        <Header me={props.me}/>
        <p>you are in Home</p>
        <CardsList nasaApiDataList={props.sgcHook.nasaApiData}/>
    </>
}

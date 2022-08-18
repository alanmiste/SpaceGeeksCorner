import Header from "../components/Header";
import {NasaResponseType} from "../type/NasaResponseType";
import CardsList from "../components/CardsList";

type HomeProps = {
    sgcHook: {
        nasaApiData: NasaResponseType[],
    }
}
export default function Home(props: HomeProps) {
    return <>
        <Header/>
        <p>you are in Home</p>
        <CardsList nasaApiDataList={props.sgcHook.nasaApiData}/>
    </>
}
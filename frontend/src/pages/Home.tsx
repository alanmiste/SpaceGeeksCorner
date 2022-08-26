import Header from "../components/Header";
import {NasaResponseType} from "../type/NasaResponseType";
import CardsList from "../components/CardsList";
import {AxiosResponse} from "axios";

type HomeProps = {
    sgcHook: {
        nasaApiData: NasaResponseType[],
    },
    me: string,
    addItem: (explanation: string, title: string, url: string) => Promise<AxiosResponse<any, any>>,
}
export default function Home(props: HomeProps) {
    return <>
        <Header me={props.me}/>
        <p>you are in Home</p>
        <CardsList nasaApiDataList={props.sgcHook.nasaApiData} me={props.me} addItem={props.addItem}/>
    </>
}

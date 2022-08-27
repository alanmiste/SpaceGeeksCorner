import Header from "../components/Header";
import CardsList from "../components/CardsList";
import {AxiosResponse} from "axios";
import {UserItemType} from "../type/UserItemType";

type HomeProps = {
    sgcHook: {
        filteredNasaData: UserItemType[],
    },
    me: string,
    addItem: (username: string, explanation: string, title: string, url: string) => Promise<AxiosResponse<any, any>>,
}
export default function Home(props: HomeProps) {
    return <>
        <Header me={props.me}/>
        <p>you are in Home</p>
        <CardsList filteredNasaData={props.sgcHook.filteredNasaData} me={props.me} addItem={props.addItem}/>
    </>
}

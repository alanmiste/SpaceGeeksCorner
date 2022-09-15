import Header from "../components/Header";
import CardsList from "../components/CardsList";
import {AxiosResponse} from "axios";
import {UserItemType} from "../type/UserItemType";
import Footer from "../components/Footer";

type HomeProps = {
    sgcHook: {
        filteredNasaData: UserItemType[],
    },
    me: string,
    addItem: (username: string, explanation: string, title: string, url: string) => Promise<AxiosResponse<any, any>>,
    favouriteBtnDisplay: boolean,
    deleteItem: (id: string) => void,
    makeMockup: (imageUrl: string) => void,
}
export default function Home(props: HomeProps) {
    return <>
        <Header me={props.me}/>
        <p>Hello World!</p>
        <CardsList filteredNasaData={props.sgcHook.filteredNasaData} me={props.me}
                   addItem={props.addItem} favouriteBtnDisplay={props.favouriteBtnDisplay}
                   deleteItem={props.deleteItem} makeMockup={props.makeMockup}/>
        <Footer/>
    </>
}

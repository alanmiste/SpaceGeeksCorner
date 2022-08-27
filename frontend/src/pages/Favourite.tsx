import Header from "../components/Header";
import CardsList from "../components/CardsList";
import {AxiosResponse} from "axios";
import {UserItemType} from "../type/UserItemType";

type FavouriteProps = {
    me: string,
    addItem: (explanation: string, title: string, url: string) => Promise<AxiosResponse<any, any>>,
    userItems: UserItemType[],
}
export default function Favourite(props: FavouriteProps) {
    return <>
        <Header me={props.me}/>
        <p>you are in Favourite</p>
        <CardsList filteredNasaData={props.userItems} me={props.me} addItem={props.addItem}/>
    </>
}

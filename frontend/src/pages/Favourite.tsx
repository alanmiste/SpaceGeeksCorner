import Header from "../components/Header";
import CardsList from "../components/CardsList";
import {AxiosResponse} from "axios";
import {SavedUserItemType} from "../type/UserItemType";

type FavouriteProps = {
    me: string,
    addItem: (username: string, explanation: string, title: string, url: string) => Promise<AxiosResponse<any, any>>,
    userItems: SavedUserItemType[],
    deleteItem: (id: string) => void,
}
export default function Favourite(props: FavouriteProps) {
    const filteredUserItems = props.userItems.filter(item => item.username === props.me)
    return <>
        <Header me={props.me}/>
        <p>you are in Favourite</p>
        <CardsList filteredNasaData={filteredUserItems} me={props.me}
                   addItem={props.addItem} favouriteBtnDisplay={false}
                   deleteItem={props.deleteItem}/>
    </>
}

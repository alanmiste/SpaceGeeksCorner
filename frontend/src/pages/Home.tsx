import Header from "../components/Header";
import CardsList from "../components/CardsList";
import {AxiosResponse} from "axios";
import {UserItemType} from "../type/UserItemType";
import Footer from "../components/Footer";
import "./Home.css";
import EarthAndMoon from "../components/EarthAndMoon";

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
        {props.sgcHook.filteredNasaData.length ?
            <CardsList filteredNasaData={props.sgcHook.filteredNasaData} me={props.me}
                       addItem={props.addItem} favouriteBtnDisplay={props.favouriteBtnDisplay}
                       deleteItem={props.deleteItem} makeMockup={props.makeMockup}/>
            :
            <div className="homeLoading">
                <EarthAndMoon/>
                <div className="homeInfo">
                    <p>Loading...</p>
                    <p>Every time you visit us you will find new photos, so we will be glad if you log in and save the
                        photos
                        you like to your favourites.<br/>The save button and other features will appear when you log in.
                    </p>
                </div>
            </div>
        }
        <Footer/>
    </>
}

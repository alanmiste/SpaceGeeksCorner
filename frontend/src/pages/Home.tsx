import Header from "../components/Header";
import {NasaResponseType} from "../type/NasaResponseType";

type HomeProps = {
    sgcHook: {
        nasaApiData: NasaResponseType[],
    }
}
export default function Home() {
    return <>
        <Header/>
        <p>you are in Home</p>
    </>
}
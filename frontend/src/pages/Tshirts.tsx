import Header from "../components/Header";
import ShowMockup from "../components/ShowMockup";
import MockupCardList from "../components/MockupCardList";
import {MockupResponse} from "../type/MockupResponse";
import "./Tshirts.css"
import Footer from "../components/Footer";
import {TshirtsType} from "../type/TshirtsType";

type TshirtsProps = {
    me: string,
    mockup: MockupResponse,
    mockupList: TshirtsType[],
    tshirtNumber: number,
    setTshirtNumber: (id: number) => void,
}
export default function Tshirts(props: TshirtsProps) {
    return <>
        <Header me={props.me}/>
        <div className="mockupContainer">
            <ShowMockup imageUrl={props.mockupList[props.tshirtNumber].mockupUrl}
                        placement={props.mockupList[props.tshirtNumber].placement}/>
            <MockupCardList mockupList={props.mockupList} setTshirtNumber={props.setTshirtNumber}/>
        </div>
        <Footer/>
    </>
}

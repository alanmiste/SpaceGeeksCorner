import Header from "../components/Header";
import ShowMockup from "../components/ShowMockup";
import MockupCardList from "../components/MockupCardList";
import {MockupResponse} from "../type/MockupResponse";
import "./Tshirts.css"
import Footer from "../components/Footer";

type TshirtsProps = {
    me: string,
    mockup: MockupResponse,
}
export default function Tshirts(props: TshirtsProps) {
    return <>
        <Header me={props.me}/>
        <div className="mockupContainer">
            <ShowMockup imageUrl={props.mockup.result.mockups[0].mockup_url}
                        placement={props.mockup.result.mockups[0].placement}/>
            <MockupCardList mockup={props.mockup}/>
        </div>
        <Footer/>
    </>
}

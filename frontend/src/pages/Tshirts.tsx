import Header from "../components/Header";
import ShowMockup from "../components/ShowMockup";
import MockupCardList from "../components/MockupCardList";

type TshirtsProps = {
    me: string,
}
export default function Tshirts(props: TshirtsProps) {
    return <>
        <Header me={props.me}/>
        <ShowMockup/>
        <MockupCardList/>
    </>
}

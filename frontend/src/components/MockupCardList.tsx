import MockupCard from "./MockupCard";
import {MockupResponse} from "../type/MockupResponse";

type MockupCardListProps = {
    mockup: MockupResponse,
}
export default function MockupCardList(props: MockupCardListProps) {
    return <span className="mockupCardListContainer">
        {props.mockup.result.mockups.map((item, key) =>
            <MockupCard imageUrl={item.mockup_url} imageAlt={item.placement} key={key}/>)}

    </span>
}
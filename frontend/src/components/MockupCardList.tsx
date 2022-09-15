import MockupCard from "./MockupCard";
import {TshirtsType} from "../type/TshirtsType";

type MockupCardListProps = {
    mockupList: TshirtsType[],
    setTshirtNumber: (id: number) => void,
}
export default function MockupCardList(props: MockupCardListProps) {
    return <span className="mockupCardListContainer">
        {props.mockupList.map((item, key) =>
            <MockupCard imageUrl={item.mockupUrl} imageAlt={item.placement} imageId={item.id}
                        setTshirtNumber={props.setTshirtNumber} key={key}/>)}

    </span>
}

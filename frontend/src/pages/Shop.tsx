import Header from "../components/Header";

type ShopProps = {
    me: string,
}
export default function Shop(props: ShopProps) {
    return <>
        <Header me={props.me}/>
        <p>you are in Shop</p>
    </>
}

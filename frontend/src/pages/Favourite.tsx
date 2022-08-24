import Header from "../components/Header";

type FavouriteProps = {
    me: string,
}
export default function Favourite(props: FavouriteProps) {
    return <>
        <Header me={props.me}/>
        <p>you are in Favourite</p>
    </>
}

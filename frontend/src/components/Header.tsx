import SgcNavBar from "./SgcNavBar";
import "./Header.css";

type HeaderProps = {
    me: string,
}
export default function Header(props: HeaderProps) {

    return (<header>
        <h1>Space Geeks Corner</h1>
        <SgcNavBar me={props.me}/>
    </header>)
}

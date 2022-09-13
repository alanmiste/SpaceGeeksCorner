import SgcNavBar from "./SgcNavBar";
import "./Header.css";

type HeaderProps = {
    me: string,
}
export default function Header(props: HeaderProps) {

    return (<header>
        <div className="titleAndLogo">
            <img className="logoImg" src="https://s5.gifyu.com/images/G-2c7d6bdbff81916c3.gif"
                 alt="Space Geeks Corner Logo"/>
            <h1>Space Geeks Corner</h1>
        </div>
        <SgcNavBar me={props.me}/>
    </header>)
}

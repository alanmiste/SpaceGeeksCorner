import SgcNavBar from "./SgcNavBar";
import "./Header.css";

type HeaderProps = {
    me: string,
}
export default function Header(props: HeaderProps) {
    return (<header>
        <div className="titleAndLogo">
            <img className="logoImg" src="https://raw.githubusercontent.com/alanmiste/plants/master/SGCLogoGIF.gif"
                 alt="Space Geeks Corner Logo"/>
            <h1>Space Geeks Corner</h1>
        </div>
        <SgcNavBar me={props.me}/>
    </header>)
}

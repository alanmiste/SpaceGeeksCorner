import SgcNavBar from "./SgcNavBar";
import "./Header.css";

type HeaderProps = {
    me: string,
}
export default function Header(props: HeaderProps) {
    return (<header>
        <div className="titleAndLogo">
            <img className="logoImg"
                 src="https://raw.githubusercontent.com/alanmiste/SpaceGeeksCorner/main/frontend/src/materials/SgcLogo.gif"
                 alt="Space Geeks Corner Logo"/>
            <h1 className="h1Animation"> Space Geeks Corner</h1>
        </div>
        <SgcNavBar me={props.me}/>
    </header>)
}

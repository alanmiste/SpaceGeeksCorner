import {NavLink} from "react-router-dom";
import {FaRegUserCircle, FaTshirt} from "react-icons/fa";
import {MdFavorite, MdHome} from "react-icons/md";
import {blue} from "@mui/material/colors";
import {Avatar} from "@mui/material";

type SgcNavBarProps = {
    me: string,
}
export default function SgcNavBar(props: SgcNavBarProps) {

    return <nav>
        {
            props.me === "anonymousUser" ?
                <nav>
                    <NavLink className="navLink" to={'/'}><MdHome/>. Home</NavLink>
                    <NavLink className="navLink" to={'/my-account'}><FaRegUserCircle/>. My Account</NavLink>
                </nav>
                :
                <nav>
                    <NavLink className="navLink" to={'/'}><MdHome/>. Home</NavLink>
                    <NavLink className="navLink" to={'/favourite'}><MdFavorite/>. Favourite</NavLink>
                    <NavLink className="navLink" to={'/t-shirt'}><FaTshirt/>. T-Shirts</NavLink>
                    <NavLink className="navLink" to={'/my-account'}><Avatar
                        sx={{fontSize: 15, width: 25, height: 25, bgcolor: blue[300]}}
                        alt={props.me}
                        src="/"
                    />. My Account</NavLink>
                </nav>
        }

    </nav>
}

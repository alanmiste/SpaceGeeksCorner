import {NavLink} from "react-router-dom";
import {FaRegUserCircle, FaShoppingCart} from "react-icons/fa";
import {MdFavorite, MdHome} from "react-icons/md";
import {blueGrey} from "@mui/material/colors";
import {Avatar} from "@mui/material";

type SgcNavBarProps = {
    me: string,
}
export default function SgcNavBar(props: SgcNavBarProps) {

    return <nav>
        {
            props.me === "anonymousUser" ?
                <nav>
                    <NavLink className="navLink home" to={'/'}><MdHome/>. Home</NavLink>
                    <NavLink className="navLink myaccount" to={'/myaccount'}><FaRegUserCircle/>. My Account</NavLink>
                </nav>
                :
                <nav>
                    <NavLink className="navLink home" to={'/'}><MdHome/>. Home</NavLink>
                    <NavLink className="navLink favourite" to={'/favourite'}><MdFavorite/>. Favourite</NavLink>
                    <NavLink className="navLink shop" to={'/shop'}><FaShoppingCart/>. Shop</NavLink>
                    <NavLink className="navLink myaccount" to={'/myaccount'}><Avatar
                        sx={{bgcolor: blueGrey[200]}}
                        alt={props.me}
                        src="/broken-image.jpg"
                    />. My Account</NavLink>
                </nav>
        }

    </nav>
}

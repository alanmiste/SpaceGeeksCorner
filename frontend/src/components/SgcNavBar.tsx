import {NavLink} from "react-router-dom";
import {FaRegUserCircle, FaShoppingCart} from "react-icons/fa";
import {MdFavorite, MdHome} from "react-icons/md";

type SgcNavBarProps = {
    me: string,
}
export default function SgcNavBar(props: SgcNavBarProps) {
    return <nav>
        {
            props.me === "anonymousUser" ?
                <>
                    <NavLink className="navLink home" to={'/'}><MdHome/>. Home</NavLink>
                    <NavLink className="navLink myaccount" to={'/myaccount'}><FaRegUserCircle/>. My Account</NavLink>
                </>
                :
                <>
                    <NavLink className="navLink home" to={'/'}><MdHome/>. Home</NavLink>
                    <NavLink className="navLink favourite" to={'/favourite'}><MdFavorite/>. Favourite</NavLink>
                    <NavLink className="navLink shop" to={'/shop'}><FaShoppingCart/>. Shop</NavLink>
                    <NavLink className="navLink myaccount" to={'/myaccount'}><FaRegUserCircle/>. My Account</NavLink>
                </>
        }

    </nav>
}

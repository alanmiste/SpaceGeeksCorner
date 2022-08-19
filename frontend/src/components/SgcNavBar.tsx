import {NavLink} from "react-router-dom";
import {GrCart, GrFavorite, GrHomeRounded, GrUser} from "react-icons/gr";

export default function SgcNavBar() {
    return <nav>
        <NavLink className="navLink" to={'/'}><GrHomeRounded/>. Home</NavLink>
        <NavLink className="navLink" to={'/favourite'}><GrFavorite/>. Favourite</NavLink>
        <NavLink className="navLink" to={'/shop'}><GrCart/>. Shop</NavLink>
        <NavLink className="navLink" to={'/myaccount'}><GrUser/>. My Account</NavLink>
    </nav>
}

import {NavLink} from "react-router-dom";

export default function SgcNavBar() {
    return <nav>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/favourite'}> Favourite</NavLink>
        <NavLink to={'/shop'}> Shop</NavLink>
        <NavLink to={'/myaccount'}> My Account</NavLink>
    </nav>
}

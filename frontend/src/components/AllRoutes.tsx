import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import useSgc from "./useSgc";
import Favourite from "../pages/Favourite";
import Shop from "../pages/Shop";
import MyAccount from "../pages/MyAccount";

export default function AllRoutes() {
    const sgcHook = useSgc()
    return (<>
        <Routes>
            <Route path={'/'} element={<Home sgcHook={sgcHook}/>}/>
            <Route path={'/favourite'} element={<Favourite/>}/>
            <Route path={'/shop'} element={<Shop/>}/>
            <Route path={'/myaccount'} element={<MyAccount/>}/>
        </Routes>
    </>)
}
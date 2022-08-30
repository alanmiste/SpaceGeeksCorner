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
            <Route path={'/'} element={<Home sgcHook={sgcHook}
                                             me={sgcHook.me}
                                             addItem={sgcHook.addItem}
                                             favouriteBtnDisplay={true}
                                             userItemsList={sgcHook.userItemsList}/>}/>
            <Route path={'/favourite'} element={<Favourite me={sgcHook.me}
                                                           addItem={sgcHook.addItem}
                                                           userItemsList={sgcHook.userItemsList}/>}/>
            <Route path={'/shop'} element={<Shop me={sgcHook.me}/>}/>
            <Route path={'/myaccount'} element={<MyAccount login={sgcHook.login}
                                                           logout={sgcHook.logout}
                                                           me={sgcHook.me}
            />}/>
        </Routes>
    </>)
}

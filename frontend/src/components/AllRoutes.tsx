import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import useSgc from "./useSgc";
import Favourite from "../pages/Favourite";
import Tshirts from "../pages/Tshirts";
import MyAccount from "../pages/MyAccount";

export default function AllRoutes() {
    const sgcHook = useSgc()
    return (<>
        <Routes>
            <Route path={'/'} element={<Home sgcHook={sgcHook}
                                             me={sgcHook.me}
                                             addItem={sgcHook.addItem}
                                             favouriteBtnDisplay={true}
                                             deleteItem={sgcHook.deleteItem}
                                             makeMockup={sgcHook.makeMockup}/>}/>
            <Route path={'/favourite'} element={<Favourite me={sgcHook.me}
                                                           addItem={sgcHook.addItem}
                                                           userItems={sgcHook.userItems}
                                                           deleteItem={sgcHook.deleteItem}
                                                           makeMockup={sgcHook.makeMockup}/>}/>
            <Route path={'/shop'} element={<Tshirts me={sgcHook.me} mockup={sgcHook.mockup}/>}/>
            <Route path={'/myaccount'} element={<MyAccount login={sgcHook.login}
                                                           logout={sgcHook.logout}
                                                           me={sgcHook.me}
                                                           usernames={sgcHook.usernames}
                                                           register={sgcHook.register}
            />}/>
        </Routes>
    </>)
}

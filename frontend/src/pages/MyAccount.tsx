import Header from "../components/Header";
import Registration from "../components/Registration";
import "./MyAccount.css"
import {Button} from "@mui/material";
import React from "react";
import {NewUserType} from "../type/NewUserType";
import Footer from "../components/Footer";
import DeleteUserDialog from "../components/DeleteUserDialog";

type MyAccountProps = {
    me: string,
    login: (username: string, password: string) => void,
    logout: () => void,
    usernames: string[],
    register: (newUser: NewUserType) => void,
    deleteUser: (username: string) => void,
}

export default function MyAccount(props: MyAccountProps) {
    return <>
        <Header me={props.me}/>
        <div className="myAccountContainer">
            {
                props.me === "anonymousUser" ?
                    <Registration
                        login={props.login}
                        logout={props.logout}
                        me={props.me}
                        usernames={props.usernames}
                        register={props.register}
                    />
                    : <div className="logout">
                        <Button type="submit" variant="outlined" fullWidth
                                className='btn' onClick={props.logout}>Logout</Button>
                        <DeleteUserDialog deleteUser={props.deleteUser} me={props.me} logout={props.logout}/>
                    </div>

            }
        </div>
        <Footer/>
    </>
}

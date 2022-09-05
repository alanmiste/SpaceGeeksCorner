import Header from "../components/Header";
import Registration from "../components/Registration";
import "./MyAccount.css"
import {Button} from "@mui/material";
import React from "react";

type MyAccountProps = {
    me: string,
    login: (username: string, password: string) => void,
    logout: () => void,
    usernames: string[],
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
                    />
                    : <div className="logout">
                        <Button type="submit" variant="outlined"
                                className='btn' onClick={props.logout}>Logout</Button>
                    </div>

            }
        </div>
    </>
}

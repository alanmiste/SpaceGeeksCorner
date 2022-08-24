import Header from "../components/Header";
import Registration from "../components/Registration";

type MyAccountProps = {
    me: string,
    login: () => void,
    logout: () => void,
    setUsername: (username: string) => void,
    setPassword: (password: string) => void,
}

export default function MyAccount(props: MyAccountProps) {
    return <>
        <Header me={props.me}/>
        <p>you are in My Account</p>
        {
            props.me !== "anonymousUser" ?
                <button onClick={props.logout}>Logout</button>
                :
                <Registration
                    login={props.login}
                    logout={props.logout}
                    me={props.me}
                    setPassword={props.setPassword}
                    setUsername={props.setUsername}/>
        }

    </>
}

// <div className={"rocket"}></div>
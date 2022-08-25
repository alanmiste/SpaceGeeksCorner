import Header from "../components/Header";
import Registration from "../components/Registration";

type MyAccountProps = {
    me: string,
    login: (username: string, password: string) => void,
    logout: () => void,
}

export default function MyAccount(props: MyAccountProps) {
    return <>
        <Header me={props.me}/>
        <p>you are in My Account</p>
        {
            props.me === "anonymousUser" ?
                <Registration
                    login={props.login}
                    logout={props.logout}
                    me={props.me}
                />
                : <button onClick={props.logout}>Logout</button>
        }

    </>
}

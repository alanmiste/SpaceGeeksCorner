import Header from "../components/Header";
import Registration from "../components/Registration";
import "./MyAccount.css"

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
                : <span>
                <button onClick={props.logout} className='btn block-cube block-cube-hover'
                        type='submit'>

                    <div className='bg-top'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg-right'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='text'>
                        Logout
                    </div>
                </button>
                </span>
        }
    </>
}

import "./Registration.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export default function Registration() {

    const [me, setMe] = useState<string>();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const fetchMe = () => {
        axios.get("/api/users/me")
            .then(response => response.data)
            .then(setMe)
    }

    useEffect(
        () => {
            fetchMe();
            axios.interceptors.response.use(response => response, error => {
                const status = error.response ? error.response.status : null;
                if (status === 401 && !error.config.auth) {
                    toast("Session timed out")
                    fetchMe()
                }
                return Promise.reject(error)
            })
        },
        []
    )

    const login = () => {
        axios.get("api/users/login", {auth: {username, password: password}})
            .then(response => response.data)
            .then(setMe)
            .catch(() => toast("Username or password is incorrect."))
    }

    const logout = () => {
        axios.get("api/users/logout")
            .then(response => response.data)
            .then(() => setMe("anonymousUser"))
    }

    return <>
        {
            me ? (
                    me === "anonymousUser" ?
                        <div className="login" id="loginContainer">
                            <form onSubmit={login} autoComplete='off' className='form'>
                                <div className='control'>
                                    <h3>
                                        Sign In
                                    </h3>
                                </div>
                                <div className='control block-cube block-input'>

                                    <input name='username'
                                           placeholder='Username'
                                           type='text'
                                           onChange={event => setUsername(event.target.value)}/>

                                    <div className='bg-top'>
                                        <div className='bg-inner'></div>
                                    </div>
                                    <div className='bg-right'>
                                        <div className='bg-inner'></div>
                                    </div>
                                    <div className='bg'>
                                        <div className='bg-inner'></div>
                                    </div>
                                </div>
                                <div className='control block-cube block-input'>

                                    <input name='password'
                                           placeholder='Password'
                                           type='password'
                                           onChange={event => setPassword(event.target.value)}/>

                                    <div className='bg-top'>
                                        <div className='bg-inner'></div>
                                    </div>
                                    <div className='bg-right'>
                                        <div className='bg-inner'></div>
                                    </div>
                                    <div className='bg'>
                                        <div className='bg-inner'></div>
                                    </div>
                                </div>

                                <button
                                    onClick={login}
                                    className='btn block-cube block-cube-hover'
                                    type='button'>

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
                                        Log In
                                    </div>
                                </button>

                            </form>
                        </div>
                        : <button onClick={logout}>Logout!</button>
                )
                : <div className={"rocket"}></div>
        }
    </>
}


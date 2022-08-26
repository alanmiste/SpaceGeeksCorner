import "./Registration.css";
import {FormEvent, useState} from "react";

type RegistrationProps = {
    me: string,
    login: (username: string, password: string) => void,
    logout: () => void,
}
export default function Registration(props: RegistrationProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        props.login(username, password)
    }
    return <>
        <div className="login">
            <form onSubmit={onSubmit} autoComplete='off' className='form'>
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
                    className='btn block-cube block-cube-hover'
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
                        Log In
                    </div>
                </button>
            </form>
        </div>
    </>
}

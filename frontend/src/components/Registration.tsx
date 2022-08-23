import "./Registration.css";
import {useState} from "react";
import axios from "axios";

export default function Registration() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const hideAndShow = () => {
        const el = document.getElementById('loginContainer');

        if (el != null) {
            el.addEventListener('click', function handleClick() {
                if (el.style.display === 'none') {
                    // ✅ Shows element if hidden
                    el.style.display = 'block';

                    el.textContent = 'Hide element';
                } else {
                    // ✅ Hides element if shown
                    el.style.display = 'none';

                    el.textContent = 'Show element';
                }
            });
        }
    }

    const login = () => {
        axios.get("api/users", {auth: {username, password: password}})
            .then(response => response.data)
            .then(() => console.log("from login"))
            .then(hideAndShow)
    }
    return <>
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

    </>
}

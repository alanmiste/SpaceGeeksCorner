import "./Registration.css";

type RegistrationProps = {
    me: string,
    login: () => void,
    logout: () => void,
    setUsername: (username: string) => void,
    setPassword: (password: string) => void,
}
export default function Registration(props: RegistrationProps) {

    return <>
        <div className="login">
            <form onSubmit={props.login} autoComplete='off' className='form'>
                <div className='control'>
                    <h3>
                        Sign In
                    </h3>
                </div>
                <div className='control block-cube block-input'>

                    <input name='username'
                           placeholder='Username'
                           type='text'
                           onChange={event => props.setUsername(event.target.value)}/>

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
                           onChange={event => props.setPassword(event.target.value)}/>

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


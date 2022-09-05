import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import * as React from "react";
import {FormEvent, useState} from "react";

type SignUpProps = {
    usernames: string[],
}

export default function SignUp(props: SignUpProps) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // props.login(username, password)
    }

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const validateUsername = (username: string) => {
        const regex = /^[a-z][a-z0-9_]{3,20}$/gi;
        return regex.test(username);
    }

    const [usernameValidationText, setUsernameValidationText] = useState('');
    const [spanColor, setSpanColor] = useState('red');

    const handleUsernameChange = () => {

        const result = validateUsername(username);
        if (result) {
            if (!props.usernames.includes(username)) {
                setSpanColor('green')
                setUsernameValidationText('username is available')
            } else {
                setSpanColor('red')
                setUsernameValidationText('username is unavailable')
            }
        } else {
            setSpanColor('red')
            setUsernameValidationText('Invalid username. only [a-z0-9_] min-max 5-20');
        }
    }

    return <>
        <form onSubmit={onSubmit} autoComplete='off' className='form'>

            <h3>Sign Up</h3>
            <span>
                <label>Enter a unique username: </label>
            <TextField className='formItem' fullWidth id="outlined-basic" label="New Username" variant="outlined"
                       onChange={event => {
                           setUsername(event.target.value)
                           handleUsernameChange()
                       }}/>
                <span style={{display: "block", color: spanColor}}>{usernameValidationText}</span>
            </span>

            <span>
                <label>Enter new password: </label>
            <FormControl fullWidth variant="outlined" className='formItem'>
                <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                <OutlinedInput type={showPassword ? 'text' : 'password'} id="outlined-basic"
                               label="New Password"
                               onChange={event => setPassword(event.target.value)}
                               endAdornment={
                                   <InputAdornment position="end">
                                       <IconButton
                                           aria-label="toggle password visibility"
                                           onClick={handleClickShowPassword}
                                           onMouseDown={handleMouseDownPassword}
                                           edge="end"
                                       >
                                           {showPassword ? <VisibilityOff/> : <Visibility/>}
                                       </IconButton>
                                   </InputAdornment>
                               }/>
            </FormControl>
            <FormControl fullWidth variant="outlined" className='formItem'>
                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                <OutlinedInput type={showPassword ? 'text' : 'password'} id="outlined-basic"
                               label="Confirm Password"
                               onChange={event => setPassword(event.target.value)}
                               endAdornment={
                                   <InputAdornment position="end">
                                       <IconButton
                                           aria-label="toggle password visibility"
                                           onClick={handleClickShowPassword}
                                           onMouseDown={handleMouseDownPassword}
                                           edge="end"
                                       >
                                           {showPassword ? <VisibilityOff/> : <Visibility/>}
                                       </IconButton>
                                   </InputAdornment>
                               }/>
            </FormControl>
            </span>

            <Button fullWidth type="submit" variant="outlined" className='formItem'>Sign up now</Button>
        </form>
    </>;
}
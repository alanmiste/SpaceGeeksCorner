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

    const [usernameValidationText, setUsernameValidationText] = useState('');
    const [usernameCheckTextColor, setUsernameCheckTextColor] = useState('red');

    const [passwordValidationText, setPasswordValidationText] = useState('');
    const [passwordCheckTextColor, setPasswordCheckTextColor] = useState('red');

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

    const validateUsername = (usernameToCheck: string) => {
        const usernameRegex = /^[a-z][a-z0-9_]{3,20}$/gi;
        return usernameRegex.test(usernameToCheck);
    }


    const validatePassword = (passwordToCheck: string) => {
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,20}$/;
        return passwordRegex.test(passwordToCheck)
    }

    return <>
        <form onSubmit={onSubmit} autoComplete='off' className='form'>
            <h3>Sign Up</h3>
            <span>
                <label>Enter a unique username with a minimum of 4 characters: </label>
                <TextField className='formItem' fullWidth id="outlined-basic" label="New Username" variant="outlined"
                           onChange={event => {
                               if (validateUsername(event.target.value) && !props.usernames.includes(event.target.value)) {
                                   setUsernameCheckTextColor('green')
                                   setUsername(event.target.value)
                                   setUsernameValidationText(event.target.value + ' is available')
                               } else {
                                   setUsernameCheckTextColor('red')
                                   if (props.usernames.includes(event.target.value))
                                       setUsernameValidationText('Username is unavailable.');
                                   else setUsernameValidationText('Invalid username. only [a-z0-9_] min-max 5-20');
                               }
                           }}/>
                <span style={{display: "block", color: usernameCheckTextColor}}>{usernameValidationText}</span>
            </span>

            <span>
                <label>Enter new password: </label>
            <FormControl fullWidth variant="outlined" className='formItem'>
                <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                <OutlinedInput type={showPassword ? 'text' : 'password'} id="outlined-basic"
                               label="New Password"
                               onChange={event => {
                                   setPassword(event.target.value)
                                   if (validatePassword(event.target.value)) {
                                       setPasswordCheckTextColor('green')
                                       setPassword(event.target.value)
                                       setPasswordValidationText('Password is good!')
                                   } else {
                                       setPasswordCheckTextColor('red')
                                       setPasswordValidationText('Invalid password. only [a-z, A-Z, 0-9, !@#$%^&*] min-max 7-20');
                                   }
                               }}
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
                                <span style={{
                                    display: "block",
                                    color: passwordCheckTextColor
                                }}>{passwordValidationText}</span>

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
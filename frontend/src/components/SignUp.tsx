import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import * as React from "react";
import {FormEvent, useState} from "react";
import "./SignUp.css";
import {toast} from "react-toastify";
import {NewUserType} from "../type/NewUserType";

type SignUpProps = {
    usernames: string[],
    register: (newUser: NewUserType) => void,
}

export default function SignUp(props: SignUpProps) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [usernameValidationText, setUsernameValidationText] = useState('');
    const [usernameCheckTextColor, setUsernameCheckTextColor] = useState('red');

    const [passwordValidationText, setPasswordValidationText] = useState('');
    const [passwordCheckTextColor, setPasswordCheckTextColor] = useState('red');

    const [confirmPasswordText, setConfirmPasswordText] = useState('');
    const [confirmPasswordTextColor, setConfirmPasswordTextColor] = useState('red');

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (username !== '' &&
            password !== '' &&
            password === confirmPassword) {
            props.register({username, password})
        } else toast.error('Please check the Username and Password!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
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

    const handleUsernameChange = (e: any) => {
        setUsername('')
        if (validateUsername(e.target.value) && !props.usernames.includes(e.target.value)) {
            setUsernameCheckTextColor('green')
            setUsername(e.target.value)
            setUsernameValidationText(e.target.value + ' is available')
        } else {
            setUsernameCheckTextColor('red')
            if (props.usernames.includes(e.target.value))
                setUsernameValidationText('Username is unavailable.');
            else setUsernameValidationText('Invalid username. only [a-z0-9_] min-max 4-20');
        }
    }


    const validatePassword = (passwordToCheck: string) => {
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,20}$/;
        return passwordRegex.test(passwordToCheck)
    }

    const handlePasswordChange = (e: any) => {
        setPassword('')
        if (confirmPassword) {
            setConfirmPasswordTextColor('red')
            setConfirmPasswordText('Passwords don\'t match!')
        }
        if (validatePassword(e.target.value)) {
            setPasswordCheckTextColor('green')
            setPasswordValidationText('Password is good!')
            setPassword(e.target.value)
        } else {
            setPasswordCheckTextColor('red')
            setPasswordValidationText('Invalid password. only [a-z, A-Z, 0-9, !@#$%^&*] min-max 7-20');
        }
    }

    const handleConfirmPassword = (e: any) => {
        setConfirmPassword('')
        if (password !== '') {
            if (e.target.value === password) {
                setConfirmPasswordTextColor('green')
                setConfirmPasswordText('Passwords match.')
                setConfirmPassword(e.target.value)
            } else {
                setConfirmPasswordTextColor('red')
                setConfirmPasswordText('Passwords don\'t match!')
                setConfirmPassword('')
            }
        } else {
            setConfirmPasswordTextColor('red')
            setConfirmPasswordText('Please enter new password first!')
        }
    }

    return <>
        <form onSubmit={onSubmit} autoComplete='off' className='form'>
            <h3>Sign Up</h3>
            <label className="labelText">Enter a username :
                <span className="infoBtn">
                    <InfoOutlinedIcon/>
                    <span className="infoSpan">
                    Minimum requirements: <br/>4 characters: a-z.<br/>Start with character.<br/>NO symbol.</span>
                </span>
            </label>
            <TextField className='formItem' fullWidth id="outlined-basic" label="New Username" variant="outlined"
                       onChange={handleUsernameChange}/>
            <span style={{display: "block", color: usernameCheckTextColor}}>{usernameValidationText}</span>


            <label className="labelText">Enter a password :
                <span className="infoBtn">
                    <InfoOutlinedIcon/>
                    <span className="infoSpan">
                    Minimum requirements: <br/>7 characters: a-z.<br/>One number: 0-9.<br/>One symbol: !@#$%^&*</span>
                </span>
            </label>
            <FormControl fullWidth variant="outlined" className='formItem'>
                <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                <OutlinedInput type={showPassword ? 'text' : 'password'} id="outlined-basic"
                               label="New Password"
                               onChange={handlePasswordChange}
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
                               onChange={handleConfirmPassword}
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
                    color: confirmPasswordTextColor
                }}>{confirmPasswordText}</span>
            </FormControl>


            <Button fullWidth type="submit" variant="outlined" className='formItem'>Sign up now</Button>
        </form>
    </>;
}

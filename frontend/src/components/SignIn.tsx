import * as React from 'react';
import {FormEvent, useState} from 'react';
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

type SignInProps = {
    me: string,
    login: (username: string, password: string) => void,
    logout: () => void,
}

export default function SignIn(props: SignInProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        props.login(username, password)
    }

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return <>
        <form onSubmit={onSubmit} autoComplete='off' className='form'>

            <h3>Sign In</h3>

            <TextField className='formItem' fullWidth id="outlined-basic4" label="Username" variant="outlined"
                       onChange={event => setUsername(event.target.value)}/>

            <FormControl fullWidth variant="outlined" className='formItem'>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput type={showPassword ? 'text' : 'password'} id="outlined-basic5"
                               label="Password"
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

            <Button fullWidth type="submit" variant="outlined" className='formItem'>Log In</Button>
        </form>
    </>;
}

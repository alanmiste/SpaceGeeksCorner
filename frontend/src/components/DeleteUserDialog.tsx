import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type DeleteUserProps = {
    me: string,
    deleteUser: (username: string) => void,
    logout: () => void,
}

export default function DeleteUserDialog(props: DeleteUserProps) {
    const [open, setOpen] = React.useState(false);
    const [sureText, setSureText] = useState<string>("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        if (sureText === "I am sure") {
            console.log(sureText)
            props.deleteUser(props.me)
            setOpen(false)
            props.logout()
        } else {
            props.deleteUser("")
        }
    };

    return (
        <div>
            <Button variant="outlined" color="error" onClick={handleClickOpen}>
                Delete My Account
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete your account?<br/>
                        If your are sure please type: <strong>I am sure</strong>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter the TEXT here"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={event => setSureText(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color="error" onClick={handleDelete}>Yes, I'm sure!</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {Badge} from "@mui/material";
import {SavedMockupResponse} from "../type/SavedMockupResponse";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {red} from "@mui/material/colors";

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
    savedMockupList: SavedMockupResponse,
    deleteMockup: (key: number) => void,
}

function SimpleDialog(props: SimpleDialogProps) {
    const {onClose, open} = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Saved Items:</DialogTitle>
            <List sx={{pt: 0}}>
                {props.savedMockupList.tshirtList.map((item, key) => (
                    <ListItem key={key}>
                        <ListItemAvatar>
                            <Avatar>
                                <img src={item.mockupUrl} alt={item.placement}/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.placement + ' - Size: ' + item.size + ' - Color: ' + item.color}/>
                        <Button onClick={() => props.deleteMockup(key)}>
                            <DeleteForeverIcon onClick={() => props.deleteMockup(key)} sx={{color: red[600]}}/>
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

type SavedItemDialogProps = {
    savedMockupList: SavedMockupResponse,
    mockupListLength: number,
    deleteMockup: (key: number) => void,
}
export default function SavedItemDialog(props: SavedItemDialogProps) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            <Badge badgeContent={props.mockupListLength} sx={{pr: 0}} color="primary">

                <Button variant="outlined" onClick={handleClickOpen}>
                    Saved Items
                </Button>
            </Badge>
            <SimpleDialog
                open={open}
                onClose={handleClose}
                savedMockupList={props.savedMockupList}
                deleteMockup={props.deleteMockup}
            />
        </div>
    );
}

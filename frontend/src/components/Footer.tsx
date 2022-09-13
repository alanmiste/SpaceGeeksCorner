import TwitterIcon from '@mui/icons-material/Twitter';
import "./Footer.css";
import {blue} from "@mui/material/colors";

export default function Footer() {
    return <footer>
        <TwitterIcon sx={{color: blue[300], pl: 2}}/>
        <span>Space Geeks Corner</span>
    </footer>
}

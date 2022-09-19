import TwitterIcon from '@mui/icons-material/Twitter';
import "./Footer.css";
import {blue} from "@mui/material/colors";

export default function Footer() {
    return <footer>
        <a href="https://twitter.com/SpaceGeeks7" target="_blank" className="footerLink">
            <TwitterIcon sx={{color: blue[300], pl: 2}}/> @SpaceGeeks7
        </a>
        <span>Space Geeks Corner</span>
    </footer>
}

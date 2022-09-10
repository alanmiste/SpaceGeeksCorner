import "./MockupCard.css";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    createTheme,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import {useState} from "react";

export default function MockupCard() {

    const [size, setSize] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSize(event.target.value);
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            secondary: {
                main: '#000',
            },
        },
    });

    const [color, setColor] = useState('white');

    const handleColorChange = (
        event: React.MouseEvent<HTMLElement>,
        newColor: string,
    ) => {
        setColor(newColor);
    };

    return <div className="CardContainer">

        <Card sx={{maxWidth: 400}}>
            <CardMedia
                component="img"
                height="auto"
                image="https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg"
                alt="Front Mockup"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Black- Front
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    The Unisex Staple T-Shirt feels soft and light with just the right amount of stretch. It's
                    comfortable and flattering for all. We can't compliment this shirt enough–it's one of our crowd
                    favorites, and it's sure to be your next favorite too!
                </Typography>
            </CardContent>
            <CardActions>
                <FormControl required sx={{m: 1, minWidth: 80}}>
                    <InputLabel id="demo-simple-select-required-label">Size</InputLabel>
                    <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={size}
                        label="Size *"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'XS'}>XS</MenuItem>
                        <MenuItem value={'S'}>S</MenuItem>
                        <MenuItem value={'M'}>M</MenuItem>
                        <MenuItem value={'L'}>L</MenuItem>
                        <MenuItem value={'XL'}>XL</MenuItem>
                    </Select>
                </FormControl>

                <ToggleButtonGroup
                    color="primary"
                    value={color}
                    exclusive
                    onChange={handleColorChange}
                    aria-label="Platform"
                >
                    <label>Select color: </label>
                    <ToggleButton value="white" sx={{bgcolor: theme.palette.primary.main}}> </ToggleButton>
                    <ToggleButton value="black" sx={{bgcolor: theme.palette.secondary.main}}> </ToggleButton>
                </ToggleButtonGroup>

                <Button size="small">Share</Button>
            </CardActions>
        </Card>
    </div>
}
import "./ShowMockup.css";
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useState} from "react";

export default function ShowMockup() {

    const [size, setSize] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSize(event.target.value);
    };


    const [color, setColor] = useState('black');
    const [colorChecked, setColorChecked] = useState(false);

    const handleColorChange = () => {
        setColorChecked(!colorChecked);
        setColor(colorChecked ? 'black' : 'white')
    };

    return <div className="showMockupContainer">
        <img className="showMockupBigImage"
             src={"https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg"}
             alt={"Front Mockup"}/>
        <div className="showMockupDetails">
            <p>The Unisex Staple T-Shirt feels soft and light with just the right amount of stretch. It's comfortable
                and flattering for all. We can't compliment this shirt enough–it's one of our crowd favorites, and it's
                sure to be your next favorite too!
            </p>
            <div className="selectThings">
                <label className="showMockupLabelText">Select size:</label>
                <FormControl required>
                    <InputLabel id="demo-simple-select-required-label"
                    >Size</InputLabel>
                    <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={size}
                        label="Size *"
                        onChange={handleChange}
                        sx={{minWidth: 90, height: 50}}
                    >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'XS'}>XS</MenuItem>
                        <MenuItem value={'S'}>S</MenuItem>
                        <MenuItem value={'M'}>M</MenuItem>
                        <MenuItem value={'L'}>L</MenuItem>
                        <MenuItem value={'XL'}>XL</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="showMockupSelectColor">
                <label className="showMockupLabelText">Select color: </label>
                <input checked={colorChecked} type="radio" onChange={handleColorChange} value="white"
                       className="radioWhiteBtn radioBtn"/>
                <input checked={!colorChecked} type="radio" onChange={handleColorChange} value="black"
                       className="radioBlackBtn radioBtn"/>
            </div>
            <Button size="small" onClick={() => console.log(color, size)}>Share</Button>
        </div>
    </div>
}
import "./ShowMockup.css";
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useState} from "react";
import {TshirtToSave} from "../type/TshirtToSave";
import {toast} from "react-toastify";
import SavedItemDialog from "./SavedItemDialog";
import {SavedMockupResponse} from "../type/SavedMockupResponse";

type ShowMockupProps = {
    imageUrl: string,
    placement: string,
    me: string,
    saveMockup: (username: string, tshirtToSave: TshirtToSave) => void,
    savedMockupList: SavedMockupResponse,
    mockupListLength: number,
    setMockupListLength: (number: number) => void,
    deleteMockup: (key: number) => void,
}

export default function ShowMockup(props: ShowMockupProps) {

    const [tshirtSize, setTshirtSize] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setTshirtSize(event.target.value);
    };

    const [tshirtColor, setTshirtColor] = useState('black');
    const [colorChecked, setColorChecked] = useState(false);

    const handleColorChange = () => {
        setColorChecked(!colorChecked);
        setTshirtColor(colorChecked ? 'black' : 'white')
    };

    const addToCart = () => {
        if (tshirtSize && tshirtColor) {
            props.saveMockup(props.me, {
                color: tshirtColor,
                size: tshirtSize,
                mockupUrl: props.imageUrl,
                placement: props.placement
            })
            toast.success('Item saved successfully!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            })
        } else {
            toast.warn('Please select Size and Color.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            })
        }
    }

    return <div className="showMockupContainer">
        <img className="showMockupBigImage"
             src={props.imageUrl}
             alt={props.placement + "view of the shirt"}/>
        <div className="showMockupDetails">
            <SavedItemDialog savedMockupList={props.savedMockupList}
                             mockupListLength={props.mockupListLength}
                             deleteMockup={props.deleteMockup}/>
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
                        value={tshirtSize}
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
            <Button size="small" onClick={() => {
                addToCart()
            }}>Add to Cart</Button>
        </div>
    </div>
}

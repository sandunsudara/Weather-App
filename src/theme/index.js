import paletteLight from "./palette/paletteLight.js";
import paletteDark from "./palette/paletteDark.js";
import {createTheme} from "@mui/material";

const getTheme = (mode = 'light') => {
    const palette = mode === 'light' ? paletteLight : paletteDark;
    return createTheme({palette})
}


export default getTheme
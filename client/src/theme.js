import 'typeface-roboto';
import 'typeface-open-sans';
import { purple, blue, grey, indigo, blueGrey } from '@mui/material/colors';

import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, "Open Sans", sans-serif',
        fontSize: 16
    },
    palette: {
        primary: blue,
        secondary: grey
    },
});

export default theme;
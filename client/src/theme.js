import 'typeface-roboto';
import 'typeface-open-sans';
import { blue } from '@mui/material/colors';

import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, "Open Sans", sans-serif',
        fontSize: 16
    },
    palette: {
        primary: blue,
        secondary: {
            main: '#f6f1f1'
        }
    },
});

export default theme;
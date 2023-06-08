import { useState } from 'react';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from "@mui/icons-material/Search";


const SearchBar = () => {
    const [searchLine, setsearchLine] = useState('');
    const [focused, setFocused] = useState(false);

    const onClick = () => {
        if (searchLine) {

        }
    };

    return (
        <Container>
            <TextField
                name="search"
                label={focused || searchLine ? '' : 'Search'}
                value={searchLine}
                onChange={e => setsearchLine(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                sx={{ width: '20rem', mt: '1rem', color: 'primary.main', backgroundColor: 'secondary.main', borderRadius: '0.5rem', overflow: 'hidden'}}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {searchLine && (
                                <IconButton onClick={() => setsearchLine('')}>
                                    <ClearIcon />
                                </IconButton>
                            )}
                            <IconButton onClick={onClick}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                InputLabelProps={{
                    shrink: false
                }}
            />
        </Container>
    );
}

export default SearchBar;
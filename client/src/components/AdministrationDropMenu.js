import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';


const AdministrationDropMenu = () => {
    const [anchor, setAnchor] = useState(null);

    const onClick = e => {
        setAnchor(e.currentTarget);
    };

    const onClose = () => {
        setAnchor(null);
    };

    return (
        <Container>
            <Button onClick={onClick} color="inherit" variant='button'>Administration</Button>
            <Menu
                anchorEl={anchor}
                open={!!anchor}
                onClose={onClose}
                dense="true"
            >
                <MenuList dense={true} style={{ minWidth: '9rem' }}>
                    <ListItemButton key='Product categories' onClick={onClose} component={Link} to={`/productTypes`}>
                        <ListItemText primary={'Product categories'} />
                    </ListItemButton>
                </MenuList>
            </Menu>
        </Container>
    );
};

export default AdministrationDropMenu;
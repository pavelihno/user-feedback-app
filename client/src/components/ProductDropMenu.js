import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

import { fetchProductTypes } from '../redux/actions/productType';


const ProductDropMenu = () => {
    const dispatch = useDispatch();
    const [anchor, setAnchor] = useState(null);
    const productTypes = useSelector(state => state.productType.productTypes);
    const isLoading = useSelector(state => state.productType.isLoading);

    useEffect(() => { dispatch(fetchProductTypes()) }, [dispatch]);

    const onClick = e => {
        setAnchor(e.currentTarget);
    };

    const onClose = () => {
        setAnchor(null);
    };

    return (
        <Container>
            <Button component={Link} onClick={onClick} color="inherit" variant='button'>Products</Button>
            <Menu
                anchorEl={anchor}
                open={!!anchor}
                onClose={onClose}
                dense="true"
            >
                <MenuList dense={true} style={{ minWidth: '7rem' }}>
                    {isLoading ? (
                        <MenuItem>
                            <Skeleton animation='wave' style={{ width: '100%' }} />
                        </MenuItem>
                    ) : (
                        productTypes.map((type) => (
                            <ListItemButton key={type._id} onClick={onClose} component={Link} to={`/productTypes/${type._id}`}>
                                <ListItemText primary={type.name} />
                            </ListItemButton>
                        ))
                    )}
                    <ListItemButton key='More' onClick={onClose} component={Link} to={`/productTypes`}>
                        <ListItemText primary={'More'} />
                    </ListItemButton>
                </MenuList>
            </Menu>
        </Container>
    );
};

export default ProductDropMenu;
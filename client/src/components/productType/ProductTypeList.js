import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


import Base from '../Base';
import ProductTypeListItem from './ProductTypeListItem';
import { fetchProductTypes } from '../../redux/actions/productType';


const ProductTypeList = () => {
    const dispatch = useDispatch();
    const productTypes = useSelector(state => state.productType.productTypes);
    const isLoading = useSelector(state => state.productType.isLoading);

    useEffect(() => { dispatch(fetchProductTypes()) }, [dispatch]);

    return (
        <Base>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper elevation={2} style={{ padding: '1rem' }}>
                    <Grid container>
                        <Grid item>
                            <Typography component="h1" variant="h5" align="center" sx={{ textDecoration: 'underline', mb: '1rem' }}>
                                Product categories
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton component={Link} to={`/productTypes/new`} variant="contained">
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: '1.5rem' }}>
                        {productTypes.map((productType, index) => (
                            <ProductTypeListItem
                                key={productType._id}
                                productType={productType}
                                onClick={(event) => handleListItemClick(event, index)}
                            />
                        ))}
                    </Grid>
                </Paper>
            </Container>
        </Base >
    );
};

export default ProductTypeList;
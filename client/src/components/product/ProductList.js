import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Base from '../Base';
import ProductListItem from './ProductListItem';
import { fetchProducts } from '../../redux/actions/product';
import { fullWidthStyle } from '../../redux/utils';
import { fetchProductType } from '../../redux/actions/productType';
import { selectIsAuth } from '../../redux/reducers/auth';


const ProductList = () => {
    const dispatch = useDispatch();
    const { id: productTypeId } = useParams();
    const productType = useSelector(state => state.productType.productType);
    const products = useSelector(state => state.product.products);
    const isLoading = useSelector(state => state.product.isLoading);

    const isAuth = useSelector(selectIsAuth);

    useEffect(() => {
        dispatch(fetchProductType(productTypeId));
    }, [dispatch, productTypeId]);

    useEffect(() => { dispatch(fetchProducts(productTypeId)) }, [dispatch, productTypeId]);

    return (
        <Base>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Paper elevation={2} style={{ padding: '1rem' }}>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Typography component="h1" variant="h5" sx={{ textDecoration: 'underline', mb: '1rem' }}>
                                {productType?.name}
                            </Typography>
                        </Grid>
                        {
                            isAuth && (
                                <Grid item>
                                    <IconButton title="Create new product" component={Link} to={`/products/${productTypeId}/new`} variant="contained">
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                </Grid>
                            )
                        }
                    </Grid>
                    <Grid container sx={{ marginTop: '1.5rem' }} spacing={5} maxWidth="md">
                        {!isLoading ? (products.map((product, index) => (
                            <ProductListItem
                                key={product._id}
                                product={product}
                            />
                        ))) : (Array.from({ length: 4 }).map((_, index) => (
                            <Grid item maxWidth="md" key={index} style={{ minWidth: '13rem' }}>
                                <Card style={fullWidthStyle}><Skeleton variant="rounded" style={{ ...fullWidthStyle, minHeight: '10rem' }} /></Card>
                            </Grid>
                        )))}
                    </Grid>
                </Paper>
            </Container>
        </Base >
    );
};

export default ProductList;
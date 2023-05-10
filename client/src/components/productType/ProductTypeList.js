import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
import ProductTypeListItem from './ProductTypeListItem';
import { selectIsAuth, selectIsAdmin } from '../../redux/reducers/auth';
import { fetchProductTypes } from '../../redux/actions/productType';
import { fullWidthStyle } from '../../redux/utils';


const ProductTypeList = () => {
    const dispatch = useDispatch();
    const productTypes = useSelector(state => state.productType.productTypes);
    const isLoading = useSelector(state => state.productType.isLoading);

    const isAdmin = useSelector(selectIsAdmin);

    useEffect(() => { dispatch(fetchProductTypes()) }, [dispatch]);

    return (
        <Base>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Paper elevation={2} style={{ padding: '1rem' }}>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Typography component="h1" variant="h5" sx={{ textDecoration: 'underline', mb: '1rem' }}>
                                Product categories
                            </Typography>
                        </Grid>
                        {
                            isAdmin && (
                                <Grid item>
                                    <IconButton title="Create new product category" component={Link} to={`/productTypes/new`} variant="contained">
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                </Grid>
                            )
                        }
                    </Grid>
                    <Grid container sx={{ marginTop: '1.5rem' }} spacing={5} maxWidth="md">
                        {!isLoading ? (productTypes.map((productType, index) => (
                            <ProductTypeListItem
                                key={productType._id}
                                productType={productType}
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

export default ProductTypeList;
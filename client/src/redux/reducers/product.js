import { createSlice } from '@reduxjs/toolkit';

import { fetchProducts, fetchProduct } from '../actions/product';


const initialState = {
    product: null,
    products: [],
    isLoading: false,
    errors: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, state => {
                state.errors = null;
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.errors = action.error.message;
                state.isLoading = false;
            })
            .addCase(fetchProduct.pending, state => {
                state.errors = null;
                state.isLoading = true;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.product = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.errors = action.error.message;
                state.isLoading = false;
            });
    }
});
export default productSlice.reducer;
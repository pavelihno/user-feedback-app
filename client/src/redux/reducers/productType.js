import { createSlice } from '@reduxjs/toolkit';

import { fetchProductTypes } from '../actions/productType';


const initialState = {
    productTypes: [],
    isLoading: false,
    errors: null,
};

const productTypeSlice = createSlice({
    name: 'productTypes',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProductTypes.pending, state => {
                state.errors = null;
                state.isLoading = true; 
            })
            .addCase(fetchProductTypes.fulfilled, (state, action) => {
                state.productTypes = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchProductTypes.rejected, (state, action) => {
                state.errors = action.error.message;
                state.isLoading = false;
            });
    }
});

export default productTypeSlice.reducer;
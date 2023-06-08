import { createSlice } from '@reduxjs/toolkit';

import { fetchAttributeTypes } from '../actions/attribute';


const initialState = {
    attributeTypes: [],
    isLoading: false,
    errors: null,
};

const attributeTypeSlice = createSlice({
    name: 'attributeTypes',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAttributeTypes.pending, state => {
                state.errors = null;
                state.isLoading = true;
            })
            .addCase(fetchAttributeTypes.fulfilled, (state, action) => {
                state.attributeTypes = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchAttributeTypes.rejected, (state, action) => {
                state.errors = action.error.message;
                state.isLoading = false;
            });
    }
});

export default attributeTypeSlice.reducer;
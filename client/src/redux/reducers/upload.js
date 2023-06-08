import { createSlice } from '@reduxjs/toolkit';

import { uploadAvatar } from '../actions/user';


const initialState = {
    uploadPath: '',
    isLoading: false,
    error: null
};

const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(uploadAvatar.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(uploadAvatar.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.uploadPath = action.payload;
            })
            .addCase(uploadAvatar.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export default uploadSlice.reducer;
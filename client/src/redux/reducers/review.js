import { createSlice } from '@reduxjs/toolkit';

import { fetchProductReviews, fetchReview, fetchReviews, fetchUserReviews } from '../actions/review';


const initialState = {
    review: null,
    reviews: [],
    isLoading: false,
    errors: null,
};

const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProductReviews.pending, state => {
                state.errors = null;
                state.isLoading = true;
            })
            .addCase(fetchProductReviews.fulfilled, (state, action) => {
                state.reviews = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchProductReviews.rejected, (state, action) => {
                state.errors = action.error.message;
                state.isLoading = false;
            })
            .addCase(fetchUserReviews.pending, state => {
                state.errors = null;
                state.isLoading = true;
            })
            .addCase(fetchUserReviews.fulfilled, (state, action) => {
                state.reviews = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchUserReviews.rejected, (state, action) => {
                state.errors = action.error.message;
                state.isLoading = false;
            })
            .addCase(fetchReviews.pending, state => {
                state.errors = null;
                state.isLoading = true;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.reviews = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.errors = action.error.message;
                state.isLoading = false;
            })
            .addCase(fetchReview.pending, state => {
                state.errors = null;
                state.isLoading = true;
            })
            .addCase(fetchReview.fulfilled, (state, action) => {
                state.review = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchReview.rejected, (state, action) => {
                state.errors = action.error.message;
                state.isLoading = false;
            });
    }
});

export default reviewSlice.reducer;
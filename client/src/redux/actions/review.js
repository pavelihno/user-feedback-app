import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api';
import { getErrorData } from '../utils';


export const fetchReviews = createAsyncThunk(
    'reviews/getAll',
    async () => {
        const res = await api.get("/reviews");
        const reviews = res.data;
        return reviews;
    }
);

export const fetchProductReviews = createAsyncThunk(
    'reviews/getAllByProduct',
    async (productId, { rejectWithValue }) => {
        try {
            const res = await api.get(`/reviews/${productId}/list`);
            const reviews = res.data;
            return reviews;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);

export const fetchUserReviews = createAsyncThunk(
    'reviews/getAllByUser',
    async (userId, { rejectWithValue }) => {
        try {
            const res = await api.get(`/reviews/user/${userId}`);
            const reviews = res.data;
            return reviews;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);

export const fetchReview = createAsyncThunk(
    'reviews/get',
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(`/reviews/${id}`);
            const review = res.data;
            return review;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);

export const uploadAttachments = createAsyncThunk(
    'reviews/uploadAttachments',
    async (attachmentData, { rejectWithValue }) => {
        try {
            const { reviewId, files } = attachmentData;
            const formData = new FormData();
            Array.from(files).map((file) => {
                formData.append('attachments', file);
            });
            const res = await api.post(`/reviews/${reviewId}/attachments`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const { attachments } = res.data;
            return attachments;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);

export const deleteAttachments = createAsyncThunk(
    'reviews/deleteAttachments',
    async (attachmentData, { rejectWithValue }) => {
        try {
            const { reviewId, attachment } = attachmentData;
            const res = await api.post(`/reviews/${reviewId}/attachments/delete`, attachmentData);
            const { attachments } = res.data;
            return attachments;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);

export const createReview = createAsyncThunk(
    'reviews/create',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await api.post('/reviews', formData);
            const review = res.data;
            return review;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);

export const updateReview = createAsyncThunk(
    'reviews/update',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await api.put(`/reviews/${formData.reviewId}`, formData);
            const review = res.data;
            return review;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);

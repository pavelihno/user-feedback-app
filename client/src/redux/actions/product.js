import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api';
import { getErrorData } from '../utils';


export const fetchProducts = createAsyncThunk(
    'products/getAll',
    async (productTypeId, { rejectWithValue }) => {
        try {
            const res = await api.get(`/products/${productTypeId}/list`);
            const products = res.data;
            return products;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);

export const fetchProduct = createAsyncThunk(
    'products/get',
    async (productId, { rejectWithValue }) => {
        try {
            const res = await api.get(`/products/${productId}`);
            const productType = res.data;
            return productType;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/delete',
    async (productId, { rejectWithValue }) => {
        try {
            const res = await api.delete(`/products/${productId}`);
            const message = res.message;
            return message;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);

export const createProduct = createAsyncThunk(
    'products/create',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await api.post('/products', formData);
            const productType = res.data;
            return productType;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);

export const updateProduct = createAsyncThunk(
    'products/update',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await api.put(`/products/${formData.productId}`, formData);
            const productType = res.data;
            return productType;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);

export const approveProduct = createAsyncThunk(
    'products/approve',
    async (productId, { rejectWithValue }) => {
        try {
            const res = await api.post(`/products/${productId}/approve`);
            const productType = res.data;
            return productType;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);


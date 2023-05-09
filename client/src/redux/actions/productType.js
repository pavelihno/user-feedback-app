import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api';
import { getErrorData } from '../utils';


export const fetchProductTypes = createAsyncThunk(
    'productTypes/getAll',
    async () => {
        const res = await api.get('/productTypes');
        const productTypes = res.data;
        return productTypes;
    }
);

export const fetchProductType = createAsyncThunk(
    'productTypes/get',
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(`/productTypes/${id}`);
            const productType = res.data;
            return productType;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);

export const deleteProductType = createAsyncThunk(
    'productTypes/delete',
    async (productTypeId, { rejectWithValue }) => {
        try {
            console.log(id);
            const res = await api.delete(`/productTypes/${productTypeId}`);
            const message = res.message;
            return message;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);

export const createProductType = createAsyncThunk(
    'productTypes/create',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await api.post('/productTypes', formData);
            const productType = res.data;
            return productType;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);

export const updateProductType = createAsyncThunk(
    'productTypes/update',
    async (formData, { rejectWithValue }) => {
        try {
            console.log(123);
            const res = await api.put(`/productTypes/${formData.productTypeId}`, formData);
            const productType = res.data;
            return productType;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);


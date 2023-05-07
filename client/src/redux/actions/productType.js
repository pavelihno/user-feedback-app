import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api';
import { getErrorData } from '../utils';


export const fetchProductTypes = createAsyncThunk(
    'productTypes/get',
    async () => {
        const res = await api.get('/productTypes');
        const productTypes = res.data;
        return productTypes;
    }
);


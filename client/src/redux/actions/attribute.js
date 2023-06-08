import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api';
import { getErrorData } from '../utils';


export const fetchAttributeTypes = createAsyncThunk(
    'attributes/types/getAll',
    async () => {
        const res = await api.get('/attributes/types');
        const attributeTypes = res.data;
        return attributeTypes;
    }
);
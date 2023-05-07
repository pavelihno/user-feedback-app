import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api';
import { getErrorData } from '../utils';


export const changeName = createAsyncThunk(
    'user/changeName',
    async (name, { rejectWithValue }) => {
        try {
            const res = await api.put('/users', { name });
            const user = res.data;
            return user;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);

export const changePassword = createAsyncThunk(
    'user/changePassword',
    async (password, { rejectWithValue }) => {
        try {
            const res = await api.put('/users/changePassword', { password });
            const user = res.data;
            return user;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);


export const uploadAvatar = createAsyncThunk(
    'user/uploadAvatar',
    async (avatarFile, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('avatar', avatarFile);
            const response = await api.post('/users/uploadAvatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const { avatarPath } = response.data;
            return avatarPath;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);

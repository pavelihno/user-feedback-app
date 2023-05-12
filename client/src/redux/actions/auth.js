import { createAsyncThunk } from '@reduxjs/toolkit';

import { api, setAuthToken } from '../../api';
import { getErrorData } from '../utils';
import { setCurrentUser } from '../reducers/auth';


export const login = createAsyncThunk(
    'auth/login',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await api.post('/login', formData);
            const { token, user } = res.data;
            setAuthToken(token);
            return user;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await api.post('/register', formData);
            const { token, user } = res.data;
            setAuthToken(token);
            return user;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);

export const logout = createAsyncThunk('auth/logout', () => {
    setAuthToken(false);
    setCurrentUser(null);
});

export const auth = createAsyncThunk(
    'auth',
    async () => {
        const res = await api.get('/auth');
        const { user } = res.data;
        return user;
    }
);
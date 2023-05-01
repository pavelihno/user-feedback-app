import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../api';
import { setAuthToken } from '../api';


const getErrorData = (err) => {
    return err.response ? err.response.data : err;
};

export const SET_CURRENT_USER_ID = 'SET_CURRENT_USER_ID';

export const setCurrentUserId = (userId) => ({
    type: SET_CURRENT_USER_ID,
    userId
});

const setAuthTokenAndUserId = (dispatch, token, userId) => {
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUserId(userId));
};

export const login = createAsyncThunk(
    'auth/login',
    async (formData, { dispatch, rejectWithValue }) => {
        try {
            const res = await api.post('/login', formData);
            const { token, user: { _id: userId } } = res.data;
            setAuthTokenAndUserId(dispatch, token, userId);
            return res;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (formData, { dispatch, rejectWithValue }) => {
        try {
            const res = await api.post('/register', formData);
            const { token, user: { _id: userId } } = res.data;
            setAuthTokenAndUserId(dispatch, token, userId);
            return res;
        } catch (err) {
            return rejectWithValue(getErrorData(err));
        }
    }
);

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    setAuthToken(false);
    dispatch(setCurrentUserId(null));
};
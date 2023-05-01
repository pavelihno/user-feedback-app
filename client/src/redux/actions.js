import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

export const login = (formData) => async (dispatch) => {
    try {
        const res = await api.post('/login', formData);
        const {token} = res.data;
        const {_id: userId} = res.data.user;

        localStorage.setItem('token', token);

        setAuthToken(token);
        dispatch(setCurrentUserId(userId));
    } catch (err) {
        return getErrorData(err);
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    setAuthToken(false);
    dispatch(setCurrentUserId(null));
};

export const register = (formData) => async (dispatch) => {
    try {
        const res = await api.post('/register', formData);
        const {token} = res.data;
        const {_id: userId} = res.data.user;

        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        dispatch(setCurrentUserId(userId));
        return res;
    } catch (err) {
        return getErrorData(err);
    }
};
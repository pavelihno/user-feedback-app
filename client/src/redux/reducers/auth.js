import { createSlice } from '@reduxjs/toolkit';
import { login, register } from '../actions/auth';

const initialState = {
    currentUser: null,
    errors: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
        setErrors(state, action) {
            state.errors = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.errors = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(register.pending, state => {
                state.errors = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.errors = action.payload;
            });
    }
});

export const { setCurrentUser, setErrors } = authSlice.actions;

export default authSlice.reducer;

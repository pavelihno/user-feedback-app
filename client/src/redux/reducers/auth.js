import { createSlice } from '@reduxjs/toolkit';
import { login, register, auth } from '../actions/auth';

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
            })
            .addCase(auth.pending, state => {
                state.errors = null;
            })
            .addCase(auth.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(auth.rejected, (state, action) => {
                state.errors = action.payload;
            });
    }
});

export const { setCurrentUser, setErrors } = authSlice.actions;
export const selectCurrentUser = state => state.auth.currentUser;
export const selectIsAuth = state => !!state.auth.currentUser;

export default authSlice.reducer;

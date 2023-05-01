import { api } from '../api';


export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const setCurrentUser = (userId) => ({
    type: SET_CURRENT_USER,
    userId
});

export const login = (formData) => async (dispatch) => {
    try {
        const res = await api.post('/login', formData);
        const { token, user } = res.data;

        localStorage.setItem('token', token);

        setAuthToken(token);
        dispatch(setCurrentUser(user._id));
    } catch (err) {
        console.error(err);
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    setAuthToken(false);
    dispatch(setCurrentUser(null));
};

export const register = (formData) => async (dispatch) => {
    try {
        const res = await api.post('/register', formData);
        const { token, user } = res.data;

        localStorage.setItem('jwtToken', token);

        setAuthToken(token);
        dispatch(setCurrentUser(user));
    } catch (err) {
        console.error(err);
    }
};
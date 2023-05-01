import { combineReducers } from 'redux';
import { SET_CURRENT_USER } from './actions';


const initialState = {
    currentUser: null,
};

const currentUserReducer = (state = initialState.currentUser, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return action.user;
        default:
            return state;
    }
};

export default combineReducers({
    currentUser: currentUserReducer,
});

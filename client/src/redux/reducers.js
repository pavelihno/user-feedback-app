import { combineReducers } from 'redux';
import { SET_CURRENT_USER_ID } from './actions';


const currentUserReducer = (state = null, action) => {
    switch (action.type) {
        case SET_CURRENT_USER_ID:
            return action.userId;
        default:
            return state;
    }
};

export default combineReducers({
    currentUser: currentUserReducer,
});

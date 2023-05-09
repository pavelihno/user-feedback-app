import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import productTypeReducer from './reducers/productType';
import attributeReducer from './reducers/attribute';
import productReducer from './reducers/product';
import uploadReducer from './reducers/upload';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];
const rootReducer = combineReducers({
    auth: authReducer,
    productType: productTypeReducer,
    attribute: attributeReducer,
    product: productReducer,
    upload: uploadReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

export default store;

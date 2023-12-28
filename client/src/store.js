import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';

import { thunk } from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import filterReducer from "../reducers/filterRedicer";
import heroReducer from "../reducers/heroReducer";
import {configureStore} from "@reduxjs/toolkit";

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({type: action});
    }
    return next(action);
};


/*const store = createStore(combineReducers({filterReducer, heroReducer}),

    compose(applyMiddleware(thunk, stringMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);*/

const store = configureStore({
    reducer: {
        filterReducer,
        heroReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
})


export default store;

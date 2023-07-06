import {createStore, combineReducers} from 'redux';
import filterReducer from "../reducers/filterRedicer";
import heroReducer from "../reducers/heroReducer";

const enhancer = (createStore, ...args) => {
    const store = createStore(...args);

}

const store = createStore(combineReducers({filterReducer, heroReducer}),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

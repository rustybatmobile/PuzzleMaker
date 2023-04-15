import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from "redux-thunk";
import logger from 'redux-logger';
import puzzlesReducer from './reducers/puzzlesReducer';



const rootReducer = combineReducers({
    puzzles: puzzlesReducer
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger)); //insert reducers in this


export default store;
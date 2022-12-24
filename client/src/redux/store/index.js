import thunk from 'redux-thunk'
import { applyMiddleware } from "redux";
import { createStore } from "redux";
import reducer from "../reducer";

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
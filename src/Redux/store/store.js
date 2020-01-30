import { createStore,applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import auth_reducer from "../reducers/auth_reducer";
import search_reducer from '../reducers/search_reducer';
import requests_reducer from '../reducers/requests_reducer';

const rootReducer = combineReducers({
  auth_reducer: auth_reducer,
  search_reducer: search_reducer,
  requests_reducer: requests_reducer
});

const configureStore = () => {
  return createStore(rootReducer , applyMiddleware(thunk));
};

export default configureStore;
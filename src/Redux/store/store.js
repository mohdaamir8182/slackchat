import { createStore, combineReducers } from "redux";
import auth_reducer from "../reducers/auth_reducer";
import search_reducer from '../reducers/search_reducer';

const rootReducer = combineReducers({
  auth_reducer: auth_reducer,
  search_reducer: search_reducer
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
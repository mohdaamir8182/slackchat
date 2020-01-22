import { createStore, combineReducers } from "redux";
import auth_reducer from "../reducers/auth_reducer";

const rootReducer = combineReducers({
  auth_reducer: auth_reducer
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
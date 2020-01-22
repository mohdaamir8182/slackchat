import { SIGN_UP, SIGN_IN } from "../types/auth_types";
import Signin from "../../screens/stackNavScreens/authScreens/Signin";

const initialState = {
  user: null
};
const auth_reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        user: action.payload
      };
    case SIGN_IN:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export default auth_reducer;
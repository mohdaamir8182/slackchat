import { SEARCH } from "../types/search_types";
import Signin from "../../screens/stackNavScreens/authScreens/Signin";

const initialState = {
  search_query: "friendss"
};
const search_reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        search_query: action.payload
      };
    
    default:
      return state;
  }
};

export default search_reducer;
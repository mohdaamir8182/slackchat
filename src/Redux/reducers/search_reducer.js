import { SEARCH, CHANGE_SEARCH_ICON, RESET_SEARCH } from "../types/search_types";

const initialState = {
  isSearching: false,
  users: [],
};



const search_reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        isSearching: true,
        users: action.payload
      };
      case CHANGE_SEARCH_ICON:
      return {
        ...state,
        isSearching: !state.isSearching,
        users: []
      };
      case RESET_SEARCH:
        return {
          ...state,
          isSearching: false,
          users: []
        };
    
    default:
      return state;
  }
};

export default search_reducer;
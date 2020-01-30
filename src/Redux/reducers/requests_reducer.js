import { GET_REQUESTS } from "../types/request_types";

const initialState = {
  requests: []
};



const requests_reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUESTS:
      return {
        ...state,
        requests: action.payload
      };
    
    default:
      return state;
  }
};

export default requests_reducer;
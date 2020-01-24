import { SEARCH } from "../types/search_types";

export const do_search = (search_query) => {
  return {
    type: SEARCH,
    payload: search_query
  };
};

import { SEARCH,RESET_SEARCH } from "../types/search_types";
import { CHANGE_SEARCH_ICON } from "../types/search_types";
import firestore from '@react-native-firebase/firestore';



export const search_users =  (search_query) => {
 
  return async function (dispatch , getState) {

    var text = search_query;

    if(text != ""){
      var strSearch = text;
      var strlength = strSearch.length;
      var strFrontCode = strSearch.slice(0, strlength-1);
      var strEndCode = strSearch.slice(strlength-1, strSearch.length);
      
      var startcode = strSearch;
      var endcode= strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
      var that =this;
  
      var db =firestore();
      db.collection("users").where("email" , ">=" ,startcode).where("email" , "<=" ,endcode).limit(3)
  
      .onSnapshot(function(querySnapshot) {
                  let docs = querySnapshot.docs
                  console.log("SEARCHED_USERSsssss...:",docs);
                  
                  dispatch({ type: SEARCH, payload: docs });
      })
      }
      else
        {
                    dispatch({ type: SEARCH, payload: [] });
        }

  }

};


export const change_search_icon = () => {
  return {
    type: CHANGE_SEARCH_ICON,
  };
};

export const reset_search = () => {
  return {
    type: RESET_SEARCH,
    payload: false
  };
};
import { GET_REQUESTS } from "../types/request_types";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const get_friend_requests =  () => {
 
    return async function (dispatch , getState) {
        
        var db = firestore();
    
         db.collection("users").doc(auth().currentUser.uid)
              .onSnapshot(function(doc) {
                 const data = doc.data().recieved_requests ? doc.data().recieved_requests : [];
                 //console.log("REQUESTS....:",data)
                 data.length > 0 && db.collection("users").where("id" , "in" , data)
                        .get()
                        .then(doc => {
                            dispatch({ type: GET_REQUESTS, payload: doc._docs });
                        })
                        .catch(err => {
                            dispatch({ type: GET_REQUESTS, payload: [] });
                            console.log(err);
                        });
                 });
      
    }
  
  };
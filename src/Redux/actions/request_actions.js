import { GET_REQUESTS } from "../types/request_types";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const get_friend_requests =  () => {
 
    return async function (dispatch , getState) {
        
        var db = firestore();
    
         db.collection("users").doc(auth().currentUser.uid)
              .onSnapshot(function(doc) {
                 const data = doc.data().recieved_requests ? doc.data().recieved_requests : [];
                 console.log("REQUESTS....:",data)
                 data.length == 0 ? 
                    dispatch({ type: GET_REQUESTS, payload: [] })
                 :  db.collection("users").where("id" , "in" , data)
                        .get()
                        .then(doc => {
                            console.log("Dispatching resukkts")
                            dispatch({ type: GET_REQUESTS, payload: doc._docs });
                        })
                        .catch(err => {
                            dispatch({ type: GET_REQUESTS, payload: [] });
                            console.log(err);
                        });
                 });
      
    }
  
  };

  export const accept_friend_request =  (user_id) => {
 
    return async function (dispatch , getState) {
        
        var db = firestore();

        await  db.collection("users").doc(user_id).update({isLoading:true});

        await  db.collection("users").doc(auth().currentUser.uid).update({

                    recieved_requests : firestore.FieldValue.arrayRemove(user_id),

            })
            .then(function() {
                    db.collection("users").doc(auth().currentUser.uid).update({
                        friends : firestore.FieldValue.arrayUnion(user_id),
                    });
                
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });


        await  db.collection("users").doc(user_id).update({

                sent_requests : firestore.FieldValue.arrayRemove(auth().currentUser.uid),

            })
            .then(function() {
                db.collection("users").doc(user_id).update({
                    friends : firestore.FieldValue.arrayUnion(auth().currentUser.uid),
                });
            
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });

        //await get_friend_requests();

            db.collection("users").doc(user_id).update({isLoading:false});
            
    }
  
  };

  export const reject_friend_request =  (user_id) => {
 
    return async function (dispatch , getState) {
        
        var db = firestore();

        await  db.collection("users").doc(user_id).update({isLoading:true});

        await  db.collection("users").doc(auth().currentUser.uid).update({

                    recieved_requests : firestore.FieldValue.arrayRemove(user_id),

            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });


        await  db.collection("users").doc(user_id).update({

                sent_requests : firestore.FieldValue.arrayRemove(auth().currentUser.uid),

            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });

        //await get_friend_requests();

            db.collection("users").doc(user_id).update({isLoading:false});
            
    }
  
  };
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import ChatHeader from '../../components/ChatHeader';
import firestore from '@react-native-firebase/firestore';
import MessageSender from '../../components/MessageSender';
import OutgoingMessage from '../../components/OutgoingMessage';
import IncomingMessage from '../../components/IncomingMessage';
import auth from '@react-native-firebase/auth';

let id;
let unSubscribe;
export default class PrivateChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reciever_user: props.navigation.getParam("user"),
      online: false,
      messages:[]
    };
  }

  getChatUser = () => {

    var db = firestore();
    var that = this;
    
         db.collection("users").doc(this.state.reciever_user.id)
              .onSnapshot(function(doc) {
                console.log("CHAT_USERRRRR...:",doc.data());
                that.setState({online: doc.data().userStatus.online_status },()=>{console.log("ONEtoONE..",that.state.chatUser)});
              });
  }

  sendMessage = (message) => {
      var db = firestore();
      const sender_user_id = auth().currentUser.uid;
      const reciever_user_id = this.state.reciever_user.id;
      let date  = Date.now();
       id =  date;
      const thread_refrence1 = sender_user_id+reciever_user_id;
      const thread_refrence2 = reciever_user_id+sender_user_id;
      var messageObject = {
        id: id,
        message: message,
        sender_id: sender_user_id,
        reciever_id: reciever_user_id,
        isSent: true,
        isSeenByReciever: false,
        timestamp : date,
      };

      var docRef1 = firestore().collection("messages").doc(thread_refrence1);
      var docRef2 = firestore().collection("messages").doc(thread_refrence2);


      docRef1.get().then(function(doc) {
          if (doc.exists) {
              console.log("Already");
              docRef1.update({
                msg: firestore.FieldValue.arrayUnion(messageObject)
              });
          } else {
              
                docRef2.get().then(function(doc) {
                  if (doc.exists) {
                      console.log("Already");
                      docRef2.update({
                        msg: firestore.FieldValue.arrayUnion(messageObject)
                      });
                  } else {
                    console.log("No such document!");
                      docRef2.set({
                          msg: [
                              messageObject
                            ]
                    });
                  }
                });
          }
          }).catch(function(error) {
            console.log("Error getting document:", error);
          });
      
  }

  compare = ( a, b ) => {
    if ( a.last_nom < b.last_nom ){
      return -1;
    }
    if ( a.last_nom > b.last_nom ){
      return 1;
    }
    return 0;
  }

  getAllMessages = () => {
    // const thread_refrence = auth().currentUser.uid+this.state.reciever_user.id;
    // var docRef = firestore().collection("messages").doc(thread_refrence);
    var that = this;
    const thread_refrence1 = auth().currentUser.uid+this.state.reciever_user.id;
    const thread_refrence2 = this.state.reciever_user.id+auth().currentUser.uid;
    var docRef1 = firestore().collection("messages").doc(thread_refrence1);
    var docRef2 = firestore().collection("messages").doc(thread_refrence2);


  unSubscribe = docRef1.get().then(function(doc) {
        if (doc.exists) {
            console.log("Already");
            docRef1.onSnapshot((doc) => {
                  var data = doc.data().msg;
                  var sorted_messages =  data.sort((a,b)=>{
                      return b.timestamp - a.timestamp;
                  });

                  that.setState({messages:sorted_messages});
                  
                });
        } else {
            
              docRef2.get().then(function(doc) {
                if (doc.exists) {
                  docRef2.onSnapshot((doc) => {
                    var data = doc.data().msg;
                    var sorted_messages =  data.sort((a,b)=>{
                        return b.timestamp - a.timestamp;
                    });
  
                    that.setState({messages:sorted_messages});
                    
                  });
                } else {
                  console.log("No such document!");
                    docRef2.set({
                        msg: [
                            messageObject
                          ]
                  });
                }
              });
        }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
  }

 async componentDidMount(){
   await this.getChatUser();
   await this.getAllMessages();
  }

  // componentWillUnmount(){
  //   unSubscribe();
  // }

  render() {

    return (
      <View style={styles.container}>
        <ChatHeader
           title={this.state.reciever_user.full_name} 
           online={this.state.online}
        />

            <View style={styles.contentContainer}>   

            {

                this.state.messages.length > 0 ?

                    <FlatList
                      inverted={-1}
                      data={this.state.messages}
                      keyExtractor={(item)=>item.id}
                      renderItem={({item}) => {
                          return(
                            item.sender_id === auth().currentUser.uid ?
                              <OutgoingMessage 
                                message={item}
                              />
                            :
                              <IncomingMessage 
                                message={item}
                              />
                          );
                      }}
                    />

                : <ActivityIndicator size={50} />

            }    
                
            </View>

            

        <MessageSender 
            sendMessage={this.sendMessage}
        />
         
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  contentContainer:{
    flex: 1,
    // alignItems: 'center',
     justifyContent: 'center'
  }
});
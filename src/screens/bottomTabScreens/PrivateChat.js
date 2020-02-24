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
      isTyping: false,
      messages:[],
    };
  }

  onBackPressEvent = () => {
    this.props.navigation.navigate("home");
  }

  getChatUser = () => {

    var db = firestore();
    var that = this;
    
         db.collection("users").doc(this.state.reciever_user.id)
              .onSnapshot(function(doc) {
                console.log("CHAT_USERRRRR...:",doc.data());
                that.setState({online: doc.data().userStatus.online_status,isTyping: doc.data().userStatus.isTyping },()=>{console.log("ONEtoONE..",that.state.chatUser)});
              });
  }

  updateTypingStatus = (isTyping) => {
        isTyping ?
          firestore().collection("users").doc(auth().currentUser.uid).update({
            userStatus:{
              isTyping: true,
              online_status : true,
              timestamp : firestore.FieldValue.serverTimestamp()
            }
          })  :
          firestore().collection("users").doc(auth().currentUser.uid).update({
            userStatus:{
              isTyping: false,
              online_status : true,
              timestamp : firestore.FieldValue.serverTimestamp()
            }
          })
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
      var sender = firestore().collection("users").doc(sender_user_id);
      var reciever = firestore().collection("users").doc(reciever_user_id);


      docRef1.get().then(function(doc) {
          if (doc.exists) {
              console.log("Already");
              docRef1.update({
                msg: firestore.FieldValue.arrayUnion(messageObject)
              });

              sender.update({
                  lastChatMessage:{
                    id:1,
                    lastMessage:message,
                    lastMessageTime: date,
                  }
              });
              reciever.update({
                lastChatMessage:{
                  id:1,
                  lastMessage:message,
                  lastMessageTime: date,
                }
            });

          } 
          else {
              
                docRef2.get().then(function(doc) {
                    if (doc.exists) {
                        console.log("Already");
                        docRef2.update({
                          msg: firestore.FieldValue.arrayUnion(messageObject)
                        });

                        sender.update({
                          lastChatMessage:{
                            id:1,
                            lastMessage:message,
                            lastMessageTime: date,
                          }
                        });
                        reciever.update({
                          lastChatMessage:{
                            id:1,
                            lastMessage:message,
                            lastMessageTime: date,
                          }
                        });

                    } 
                    else 
                      {
                        console.log("No such document!");
                          docRef2.set({
                              msg: [
                                  messageObject
                                ]
                        });

                        sender.update({
                          lastChatMessage:{
                            id:1,
                            lastMessage:message,
                            lastMessageTime: date,
                          }
                        });
                        reciever.update({
                          lastChatMessage:{
                            id:1,
                            lastMessage:message,
                            lastMessageTime: date,
                          }
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


  this.unSubscribe = docRef1.get().then(function(doc) {
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

  componentWillUnmount(){
    if(this.unsubscribe)
    {
      this.unsubscribe();
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <ChatHeader
           title={this.state.reciever_user.full_name} 
           online={this.state.online}
           onPress={this.onBackPressEvent}
           isTyping={this.state.isTyping}
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

                : <Text style={{justifyContent: 'center'}}>No Messages</Text> //<ActivityIndicator size={50} />

            }    
                
            </View>

            

        <MessageSender 
            sendMessage={this.sendMessage}
            //updateTypingStatus={this.updateTypingStatus}
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
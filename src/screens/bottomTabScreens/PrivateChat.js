import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ChatHeader from '../../components/ChatHeader';
import firestore from '@react-native-firebase/firestore';
import MessageSender from '../../components/MessageSender';

export default class PrivateChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.navigation.getParam("user"),
      online: false,
    };
  }

  getChatUser = () => {

    var db = firestore();
    var that = this;
    
         db.collection("users").doc(this.state.user.id)
              .onSnapshot(function(doc) {
                console.log("CHAT_USERRRRR...:",doc.data());
                that.setState({online: doc.data().userStatus.online_status },()=>{console.log("ONEtoONE..",that.state.chatUser)});
              });
  }

 async componentDidMount(){
   await this.getChatUser();
  }

  render() {


    return (
      <View style={styles.container}>
        <ChatHeader
           title={this.state.user.full_name} 
           online={this.state.online}
        />

        <View style={styles.contentContainer}> 
          <Text>No Messages</Text>
        </View>

        <MessageSender />
         
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
    alignItems: 'center',
    justifyContent: 'center'
  }
});
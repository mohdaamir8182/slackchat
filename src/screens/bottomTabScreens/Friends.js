import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList, TouchableOpacity, AppState } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { set } from 'react-native-reanimated';
import User from '../../components/User';
import { NavigationActions, StackActions } from "react-navigation";
import {AppNavigator} from '../../../App';


export default class Friends extends Component {
  constructor(props) {
    //console.log("MYPROPS....",props);
    super(props);
    this.state = {
      friends:[],
      messages: [],
    };
  }

 getFriends = () => {

    var db = firestore();
    var that = this;
    
         db.collection("users").doc(auth().currentUser.uid)
              .onSnapshot(function(doc) {
                
                 const data = doc.data().friends ? doc.data().friends : [];
                 console.log("FRIENDS....:",data)
                 data.length > 0 && db.collection("users").where("id" , "in" , data)
                        .get()
                        .then(doc => {
                          that.setState({friends:doc._docs});
                            //console.log("FRIENDS....",that.state.friends)
                        })
                        .catch(err => console.log(err));
                 });
  }



  navigateToPrivateChat = (userData) => {
    //console.log("USERDATA>>>:",userData);
    this.props.screenProps.navigate("privateChat" , {"user":userData});
  }

  updateOnlineStatus = (action) => {
    var db =firestore();
    const currentUserId = auth().currentUser.uid;
    switch(action){
        case "online":

          var user_status = {
            //isTyping: false,
            online_status : true,
            timestamp : firestore.FieldValue.serverTimestamp()
          };
          db.collection("users").doc(auth().currentUser.uid).update({userStatus:user_status});

            break;
        case "offline":

          var user_status = {
            //isTyping: false,
            online_status : false,
            timestamp : firestore.FieldValue.serverTimestamp()
          };
          db.collection("users").doc(auth().currentUser.uid).update({userStatus:user_status});

            break;    
    }
}

  handleAppStateChange = (nextAppState) => {
    console.log("LOGGGG.... :", nextAppState);
    if (nextAppState === 'background') {
        this.updateOnlineStatus('offline')
       
    }else{
        this.updateOnlineStatus('online')
        console.log('the app is running');
  }
}


 componentDidMount(){

    this.getFriends();

    AppState.addEventListener(
      'change', 
      this.handleAppStateChange
    );

    // console.log("SCREEN_PROPS....:", this.props.screenProps)

 
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', () => this.handleAppStateChange());
  }

  render() {
    console.log("FRIENDSSSSSS....:",this.state.friends)
    return (
      <View style={styles.container}>
          <FlatList 
            data={this.state.friends}
            keyExtractor={(item) => item.id}
            renderItem = {({item}) => {
              const user = item._data;
              console.log("LAST...", item._data.lastChatMessage);
              return(
                  <TouchableOpacity onPress={() => this.navigateToPrivateChat(item._data)}>
                    <User
                      name={user.full_name}
                      id={item._data.id}
                      lastChatMessage={item._data.lastChatMessage.lastMessage}
                      time={item._data.lastChatMessage.lastMessageTime}
                    />
                  </TouchableOpacity>
              );
            }}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 10,
    }
})

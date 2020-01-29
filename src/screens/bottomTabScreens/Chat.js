import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList } from 'react-native';
import Header from '../../components/Header';
import TopTabs from './TopTabs';
import Search from '../../components/Search';
import User from '../../components/User';
import colors from '../../style/colors';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import SearchedUser from '../../components/SearchedUser';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching:false,
      search_query_from_header: "",
      searchText: "",
      sentRequests: [],
      friends:[],
      users: [],
      //isLoading: false
    };
  }


  emptySearch = () => {
    this.setState({searchText:[]});
  }

  getFriends = () => {

    var db = firestore();
    var that = this;
    
         db.collection("users").doc(auth().currentUser.uid)
              .onSnapshot(function(doc) {
                 const data = doc.data().friends ? doc.data().friends : [];
                 console.log("FRIENDS...:",data);
                data.length > 0 && db.collection("users").where("id" , "in" , data)
                        .get()
                        .then(doc => {
                          that.setState({friends:doc._docs});
                            //console.log("FRIENDS....",that.state.friends)
                        })
                        .catch(err => console.log(err));
                 });
  }

  getSentRequests = () => {

    var db = firestore();
    var that = this;
    
         db.collection("users").doc(auth().currentUser.uid)
              .onSnapshot(function(doc) {
                 const data = doc.data().sent_requests ? doc.data().sent_requests : [];
                 console.log("SENT_REQ...:",data);
                data.length > 0 && db.collection("users").where("id" , "in" , data)
                        .get()
                        .then(doc => {
                          that.setState({sentRequests:doc._docs});
                            //console.log("FRIENDS....",that.state.friends)
                        })
                        .catch(err => console.log(err));
                 });
  }

  isAlreadyFriend = (id) =>  {
    return this.state.friends.some(function(user) {
      return user.id === id;
    }); 
  }

  isAlreadySentRequest = (id) =>  {
    return this.state.sentRequests.some(function(user) {
      return user.id === id;
    }); 
  }

  sendFriendRequest = (user_id) => {
    
    //this.setState({isLoading: true});
    var that = this;
    that.setState({isLoading: true});
    var db = firestore();

      db.collection("users").doc(user_id).update({isLoading:true});

      db.collection("users").doc(user_id).update({
        recieved_requests : firestore.FieldValue.arrayUnion(auth().currentUser.uid),
      })
      .then(function() {
        db.collection("users").doc(auth().currentUser.uid).update({
          sent_requests : firestore.FieldValue.arrayUnion(user_id),
        });
        db.collection("users").doc(user_id).update({isLoading:false});
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });

  }

  async componentDidMount(){
     await this.getFriends();
     await this.getSentRequests();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("USERS....:",nextProps.users)
    return {
        isSearching: nextProps.isSearching,
        users: nextProps.users
    };
  }




  render() {

    return (
      <>
        <StatusBar translucent  barStyle="dark-content" />

        <Header 
          onChangeText={this.handleSearch}
        />

        {
          this.state.isSearching ? 
            <View style={styles.reultsContainer}>
              {
                this.state.users.length > 0 &&
                  <FlatList 
                  data={this.state.users}
                  keyExtractor={(item)=>item.id}
                  renderItem={({item}) => {
                  
                      return(
                        item._data.id === auth().currentUser.uid ?
                         null :
                         this.isAlreadyFriend(item._data.id) ?
                         <SearchedUser
                            name={item._data.full_name}
                            email={item._data.email}
                            friendsBtnVisibility={true}
                            btnTitle="Friends"
                            isLoading={item._data.isLoading}
                            
                        /> :
                         this.isAlreadySentRequest(item._data.id) ?
                         <SearchedUser
                            name={item._data.full_name}
                            email={item._data.email}
                            friendsBtnVisibility={true}
                            btnTitle="Sent"
                            isLoading={item._data.isLoading}
                            
                        /> :
                         <SearchedUser
                            name={item._data.full_name}
                            email={item._data.email}
                            friendsBtnVisibility={false}
                            sendFriendRequest={() => this.sendFriendRequest(item._data.id)}
                            btnTitle="Add"
                            isLoading={item._data.isLoading}

                        />
                      )}
                  }
                  
                />
              }
            </View>
          : <View style={styles.container}>
              <TopTabs />
            </View>
        }

      </>
    );
  }
}



const mapStateToProps = state => {
  console.log("STATES...:",state.search_reducer);
  return{
      isSearching : state.search_reducer.isSearching,
      users : state.search_reducer.users
  }
  
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    //backgroundColor: colors.lightGrey
  },
  reultsContainer:{
    flex: 1,
    margin: 10,
    borderRadius: 5,
    //backgroundColor: colors.lightGrey
  }
});

export default connect(
  mapStateToProps
)(Chat);

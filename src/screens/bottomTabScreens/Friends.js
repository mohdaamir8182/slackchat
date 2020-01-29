import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { set } from 'react-native-reanimated';
import User from '../../components/User';


export default class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends:[]
    };
  }

 getFriends = () => {

    var db = firestore();
    var that = this;
    
         db.collection("users").doc(auth().currentUser.uid)
              .onSnapshot(function(doc) {
                 const data = doc.data().friends ? doc.data().friends : [];
                 console.log("LENGTH....:",data)
                 data.length > 0 && db.collection("users").where("id" , "in" , data)
                        .get()
                        .then(doc => {
                          that.setState({friends:doc._docs});
                            //console.log("FRIENDS....",that.state.friends)
                        })
                        .catch(err => console.log(err));
                 });
  }

  async componentDidMount(){
     await this.getFriends();
  }

  render() {
    return (
      <View style={styles.container}>
          <FlatList 
            data={this.state.friends}
            keyExtractor={(item) => item.id}
            renderItem = {({item}) => {
              const user = item._data;
              return(
                  <User
                    name={user.full_name}
                  />
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

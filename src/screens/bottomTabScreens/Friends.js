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

  async componentDidMount(){
      var db = firestore();
      var data = [];
      var that = this;
     await db.collection("users").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            data.push(doc.data());
        });
        console.log("DATA....:",data);
        that.setState({friends:data});s
    });
  }

  render() {
    return (
      <View style={styles.container}>
          <FlatList 
            data={this.state.friends}
            keyExtractor={(item) => item.id}
            renderItem = {({item}) => {
              console.log("Username..: ",item.username);
              return(
                  <User
                    name={item.full_name}
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

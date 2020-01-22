import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  signOutEvent = () => {
    auth().signOut();
  }

  render() {
    return (
      <View style={styles.container}>
        <Button 
          title="Logout"
          onPress={this.signOutEvent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

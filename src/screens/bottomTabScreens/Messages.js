import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Messages </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 10,
    }
})

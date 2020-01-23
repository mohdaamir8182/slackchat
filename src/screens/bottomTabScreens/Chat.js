import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Header from '../../components/Header';
import TopTabs from './TopTabs';
import User from '../../components/User';
import colors from '../../style/colors';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        <StatusBar translucent  barStyle="dark-content" />

        <Header />

        <View style={styles.container}>
            <TopTabs />
        </View>

      </>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: colors.lightGrey
  }
})

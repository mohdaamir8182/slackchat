/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Splash from './src/screens/Splash';
import Home from './src/screens/stackNavScreens/Home';
import Signup from './src/screens/stackNavScreens/authScreens/Signup';
import Signin from './src/screens/stackNavScreens/authScreens/Signin';


const AppNavigator = createStackNavigator({
  splash: {screen:Splash},
  home : {screen: Home},
  signup: {screen: Signup},
  signin:{screen: Signin}
  
}, {
  initialRouteName: 'splash',
  headerMode: 'none',
  navigationOptions: {
      headershown: false
  }
});

export default createAppContainer(AppNavigator);

import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import auth from '@react-native-firebase/auth';
import Chat from '../../screens/bottomTabScreens/Chat';
import Groups from '../../screens/bottomTabScreens/Groups';
import Calls from '../../screens/bottomTabScreens/Calls';
import Settings from '../../screens/bottomTabScreens/Settings';
import TopTabs from '../bottomTabScreens/TopTabs';
import colors from '../../style/colors';

const BottomTabsNavigator = createBottomTabNavigator(
  {
    chats : {
      screen: Chat,
      navigationOptions:{
      tabBarLabel: 'Chats'
    }
  },
    groups : {
      screen: Groups,
      navigationOptions:{
        tabBarLabel: 'Groups'
      }
    },
    calls : {
      screen: Calls,
      navigationOptions:{
        tabBarLabel: 'Calls'
      }
    },
    settings : {
      screen: Settings,
      navigationOptions:{
        tabBarLabel: 'Settings'
      }
    },
  }, 
  {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
           
            if (routeName === 'chats') {
              return <Image
                      source={require('../../assets/icons/chat-speech-bubbles.png')}
                      style={{ height: 23, width: 27, tintColor: tintColor}}
                     />
            } 
            else if (routeName === 'groups') {
              return <Image
                      source={require('../../assets/icons/multiple-users-silhouette.png')}
                      style={{ height: 23, width: 23, tintColor: tintColor }}
                     />;
            } 
            else if (routeName === 'calls') {
              return <Image
                      source={require('../../assets/icons/call-answer.png')}
                      style={{ height: 23, width: 23, tintColor: tintColor }}
                     />;
            } 
            else {
              return <Image
                      source={require('../../assets/icons/settings-work-tool.png')}
                      style={{ height: 23, width: 23, tintColor: tintColor }}
                     />;
            } 

            // You can return any component that you like here!
            //return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
    }),
    initialRouteName: 'chats',
    backBehavior:'initialRoute',
    tabBarOptions: {
        activeTintColor: colors.accentColor,
        inactiveTintColor: colors.bottomTabIconColor,
        
    },
    //tabBarComponent: TabBarComponent
  }
);

export default createAppContainer(BottomTabsNavigator);


import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import auth from '@react-native-firebase/auth';
import Messages from '../bottomTabScreens/Messages';
import People from '../bottomTabScreens/People';
import colors from '../../style/colors';

const TopTabsNavigator = createMaterialTopTabNavigator(
  {
    
    chats : 
    {
        screen: Messages,
        navigationOptions:{
            tabBarLabel: 'Messages',
            style:{fontStyle: 'bold',}
        }
    },
    people : 
    {
        screen: People,
        navigationOptions:{
            tabBarLabel: 'People'
        }
    }
    
  }, 
  {
    backBehavior:'initialRoute',
    tabBarOptions: {
        activeTintColor: colors.black,
        inactiveTintColor: colors.black,
        style:{
            marginTop: 13,
            marginBottom: 10,
            marginHorizontal: 10,
            elevation: 0.8,
            backgroundColor: '#fff'
        },
        indicatorStyle:{backgroundColor:colors.accentColor,height: 4},
        labelStyle:{fontWeight: 'bold', fontSize: 17},
        upperCaseLabel:false
    },
    //tabBarComponent: TabBarComponent
  }
);

export default createAppContainer(TopTabsNavigator);


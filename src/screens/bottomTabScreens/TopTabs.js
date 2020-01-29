import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import auth from '@react-native-firebase/auth';
import Friends from '../bottomTabScreens/Friends';
import Requests from '../bottomTabScreens/Requests';
import colors from '../../style/colors';

const TopTabsNavigator = createMaterialTopTabNavigator(
  {
    
    chats : 
    {
        screen: Friends,
        navigationOptions:{
            tabBarLabel: 'Friends',
            style:{fontStyle: 'bold',}
        }
    },
    requests : 
    {
        screen: Requests,
        navigationOptions:{
            tabBarLabel: 'Requests'
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
            elevation: 0.9,
            shadowColor: colors.lightGrey,
            shadowOpacity: 0.3,
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


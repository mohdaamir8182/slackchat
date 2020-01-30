import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, SafeAreaView, Image } from 'react-native';
import colors from "../style/colors";
import auth from '@react-native-firebase/auth';
import { NavigationActions, StackActions } from "react-navigation";


const Splash = (props) => {
  
    auth().onAuthStateChanged(function(user) {
        if (user) {
          
          setTimeout(()=>{
       
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: "home" })
          ]
        });
        props.navigation.dispatch(resetAction);
        },3000)
          console.log("Logedin user",user);
         
        } else {
          setTimeout(()=>{
       
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: "signin" })
          ]
        });
        props.navigation.dispatch(resetAction);
        },3000)
          
        }
      });
    

    return (
      <>
          <StatusBar translucent  barStyle="light-content"  backgroundColor='#fff' />
            
          <SafeAreaView style={{flex: 1}}>
              <View style={styles.container}>
                    <Image 
                        source={require('../assets/icons/slackbig.png')}
                        style={styles.logoStyle}
                    />
              </View>
          </SafeAreaView>

      </>
    );
  }

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoStyle:{
        height: 250,
        width: 250
    }
})

export default Splash;
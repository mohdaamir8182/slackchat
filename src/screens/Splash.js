import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, SafeAreaView, Image } from 'react-native';
import colors from "../style/colors";
import auth from '@react-native-firebase/auth';


const Splash = (props) => {
  
    auth().onAuthStateChanged(function(user) {
            if (user) {
            
            setTimeout(()=>{
                    console.log("INNNN")
                    props.navigation.navigate('home');
            },2000)
            //console.log("Logedin user",user);
            
            } else {
            setTimeout(()=>{
                    console.log("OUTTTT");
                    props.navigation.navigate('signin');
            },2000)
            
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
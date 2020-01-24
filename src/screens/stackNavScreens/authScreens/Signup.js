import React, { Component } from 'react';
import { View,SafeAreaView, Text, TextInput, StyleSheet, Image, TouchableOpacity,ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto'
import Icon2 from 'react-native-vector-icons/FontAwesome';
import colors from '../../../style/colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
//import firestore from 'fir'
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      username: '',
      full_name: '',
      email: '',
      password: '',
      confirm_password: ''
    };
  }

  signupEvent= () => {
    this.setState({isLoading: true})
      auth().createUserWithEmailAndPassword(this.state.email , this.state.password).
      then(createdUser => {
        this.setState({isLoading: false});
        console.log("LOG....: ", createdUser);
        this.insertUserInDb(createdUser);
      }).
      then(()=>{
        this.props.navigation.navigate('home');
      })
  }

  insertUserInDb = (createdUser) => {
        var db = firestore();
        
        db.collection("users").doc(auth().currentUser.uid).set({
          id: auth().currentUser.uid,
          username: this.state.username,
          full_name: this.state.full_name,
          email: this.state.email,
          password: this.state.password,
          friends:[],
          sent_requests:[],
          recieved_requests:[],
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
  }

  render() {
    return (

    <ScrollView contentContainerStyle={{flexGrow: 1}}>

      <SafeAreaView style={styles.container}>

        <View style={styles.firstContainer}>
            {/* <Image 
                source={require('../../../assets/icons/slackbig.png')}
                style={styles.logoStyle}
            /> */}
            <Text style={{fontSize:20, fontWeight: '100', marginHorizontal: 20}}>Hello</Text>
            <Text style={{fontSize:40, fontWeight: 'bold', marginHorizontal: 20}}>Sign Up !</Text>
        </View> 
        
        {/* <View style={{alignItems: 'center',}}>
            <Text> CREATE ACCOUNT  </Text>
        </View> */}

        <View style={styles.secondContainer}>

            <View style={styles.inputStyle}>
                <Icon 
                  name="user-secret"
                  size={20}
                  color="white"
                  style={{alignSelf: 'center', padding: 10, backgroundColor: colors.accentColor,borderTopLeftRadius: 50,borderBottomLeftRadius:50}}
                />
                <TextInput 
                    placeholder="Username"
                    style={{flex: 1,}}
                    onChangeText={(val)=>this.setState({username: val})}
                />
            </View>

            <View style={styles.inputStyle}>
                <Icon 
                  name="user-secret"
                  size={20}
                  color="white"
                  style={{alignSelf: 'center', padding: 10, backgroundColor: colors.accentColor,borderTopLeftRadius: 50,borderBottomLeftRadius:50}}
                />
                <TextInput 
                    placeholder="Full Name"
                    style={{flex: 1,}}
                    onChangeText={(val)=>this.setState({full_name: val})}
                />
            </View>

            <View style={styles.inputStyle}>
                <Icon 
                  name="email"
                  size={20}
                  color="white"
                  style={{alignSelf: 'center', padding: 10, backgroundColor: colors.accentColor,borderTopLeftRadius: 50,borderBottomLeftRadius:50}}
                />
                <TextInput 
                    placeholder="Email"
                    style={{flex: 1,}}
                    onChangeText={(val)=>this.setState({email: val})}
                />
            </View>

            <View style={styles.inputStyle}>
                <Icon 
                  name="key"
                  size={20}
                  color="white"
                  style={{alignSelf: 'center', padding: 10, backgroundColor: colors.accentColor,borderTopLeftRadius: 50,borderBottomLeftRadius:50}}
                />
                <TextInput 
                    placeholder="Password"
                    style={{flex: 1,}}
                    onChangeText={(val)=>this.setState({password: val})}
                />
            </View>

            <View style={styles.inputStyle}>
                <Icon 
                  name="key"
                  size={20}
                  color="white"
                  style={{alignSelf: 'center', padding: 10, backgroundColor: colors.accentColor,borderTopLeftRadius: 50,borderBottomLeftRadius:50}}
                />
                <TextInput 
                    placeholder="Confirm Password"
                    style={{flex: 1,}}
                    onChangeText={(val)=>this.setState({confirm_password: val})}
                />
            </View>

            <TouchableOpacity style={styles.signupBtn} onPress={this.signupEvent}>
                {
                    this.state.isLoading ?
                      <ActivityIndicator color="white" /> :
                      <Icon2 
                          name="sign-in"
                          size={20}
                          color="white"
                    />   
                }
            </TouchableOpacity>

        </View>

        <View style={styles.fourthContainer}>

                <Text> Already have an account ?  </Text>

                <TouchableOpacity onPress={()=>this.props.navigation.navigate("signin")}> 
                <Text style={{fontSize:14, fontWeight: 'bold', color: colors.accentColor}}>  signin</Text>
                </TouchableOpacity>

        </View>

      </SafeAreaView>

    </ScrollView>  
    );
  }
}


const styles = StyleSheet.create({
   container:{
       flex: 1,
    //    alignItems: 'center',
        //justifyContent: 'center',
        marginVertical: 10,
   },
   firstContainer:{
      flex: 3,
      justifyContent: 'center',
   },
   secondContainer:{
      flex: 7,
      justifyContent: 'center',
   },
   thirdContainer:{
      flexDirection: 'row',
      marginHorizontal: 15,
      justifyContent: 'flex-end',
   },
   fourthContainer:{
     flex:1,
     flexDirection: 'row',
      justifyContent: 'center',
   },
   inputStyle:{
       height: 40,
      // backgroundColor: 'red',
       margin: 10,
       borderWidth: 1,
       borderRadius: 50,
       borderColor: colors.accentColor,
       flexDirection: 'row',
       alignItems: 'center'
   } ,
   logoContainer:{
       alignItems: 'flex-start',
       marginTop: 40,
       marginBottom: 70,
   },
   logoStyle:{
       height: 150,
       width: 150
   },
    signupBtn:{
        height: 40,
        margin: 10,
        backgroundColor: colors.accentColor,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
   }
});
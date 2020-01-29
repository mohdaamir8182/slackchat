import React, { Component } from 'react';
import { View,SafeAreaView, Text, TextInput, StyleSheet, Image, TouchableOpacity,ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto'
import Icon2 from 'react-native-vector-icons/FontAwesome';
import colors from '../../../style/colors';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import { user_signin } from '../../../Redux/actions/auth_actions';
class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      user: null
    };
  }

  componentDidMount(){
      
  }

  signinEvent= () => {
      this.setState({isLoading: true});
      auth().signInWithEmailAndPassword(this.state.email , this.state.password).
      then(user => {
        this.setState({isLoading: false})
        this.props.dispatchSignin(user);
      }).
      then(()=>{
        this.props.navigation.navigate('home');
      })
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
            <Text style={{fontSize:20, fontWeight: '100', marginHorizontal: 20}}>Welcome</Text>
            <Text style={{fontSize:40, fontWeight: 'bold', marginHorizontal: 20}}>Sign In !</Text>
        </View> 
        
        {/* <View style={{alignItems: 'center',}}>
            <Text> CREATE ACCOUNT  </Text>
        </View> */}

        <View style={styles.secondContainer}>

            <View style={styles.inputStyle}>
                <Icon 
                  name="email"
                  size={20}
                  color="white"
                  style={{alignSelf: 'center', padding: 10, backgroundColor: colors.accentColor,borderTopLeftRadius: 50,borderBottomLeftRadius:50}}
                />
                <TextInput 
                    placeholder="Email"
                    autoCapitalize="none"
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
                    autoCapitalize="none"
                    style={{flex: 1,}}
                    onChangeText={(val)=>this.setState({password: val})}
                />
            </View>

            <TouchableOpacity style={styles.signupBtn} onPress={this.signinEvent}>
                  {this.state.isLoading ?
                    <ActivityIndicator color="white" /> :
                    <Icon2 
                        name="sign-in"
                        size={20}
                        color="white"
                    />   
                  }
            </TouchableOpacity>

            <View style={styles.thirdContainer}>

                <Text style={{fontSize:12, fontWeight: '100', marginHorizontal: 20}}> Forgot Password? </Text>

            </View>

        </View>

        <View style={styles.fourthContainer}>

                <Text> Don't have an account ?</Text>

                <TouchableOpacity onPress={()=>this.props.navigation.navigate("signup")}> 
                <Text style={{fontSize:14, fontWeight: 'bold', color: colors.accentColor}}>  Register</Text>
                </TouchableOpacity>

        </View>

      </SafeAreaView>

    </ScrollView>  
    );
  }
}

const mapStateToProps = state => {
    console.log("STATE...:",state.auth_reducer.user);
    return{
        user : state.auth_reducer.user
    }
    
}

const mapDispatchToProps = dispatchEvent => {
    return {
        dispatchSignin: user => {
            dispatchEvent(user_signin(user));
        }
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
      justifyContent: 'center',
      flexDirection: 'row',
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signin);
import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar, SafeAreaView, Image } from 'react-native';
import colors from '../style/colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

export default class User extends Component {
  constructor(props) {
    console.log("LAST_MESSAGE...:",props)
    super(props);
    this.state = {
        lastMessage: "",
        time: ""
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
      console.log("NEXT_PROPS.....:",nextProps)
    return {
      lastMessage: nextProps.lastChatMessage,
      time: nextProps.time
    };
  }

  render() {
    var that = this;
    console.log("TIME...:",this.state.time)
    return (


          <View style={styles.container}>
                
                <View style={styles.imgContainer}>
                        <Image 
                            source={require('../assets/icons/5b517aeb400f9-bpfull.png')}
                            style={{height: 50, width: 50}}
                        />
                </View>

                <View style={styles.titleContainer}>
                    <View style={{flex: 1,flexDirection: 'row', }}>
                      <Text style={styles.titleStyle}>{this.props.name}</Text>
                      <Text style={{flex:1 ,fontSize: 12,color:colors.orange, }}>
                          { this.state.time ? moment(this.state.time).calendar() : null }
                      </Text>
                    </View>
                    
                    <Text
                        numberOfLines={1} 
                        style={{fontSize: 14,color:colors.grey}}>
                            {this.state.lastMessage}
                    </Text>
                </View>

                {/* <View style={styles.timeContainer}>
                    <Text style={{fontSize: 12,color:colors.orange}}>{moment(this.state.time).calendar()}</Text>
                </View> */}

        </View>
      
    );
  }
}

const styles = StyleSheet.create({
    container:{
        height: 60,
        //flex: 1,
        //backgroundColor: colors.accentColor,
        paddingTop: StatusBar.currentHeight ,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 0.7,
        marginBottom: 5,
    },
    imgContainer:{
        flex: 2,
        //backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer:{
        flex: 8,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        // borderRightColor: colors.grey,
        // borderRightWidth: 1,
        marginLeft: 5
    },
    timeContainer:{
        flex: 2,
        //backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 10
        //marginHorizontal: 10
    },
    titleStyle:{
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black'
    }
})
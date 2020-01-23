import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar, SafeAreaView, Image } from 'react-native';
import colors from '../style/colors';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (

          <View style={styles.container}>
                
                <View style={styles.imgContainer}>
                        <Image 
                            source={require('../assets/icons/5b517aeb400f9-bpfull.png')}
                            style={{height: 50, width: 50}}
                        />
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.titleStyle}>Slack Chat</Text>
                    <Text
                        numberOfLines={1} 
                        style={{fontSize: 14,color:colors.grey}}>
                            But I must explain to you how all this But I must explain to you how all this
                    </Text>
                </View>

                <View style={styles.timeContainer}>
                    <Text style={{fontSize:12, color: colors.orange}}>12 Dec</Text>
                    <Text style={{fontSize: 12,color:colors.orange}}>11.10 PM</Text>
                </View>

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
        borderRightColor: colors.grey,
        borderRightWidth: 1
    },
    timeContainer:{
        flex: 2,
        //backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
        //marginHorizontal: 10
    },
    titleStyle:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    }
})
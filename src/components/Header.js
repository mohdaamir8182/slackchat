import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar, SafeAreaView, Image } from 'react-native';
import colors from '../style/colors';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (

          <View style={styles.container}>
                
                <View style={styles.logoContainer}>
                        <Image 
                            source={require('../assets/icons/slack.png')}
                            style={{height: 40, width: 40}}
                        />
                </View>

                <View style={styles.titleContainer}>
                        <Text style={styles.titleStyle}>Chat</Text>
                </View>

                <View style={styles.avatarContainer}>
                    <Image 
                        source={require('../assets/icons/magnifying-glass.png')}
                        style={{height: 20, width: 20}}
                    />
                    <Image 
                        source={require('../assets/icons/team-member-13.png')}
                        style={{height: 35, width: 35}}
                    />
                </View>

        </View>
      
    );
  }
}

const styles = StyleSheet.create({
    container:{
        height: 80,
        //flex: 1,
        //backgroundColor: colors.accentColor,
        paddingTop: StatusBar.currentHeight ,
        //justifyContent: 'center',
        flexDirection: 'row',
        //alignItems: 'center',
        elevation: 0.7,
        borderBottomWidth: 1,
        borderColor: colors.grey
    },
    logoContainer:{
        flex: 2,
        //backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer:{
        flex: 5,
        //backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarContainer:{
        flex: 3,
        flexDirection: 'row',
        //backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'space-around',
        //marginHorizontal: 10
    },
    titleStyle:{
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black'
    }
})
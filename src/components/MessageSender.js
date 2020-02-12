import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Attatchment from 'react-native-vector-icons/Entypo';
import Send from 'react-native-vector-icons/MaterialIcons';
import colors from '../style/colors';

export default class MessageSender extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        
            <View style={styles.browseFileContainer}>
                    <Attatchment 
                        name="attachment"
                        size={25}
                    />
            </View>

            <View style={styles.inputContainer}>
            <Text style={{color: colors.lightGrey}}>aaa</Text>
            </View>

            <View style={styles.sendBtnContainer}>
                <Send 
                    name="send"
                    size={25}
                />
            </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        height: 40,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        //alignItems: 'center',
        //backgroundColor: 'green',
    },
    browseFileContainer:{
        flex: 1,
        marginHorizontal: 5,
        //backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    inputContainer:{
        flex: 8,
        //backgroundColor: 'red',
        alignItems: 'flex-start',
        paddingLeft: 5,
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.lightGrey
    },
    sendBtnContainer:{
        flex: 1,
        marginHorizontal: 5,
        //backgroundColor: 'brown',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
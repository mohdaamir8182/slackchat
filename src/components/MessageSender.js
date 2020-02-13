import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Attatchment from 'react-native-vector-icons/Entypo';
import Send from 'react-native-vector-icons/MaterialIcons';
import colors from '../style/colors';

export default class MessageSender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText:""
    };
  }

  writeMessage = (text) => {
      this.setState({messageText: text});
  }

  onSendMsgEvent = () => {
    this.props.sendMessage(this.state.messageText);
    this.setState({messageText: ""})
  }

  render() {
    return (
      <View style={styles.container}>
        
            <View style={styles.browseFileContainer}>
                    <Attatchment 
                        name="attachment"
                        size={22}
                        color={colors.grey}
                    />
            </View>

            <View style={styles.inputContainer}>

              <TextInput 
                  style={styles.messageInputStyle}
                  placeholder="Type message here..."
                  onChangeText={this.writeMessage} 
                  value={this.state.messageText}   
              />

            </View>

            <TouchableOpacity 
              onPress={this.onSendMsgEvent} 
              style={styles.sendBtnContainer}
            >
                <Send 
                    name="send"
                    size={25}
                    color={colors.blue}
                    
                />
            </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        height: 50,
        maxHeight: 250,
        marginBottom: 5,
        paddingVertical: 5,
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
    messageInputStyle:{
      flex: 1,
      paddingHorizontal: 5,
    },
    inputContainer:{
        flex: 8,
        maxHeight: 250,
        //maxWidth: 250,
        //backgroundColor: 'red',
        alignItems: 'flex-start',
        paddingLeft: 5,
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.grey
    },
    sendBtnContainer:{
        flex: 1,
        marginHorizontal: 5,
        //backgroundColor: 'brown',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
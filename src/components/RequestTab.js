import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar, SafeAreaView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import colors from '../style/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default class RequestTab extends Component {
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
                            style={{height: 45, width: 45}}
                        />
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.titleStyle}>{this.props.name}</Text>
                    <Text
                        numberOfLines={1} 
                        style={{fontSize: 14,color:colors.grey}}>
                        {this.props.email}
                    </Text>
                </View>

               { this.props.isLoading ? 
                                <ActivityIndicator style={{color:'black'}} />
                
                : <View style={styles.btnContainer}>
                    <TouchableOpacity 
                            // style={styles.btnContainer}
                            onPress={this.props.onReqAccepted}
                    >   
                            <Text style={{fontSize: 16,color:colors.green,marginHorizontal: 5}}>Accept</Text> 
                    </TouchableOpacity>
                    <TouchableOpacity 
                            // style={styles.btnContainer}
                            onPress={this.props.onReqRejected}
                    >
                                 <Text style={{fontSize: 16,color:colors.tomato, marginRight: 5}}>Reject</Text>
                    </TouchableOpacity>
                </View>
            }
                

        </View>
      
    );
  }
}

const styles = StyleSheet.create({
    container:{
        height: 60,
        //flex: 1,
        //backgroundColor: colors.accentColor,
        //paddingTop: StatusBar.currentHeight ,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 0.7,
        marginBottom: 5,
        marginHorizontal: 10,
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: colors.accentColor
    },
    imgContainer:{
        flex: 2,
        marginLeft:5,
        //backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer:{
        flex: 7,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRightColor: colors.grey,
        borderRightWidth: 1,
        marginLeft: 5
    },
    btnContainer:{
        flex: 4,
        flexDirection: 'row',
        paddingHorizontal: 10,
        //backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        //marginLeft: 10
        alignItems: 'center'
    },
    titleStyle:{
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black'
    }
})
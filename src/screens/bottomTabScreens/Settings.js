import React, { Component } from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import {user_signout} from '../../Redux/actions/auth_actions';
import {connect} from 'react-redux';
import {reset_search} from '../../Redux/actions/search_actions';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  signOutEvent = () => {
        auth().signOut()
        .then(()=>{
          this.props.dispatchSignOut();
          this.props.dispatchReset();
        })
      }
    
    render() {
        return (
          <View style={styles.container}>
            <Button 
              title="Logout"
              onPress={this.signOutEvent}
            />
          </View>
        );
      }
    }

  
    const mapDispatchToProps = dispatchEvent => {
      console.log("EVENTS....:",dispatchEvent);
      return {
          dispatchSignOut: () => {
              dispatchEvent(user_signout());
          },
          dispatchReset: () => {
            dispatchEvent(reset_search());
        }
      }
    }
    
    
  const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

export default connect(
  null,
  mapDispatchToProps
)(Settings);



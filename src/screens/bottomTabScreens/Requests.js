import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import RequestTab from '../../components/RequestTab';
import {connect} from 'react-redux';
import {get_friend_requests} from '../../Redux/actions/request_actions';
import {accept_friend_request} from '../../Redux/actions/request_actions';
import {reject_friend_request} from '../../Redux/actions/request_actions';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      is:false
    };
  }

  acceptRequest = (user_id) => {
    console.log("req accepted");
  }

  rejectRequest = (user_id) => {
    console.log("req rejected");

    var that = this;
    var db = firestore();

      db.collection("users").doc(user_id).update({isLoading:true});

      db.collection("users").doc(auth().currentUser.uid).update({
        recieved_requests : firestore.FieldValue.arrayRemove(user_id),
      })
      .then(function() {
        db.collection("users").doc(user_id).update({
          sent_requests : firestore.FieldValue.arrayRemove(auth().currentUser.uid),
        });
        db.collection("users").doc(user_id).update({isLoading:false});
        //that.setState({is:true});
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
      //that.setState({is:true})

  }

  async componentDidMount(){

      await this.props.dispatchGetRequests();

      var senNotification = functions().httpsCallable('senNotification');
      senNotification().then(function(result) {
        // Read result of the Cloud Function.
        console.log("FUNCTION_RESPONSE...:");
        // ...
      });
      
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.requests !== nextProps.requests) {
          return {
            requests: nextProps.requests
          }
    }
    
    return null;
  }

  

  render() {

    //get
    // const {requests} = this.props;
    // console.log("REMAINING_REQUESTS...:",requests);

    return (
      <View>
        <FlatList 
          data={this.state.requests}
          keyExtractor={(item)=>item.id}
          renderItem={({item}) => {
            return (
              <RequestTab
                name={item._data.full_name}
                email={item._data.email}
                onReqAccepted={()=>this.props.dispatchAcceptRequests(item.id)}
                onReqRejected={()=>this.props.dispatchRejectRequests(item.id)}
                isLoading={item._data.isLoading}
              />
            );
          }}
        />
        
      </View>
    );
  }
}




const mapDispatchToProps = dispatchEvent => {
  console.log("EVENTS....:",dispatchEvent);
  return {
      dispatchGetRequests: () => {
          dispatchEvent(get_friend_requests());
      },
      dispatchAcceptRequests: (user_id) => {
        dispatchEvent(accept_friend_request(user_id));
      },
      dispatchRejectRequests: (user_id) => {
        dispatchEvent(reject_friend_request(user_id));
      } 
  }
}



const mapStateToProps = state => {
  console.log("REQUESTsss...:",state.requests_reducer.requests);
  return{
          requests : state.requests_reducer.requests
  }
  
}

const styles = StyleSheet.create({
  container:{
    
  }
});

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(Requests);


// ()=>{
//   console.log("Calling")
//   console.log("This props:",this.props);
//   this.props.dispatchGetRequests();
//     this.props.dispatchAcceptRequests(item.id)
//   }
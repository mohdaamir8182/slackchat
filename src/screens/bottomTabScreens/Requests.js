import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import RequestTab from '../../components/RequestTab';
import {connect} from 'react-redux';
import {get_friend_requests} from '../../Redux/actions/request_actions';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      is:false
    };
  }

  getRequests = () => {

    var db = firestore();
    var that = this;
    
         db.collection("users").doc(auth().currentUser.uid)
              .onSnapshot(function(doc) {
                 const data = doc.data().recieved_requests ? doc.data().recieved_requests : [];
                 console.log("REQUESTsss....:",data)
                 data.length > 0 && db.collection("users").where("id" , "in" , data)
                        .get()
                        .then(doc => {
                          that.setState({requests:doc._docs});
                        })
                        .catch(err => console.log(err));
                 });
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
      //await this.getRequests();
      this.props.dispatchGetRequests();
  }

  render() {
    return (
      <View>
        {console.log(this.state.requests)}
        <FlatList 
          data={this.state.requests}
          keyExtractor={(item)=>item.id}
          renderItem={({item}) => {
            return (
              <RequestTab
                name={item._data.full_name}
                email={item._data.email}
                onReqAccepted={()=>this.acceptRequest(item.id)}
                onReqRejected={()=>this.rejectRequest(item.id)}
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
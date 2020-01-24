import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Header from '../../components/Header';
import TopTabs from './TopTabs';
import Search from '../../components/Search';
import User from '../../components/User';
import colors from '../../style/colors';
import {connect} from 'react-redux';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching:false,
      search_query_from_header: ""
    };
  }

  onSearchClick = () => {
      this.setState({isSearching:!this.state.isSearching});
  }

  render() {
    return (
      <>
        <StatusBar translucent  barStyle="dark-content" />

        <Header />

        {
          this.state.isSearching ? 
            <Search /> 
          : <View style={styles.container}>
              <TopTabs />
            </View>
        }

      </>
    );
  }
}

const mapStateToProps = state => {
  console.log("SEARCH_QUERY...:",state.search_reducer.search_query);
  return{
      search_query_from_header : state.search_reducer.search_query
  }
  
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: colors.lightGrey
  }
});

export default connect(
  mapStateToProps
)(Chat);

import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar, SafeAreaView, Image,TextInput, TouchableOpacity } from 'react-native';
import colors from '../style/colors';
import SearchIcon from 'react-native-vector-icons/EvilIcons';
import CrossIcon from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import {do_search} from '../Redux/actions/search_actions';
import Search from './Search';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
        iconName:"search",
        isSearching:false,
        search_query: ""
    };
  }

  onSearchClick = () => {
      
      this.setState({isSearching:!this.state.isSearching,});
  }

  search = () => {
      console.log("QUERY...:",this.state.search_query)
    this.props.dispatchSearch(this.state.search_query)
  }

  render() {
    return (

          <View style={styles.container}>
                
                {
                    this.state.isSearching ? 
                        <View style={styles.sectionContainer}>
                            <TextInput 
                                placeholder="search"
                                style={styles.searchBarStyle}
                                onChangeText={(val)=>this.setState({search_query:val})}
                                onEndEditing={this.search}
                            />
                        </View>

                    :   <View style={styles.sectionContainer}>

                            <View style={styles.logoContainer}>
                                <Image 
                                    source={require('../assets/icons/slack.png')}
                                    style={{height: 35, width: 35}}
                                />
                            </View>

                            <View style={styles.titleContainer}>
                                    <Text style={styles.titleStyle}>Chat</Text>
                            </View>

                        </View>
                }

                <View style={styles.avatarContainer}>
                    <TouchableOpacity onPress={this.onSearchClick}>
                        {
                            !this.state.isSearching ? 
                                <SearchIcon 
                                    name="search"
                                    size={30}
                                    color="black"
                                />
                            :   <CrossIcon 
                                    name="cross"
                                    size={30}
                                    color="black"
                                />
                        }
                    </TouchableOpacity>    
                    <Image 
                        source={require('../assets/icons/team-member-13.png')}
                        style={{height: 35, width: 35}}
                    />
                </View>

        </View>
      
    );
  }
}

const mapStateToProps = state => {
    console.log("SEARCH_STATE...:",state.search_reducer.search_query);
    return{
        search_query : state.search_reducer.search_query
    }
    
}

const mapDispatchToProps = dispatchEvent => {
    return {
        dispatchSearch: (search_query) => {
            dispatchEvent(do_search(search_query));
        }
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
    sectionContainer:{
        flex: 7,
        flexDirection: 'row'
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
    },
    searchBarStyle:{
        flex:1,
        paddingLeft: 20
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);
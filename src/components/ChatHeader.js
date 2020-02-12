import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar, SafeAreaView, Image,TextInput, TouchableOpacity, ColorPropType } from 'react-native';
import colors from '../style/colors';
import SearchIcon from 'react-native-vector-icons/EvilIcons';
import CrossIcon from 'react-native-vector-icons/Entypo';
import BackIcon from 'react-native-vector-icons/AntDesign'
import {connect} from 'react-redux';
import {change_search_icon,search_users} from '../Redux/actions/search_actions';
import Search from './Search';

class ChatHeader extends Component {
  constructor(props) {
      console.log("Props.....:",props)
    super(props);
    this.state = {
        iconName:"search",
        isSearching:false,
        search_query: ""
    };
  }

  

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
        isSearching: nextProps.isSearching
    };
  }

  onIconClick = () => {
      console.log("ICON_CLICKED....:");
      this.setState({isSearching:!this.state.isSearching});
      this.props.dispatchIconChange();
  }

  onBackPress = () => {
      console.log("Go Back....:",this.props.navigation);
      this.props.navigation
  }

  render() {
    return (

          <View style={styles.container}>
                
                {
                    this.state.isSearching ? 
                        <View style={styles.sectionContainer}>
                            <TextInput 
                                placeholder="search"
                                autoCapitalize="none"
                                style={styles.searchBarStyle}
                                onChangeText={(val) => this.props.dispatchUserSearch(val)}
                                //onEndEditing={this.search}
                            />
                        </View>

                    :   <View style={styles.sectionContainer}>

                            <View style={styles.logoContainer}>
                                <BackIcon
                                    name="left"
                                    size={25}
                                    onPress={this.onBackPress}
                               />
                            </View>

                            <View style={styles.titleContainer}>
                                <Text style={styles.titleStyle}>{this.props.title}</Text>
                                {
                                    this.props.online ?
                                        <Text style={styles.latSeenStyle}> online </Text>
                                    :
                                        <Text style={styles.latSeenStyle}> last seen at 9:30 PM </Text>
                                }
                            </View>

                        </View>
                }

                <View style={styles.avatarContainer}>
                    <TouchableOpacity onPress={()=>this.onIconClick()}>
                        {
                            !this.state.isSearching ? 
                                <SearchIcon 
                                    name="search"
                                    size={30}
                                    color={colors.lightGrey}
                                />
                            :   <CrossIcon 
                                    name="cross"
                                    size={30}
                                    color={colors.lightGrey}
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
    //console.log("SEARCHING..:",state.search_reducer.isSearching);

    return{
        isSearching: state.search_reducer.isSearching,
        search_query : state.search_reducer.search_query
    }

    
}

const mapDispatchToProps = dispatchEvent => {
    return {
        dispatchUserSearch: (search_query) => {
            dispatchEvent(search_users(search_query));
        },
        dispatchIconChange: () => {
            dispatchEvent(change_search_icon());
        }
    }
}

const styles = StyleSheet.create({
    container:{
        height: 80,
        paddingTop: StatusBar.currentHeight ,
        flexDirection: 'row',
        elevation: 0.3,
        borderBottomWidth: 0.2,
        borderColor: colors.lightGrey
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
        alignItems: 'flex-start',
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
        fontSize: 12,
        fontWeight: 'bold',
        color: 'black'
    },
    latSeenStyle:{
        fontSize: 10,
        //fontWeight: 'bold',
        color: 'grey'
    },
    searchBarStyle:{
        flex:1,
        paddingLeft: 20
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChatHeader);
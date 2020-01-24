import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../style/colors';

const Search = (props) => {
    
        return (
            <View style={[styles.container,{marginHorizontal: 10,}]}>
                 <View style={styles.iconContainer}>
                    <Icon name='search'
                            size={12}
                            color={colors.grey}
                            style={styles.searchIconStyle}
                    />
                 </View>
                <TextInput style={styles.searchInputStyle}
                    placeholder='Search result'
                    autoCapitalize="none"
                    autoCorrect={false}
                    //onChangeText={props.onChangetxt}
                />

            </View>
        );
    }

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 40,
        marginTop: 15,
        borderColor: '#ccc',
        marginHorizontal: 20
    },
    iconContainer:{
        flex: 2,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        flexDirection: 'row', 
        backgroundColor: colors.lightGrey,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchIconStyle: {
        alignSelf: 'center',
        backgroundColor: '#ccc',
    },
    searchInputStyle: {
        fontSize: 10,
        fontWeight: '100',
        paddingLeft: 20,
        flex: 11,
        borderWidth: 1,
        borderColor: '#ccc',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        //backgroundColor: 'red',
    }

});

export default Search;
/**
 * Created by lkmc2 on 2017/11/23.
 */
'use strict';
import React, {Component} from 'react'
import {StyleSheet, View, Text, Image} from 'react-native';
import SuggestionItem from './SuggestionItem';

export default class LifeSuggestion extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.text,{marginLeft:10,fontSize:18,marginBottom:10}]}>今日生活指数</Text>
                <SuggestionItem index={0}/>
                <SuggestionItem index={1}/>
                <SuggestionItem index={2}/>
                <SuggestionItem index={3}/>
                <SuggestionItem index={4}/>
                <SuggestionItem index={5}/>
                <SuggestionItem index={6}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dbda9a',
        paddingTop: 20,
        paddingBottom: 20,
    },
    text: {
        fontSize: 15,
        color: '#000',
        flex: 1,
        backgroundColor: 'transparent'
    },
});
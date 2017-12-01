/**
 * Created by lkmc2 on 2017/11/23.
 */
'use strict';
import React, {Component} from 'react'
import {StyleSheet, View, Text, Image} from 'react-native';
import SuggestionItem from './SuggestionItem';
import {observer} from 'mobx-react/native';

@observer
export default class LifeSuggestion extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>今日生活指数</Text>
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
    title: {
        fontSize: 18,
        color: '#000',
        flex: 1,
        backgroundColor: 'transparent',
        marginLeft:10,
        marginBottom:10,
    },
});
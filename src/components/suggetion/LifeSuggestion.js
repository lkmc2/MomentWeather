/**
 * Created by lkmc2 on 2017/11/23.
 */
'use strict';
import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native';
import SuggestionItem from './SuggestionItem.js'; //生活指数子项
import {observer} from 'mobx-react/native';
import TraditionItem from './TraditionItem.js'; //农历子项

//今日生活指数
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
                <SuggestionItem index={7}/>
                <TraditionItem/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbfbfb',
        paddingTop: 20,
        paddingBottom: 20,
    },
    title: {
        fontSize: 18,
        color: '#000',
        flex: 1,
        backgroundColor: 'transparent',
        marginLeft: 10,
        marginBottom: 10,
    },
});
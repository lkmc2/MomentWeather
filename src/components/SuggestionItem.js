/**
 * Created by lkmc2 on 2017/11/23.
 */
'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ActivityIndicator} from 'react-native';
import WeatherStore from '../stores/WeatherStore.js'; //天气存储数据库
import {observer} from 'mobx-react/native';

@observer
export default class SuggestionItem extends Component {

    render() {
        let itemIndex=this.props.index;


        if (WeatherStore.loading) {
            return this.renderLoading();
        } else {
            return this.renderContent(WeatherStore.lifeList[itemIndex]);
        }
    }

    renderLoading = () => {
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
            </View>
        )
    };

    renderContent = (item) => {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{item.type}:{item.brf}</Text>
                <Text style={[styles.text,styles.textBottom]}>{item.txt}</Text>
                <View style={styles.divider}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
    },
    text: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
        color:'#000',
        fontSize:15
    },
    textBottom:{
        color:'#000',
        fontSize:13
    },
    divider: {
        backgroundColor: 'rgba(100,100,100,0.2)',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
        height: 1
    }
});
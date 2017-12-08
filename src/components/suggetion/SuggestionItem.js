/**
 * Created by lkmc2 on 2017/11/23.
 */
'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ActivityIndicator} from 'react-native';
import WeatherStore from '../../stores/WeatherStore.js'; //天气存储数据库
import {observer} from 'mobx-react/native';

//生活指数项
@observer
export default class SuggestionItem extends Component {

    render() {
        let itemIndex=this.props.index;
        let weatherData = WeatherStore.getCurrentCityWeather;

        if (WeatherStore.loading || weatherData === null) {
            return this.renderLoading();
        } else {
            return this.renderContent(weatherData.lifestyle[itemIndex], itemIndex);
        }
    }

    renderLoading = () => {
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
            </View>
        )
    };

    renderContent = (item, index) => {
        const title = ['舒适指数','洗车指数','穿衣指数','感冒指数','运动指数','旅游指数','紫外线指数','空气污染指数'];

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title[index]}:{item.brf}</Text>
                <Text style={[styles.title,styles.textBottom]}>{item.txt}</Text>
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
    title: {
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
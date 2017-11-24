/**
 * Created by lkmc2 on 2017/11/23.
 */
'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ActivityIndicator} from 'react-native';
// import weatherStore from '../stores/weather_store';

const lifeData = [
    {type:'舒适指数',brf:'舒适',txt:'今天夜间不太热也不太冷'},
    {type:'洗车指数',brf:'较舒适',txt:'较适宜洗车'},
    {type:'穿衣指数',brf:'较冷',txt:'建议穿外套加毛衣等服装'},
    {type:'感冒指数',brf:'较易发',txt:'天气较凉，较易发生感冒'},
    {type:'运动指数',brf:'较适宜',txt:'适合进行各种室内外运动'},
    {type:'旅游指数',brf:'适宜',txt:'天气较好，风稍大，但温度适宜'},
    {type:'紫外线指数',brf:'最弱',txt:'若紫外线辐射天气，无需特别防护'},
];

export default class SuggestionItem extends Component {

    render() {
        let itemIndex=this.props.index;
        return this.renderContent(lifeData[itemIndex]);

        // if (weatherStore.loading) {
        //     return this.renderLoading();
        // } else {
        //     return this.renderContent(weatherStore.lifeList[itemIndex]);
        // }
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
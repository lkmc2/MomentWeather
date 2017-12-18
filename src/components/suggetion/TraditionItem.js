/**
 * Created by lkmc2 on 2017/11/23.
 */
'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {observer} from 'mobx-react/native';
import StateStore from '../../stores/StateStore.js'; //天气状态存储器

//农历信息项
@observer
export default class TraditionItem extends Component {

    render() {
        const traditionInfo = StateStore.getTraditionInfo; //获取农历信息
        if (traditionInfo !== null && traditionInfo !== undefined) { //农历信息非空
            return this.renderContent(traditionInfo); //生成界面内容
        } else {
            return this.renderEmpty(); //加载空界面
        }
    }

    /**
     * 生成界面内容
     */
    renderEmpty = () => {
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
            </View>
        )
    };

    /**
     * 生成界面内容
     * @param traditionInfo 农历信息
     */
    renderContent = (traditionInfo) => {
        const {yearDescription, suit, taboo} = traditionInfo; //获取农历信息

        return (
            <View style={styles.container}>
                <Text style={styles.title}>农历指数:{yearDescription}</Text>
                <Text style={[styles.title,styles.textBottom]}>宜:{suit}</Text>
                <Text style={[styles.title,styles.textBottom]}>忌:{taboo}</Text>
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
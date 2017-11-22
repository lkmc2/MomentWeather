/**
 * Created by lkmc2 on 2017/11/22.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import TitleBar from '../components/TitleBar.js'; //标题栏

export default class MaxWeatherView extends Component {
    static navigationOptions = { //页面标题
        title: '更多', //标题栏文字
        // header: null, //隐藏标题栏
    };

    render() {
        return (
            <View style={styles.container}>
                <TitleBar title="更多" subtitle="More" index={3}/>
                <Text style={styles.text}>更多页面</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
    },
});
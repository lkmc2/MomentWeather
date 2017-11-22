/**
 * Created by lkmc2 on 2017/11/22.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

export default class WeeklyList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../images/weather/sunny.png')} style={styles.weatherIcon}/>
                <Text style={styles.updateTime}>当前：下午19:20</Text>
                <Text style={styles.temperature}>23摄氏度</Text>
                <Text style={styles.weatherDescription}>阴</Text>
                <Text style={styles.airCondition}>43 空气质量优</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 150,
        backgroundColor: '#aab6ff',
        alignItems: 'center',
    },
    weatherIcon: { //天气图标
        width: 200,
        height: 200,
    },
    updateTime: { //更新时间
        fontSize: 13,
    },
    temperature: { //当前温度
        fontSize: 22,
        fontWeight: 'bold',
    },
    weatherDescription: { //天气描述
        fontSize: 34,
        fontWeight: 'bold',
    },
    airCondition: { //空气质量
        fontSize: 13,
        backgroundColor: '#b9db62',
        padding: 3,
        borderRadius: 5,
    },
});
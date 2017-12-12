/**
 * Created by lkmc2 on 2017/11/23.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import IconUtil from '../../util/IconUtil.js'; //图片工具类

export default class WeeklyTemperature extends Component {

    render() {
        const {weatherCode, maxTemp, minTemp} = this.props;

        return (
            <View style={styles.container}>
                <Image source={IconUtil.loadMaxWeatherIcon(weatherCode)} style={styles.icon}/>
                <Text style={styles.title}>{maxTemp}°</Text>
                <Text style={styles.title}>{minTemp}°</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 90,
        backgroundColor: '#fbfbfb',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: { //天气图标
        width: 30,
        height: 30,
    },
});
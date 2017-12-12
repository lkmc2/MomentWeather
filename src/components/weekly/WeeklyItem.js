/**
 * Created by lkmc2 on 2017/11/23.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import WeeklyDate from "./WeeklyDate";
import WeeklyTemperature from "./WeeklyTemperature";

//每周天气子项
export default class WeeklyItem extends Component {
    render() {
        //日期、天气代码、最高温度、最低温度
        const {date, weatherCode, maxTemp, minTemp} = this.props;

        return (
            <View style={styles.container}>
                <WeeklyDate date={date}/>
                <WeeklyTemperature
                    weatherCode={weatherCode}
                    maxTemp={maxTemp}
                    minTemp={minTemp}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 140,
        width: 60,
    },
});
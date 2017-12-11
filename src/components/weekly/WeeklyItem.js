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

export default class WeeklyItem extends Component {
    render() {
        const {date, weatherCode, maxTemp, minTemp} = this.props; //获取星期几、日期

        return (
            <View style={styles.container}>
                <WeeklyDate date={date}/>
                <WeeklyTemperature weatherCode={weatherCode} maxTemp={maxTemp} minTemp={minTemp}/>
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
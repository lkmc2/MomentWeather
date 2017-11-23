/**
 * Created by lkmc2 on 2017/11/23.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
} from 'react-native';

import WeeklyDate from "./WeeklyDate";
import WeeklyTemperature from "./WeeklyTemperature";

export default class WeeklyItem extends Component {
    render() {
        const {day, date, icon, maxTemp, minTemp} = this.props; //获取星期几、日期

        return (
            <View style={styles.container}>
                <WeeklyDate day={day} date={date}/>
                <WeeklyTemperature icon={icon} maxTemp={maxTemp} minTemp={minTemp}/>
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
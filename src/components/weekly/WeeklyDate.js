/**
 * Created by lkmc2 on 2017/11/23.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
} from 'react-native';
import DateUtil from '../../util/DateUtil.js'; //日期工具类

//每周天气的日期子项
export default class WeeklyDate extends Component {
    render() {
        const {date} = this.props; //获取日期

        const day = DateUtil.getTimeInDate(date); //获取日期
        const date1 = DateUtil.getWeekdayByDate(date); //星期几

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{day}</Text>
                <Text style={styles.title}>{date1}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 60,
        backgroundColor: '#fbfbfb',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
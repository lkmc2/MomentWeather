/**
 * Created by lkmc2 on 2017/11/25.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
} from 'react-native';

//日期子项
export default class DateItem extends Component {
    render() {
        let weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

        const date = new Date(); //获取日期

        const day = date.getDate(); //日
        const month = date.getMonth() + 1; //月份
        const week = weeks[date.getDay()]; //星期几

        return (
            <View style={styles.container}>
                <Text style={styles.day}>{day}</Text>
                <View>
                    <Text style={styles.title}>{month}</Text>
                    <Text style={styles.title}>{week}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 50,
        backgroundColor: '#fbfbfb',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    day: {
        fontSize: 23,
    },
    title: {
        fontSize: 12,
        marginLeft: 2,
    }
});
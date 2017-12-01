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

export default class WeeklyDate extends Component {
    render() {
        const {day, date} = this.props; //获取星期几、日期

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{day}</Text>
                <Text style={styles.title}>{date}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 60,
        backgroundColor: '#ffb4a2',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
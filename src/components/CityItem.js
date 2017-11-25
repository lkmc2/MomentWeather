/**
 * Created by lkmc2 on 2017/11/24.
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
        const {city, air, icon, temperature} = this.props; //获取星期几、日期

        return (
            <View style={styles.container}>
                <Text style={styles.city}>{city}</Text>
                <Text style={styles.air}>{air}</Text>
                <View style={styles.wrapperView}>
                    <Image source={require('../images/rain.png')} style={styles.icon}/>
                    <Text style={styles.temp}>{temperature}℃</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 90,
        backgroundColor: '#ffb4a2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    city: {
        fontSize: 16,
    },
    air: {
        fontSize: 12,
        backgroundColor: '#b9db62',
        borderRadius: 3,
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
    wrapperView: {
        flexDirection: 'row',
        width: 60,
        justifyContent: 'center',
    },
    icon: {
        width: 15,
        height: 15,
    },
    temp: {
        fontSize: 12,
    },
});
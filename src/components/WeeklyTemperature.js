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

export default class WeeklyTemperature extends Component {

    render() {
        const {icon, maxTemp, minTemp} = this.props;

        return (
            <View style={styles.container}>
                <Image source={require('../images/rain.png')} style={styles.icon}/>
                <Text style={styles.text}>{maxTemp}°</Text>
                <Text style={styles.text}>{minTemp}°</Text>
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
    icon: { //天气图标
        width: 30,
        height: 30,
    },
});
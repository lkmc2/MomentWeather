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


export default class HourlyItem extends Component {
    render() {
        const {time, txt, temp, icon, rainrate} = this.props; //获取星期几、日期

        return (
            <View style={styles.container}>
                <Text>{time}</Text>
                <View style={styles.subView}>
                    <Text>{txt}</Text>
                    <Text style={styles.temp}>{temp}°</Text>
                </View>
                <View style={styles.subView}>
                    <Image source={require('../images/small/rain.png')} style={styles.icon}/>
                    <Text style={styles.rainrate}>{rainrate}%</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { //主容器
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#dfc752',
    },
    subView: { //子界面
        flexDirection: 'row',
    },
    icon: { //天气图标
        width: 20,
        height: 20,
    },
    temp: { //温度文字
        marginLeft: 10,
    },
    rainrate: { //降雨概率文字
        marginLeft: 5,
    },
});
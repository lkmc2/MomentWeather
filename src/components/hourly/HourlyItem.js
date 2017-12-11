/**
 * Created by lkmc2 on 2017/11/24.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

//逐小时天气子项
export default class HourlyItem extends Component {
    render() {
        const {time, txt, temp, icon} = this.props; //获取星期几、日期

        return (
            <View style={styles.container}>
                <View style={styles.subView}>
                    <Text>{time}</Text>
                </View>
                <View style={styles.subView}>
                    <Image source={icon} style={styles.icon}/>
                    <Text style={styles.txt}>{txt}</Text>
                </View>
                <View style={styles.subView}>
                    <Text style={styles.temp}>{temp}℃</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { //主容器
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#dfc752',
        alignItems: 'center',
    },
    subView: { //子界面
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
    },
    icon: { //天气图标
        width: 20,
        height: 20,
    },
    temp: { //温度文字
        marginLeft: 10,
    },
    txt: {
        marginLeft: 10,
    },
});
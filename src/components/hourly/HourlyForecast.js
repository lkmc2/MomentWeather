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
import HourlyItem from './HourlyItem.js'; //逐小时预报子项
import WeatherStore from '../../stores/WeatherStore.js'; //天气存储数据库
import DateUtil from '../../util/DateUtil.js'; //日期工具类
import IconUtil from '../../util/IconUtil.js'; //图标工具类

const data = [
    {key: '1', time: '11:00', txt: '小雨', temp: '12', icon: '', rainrate: '10'},
    {key: '2', time: '13:00', txt: '中雨', temp: '16', icon: '', rainrate: '50'},
    {key: '3', time: '15:00', txt: '大雨', temp: '18', icon: '', rainrate: '50'},
    {key: '3', time: '17:00', txt: '中雨', temp: '17', icon: '', rainrate: '40'},
    {key: '5', time: '19:00', txt: '小雨', temp: '15', icon: '', rainrate: '10'},
    {key: '6', time: '21:00', txt: '大雨', temp: '15', icon: '', rainrate: '20'},
    {key: '7', time: '23:00', txt: '中雨', temp: '15', icon: '', rainrate: '15'},
    {key: '8', time: '01:00', txt: '小雨', temp: '12', icon: '', rainrate: '10'},
];

export default class HourlyForecast extends Component {
    render() {
        return (
            <FlatList
                data={WeatherStore.hourlyDataSource}
                renderItem={
                    ({item}) =>
                        <HourlyItem
                            time={DateUtil.getTimeInDate(item.time)}
                            txt={item.cond_txt}
                            temp={item.tmp}
                            icon={IconUtil.loadMaxWeatherIcon(item.cond_code)}
                            rainrate={item.pop}/>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        color: '#000',
        marginLeft: 10,
        marginBottom: 10,
    },
});

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
    ScrollView,
} from 'react-native';
import WeeklyTemperature from '../weekly/WeeklyTemperature.js'; //每周天气控件
import WeeklyDate from "../weekly/WeeklyDate.js"; //每周日期控件
import CityList from "./CityList.js"; //城市列表控件
import DateItem from "./DateItem.js"; //日期显示控件
import WeatherStore from '../../stores/WeatherStore.js'; //天气存储数据库
import StateStore from '../../stores/StateStore.js'; //天气状态数据库
import {observer} from 'mobx-react/native';

const title = [
    {day: '周二', date: '11.22'},
    {day: '周三', date: '11.23'},
    {day: '周四', date: '11.24'},
    {day: '周五', date: '11.25'},
    {day: '周六', date: '11.26'},
    {day: '周日', date: '11.27'},
    {day: '周一', date: '11.28'},
];
const datas = [
    [
        {key: '1', icon: '', maxTemp: '17', minTemp: '12'},
        {key: '2', icon: '', maxTemp: '15', minTemp: '12'},
        {key: '3', icon: '', maxTemp: '17', minTemp: '12'},
        {key: '4', icon: '', maxTemp: '17', minTemp: '12'},
        {key: '5', icon: '', maxTemp: '17', minTemp: '12'},
        {key: '6', icon: '', maxTemp: '15', minTemp: '12'},
        {key: '7', icon: '', maxTemp: '16', minTemp: '12'},
        {key: '8', icon: '', maxTemp: '17', minTemp: '12'},
    ],
    [
        {key: '1', icon: '', maxTemp: '17', minTemp: '12'},
        {key: '2', icon: '', maxTemp: '19', minTemp: '10'},
        {key: '3', icon: '', maxTemp: '18', minTemp: '16'},
        {key: '4', icon: '', maxTemp: '22', minTemp: '20'},
        {key: '5', icon: '', maxTemp: '17', minTemp: '10'},
        {key: '6', icon: '', maxTemp: '16', minTemp: '12'},
        {key: '7', icon: '', maxTemp: '18', minTemp: '14'},
        {key: '8', icon: '', maxTemp: '17', minTemp: '12'},
    ],
    [
        {key: '1', icon: '', maxTemp: '15', minTemp: '12'},
        {key: '2', icon: '', maxTemp: '17', minTemp: '11'},
        {key: '3', icon: '', maxTemp: '19', minTemp: '10'},
        {key: '4', icon: '', maxTemp: '17', minTemp: '12'},
        {key: '5', icon: '', maxTemp: '15', minTemp: '10'},
        {key: '6', icon: '', maxTemp: '17', minTemp: '12'},
        {key: '7', icon: '', maxTemp: '18', minTemp: '10'},
        {key: '8', icon: '', maxTemp: '17', minTemp: '12'},
    ],
    [
        {key: '1', icon: '', maxTemp: '15', minTemp: '12'},
        {key: '2', icon: '', maxTemp: '17', minTemp: '11'},
        {key: '3', icon: '', maxTemp: '19', minTemp: '10'},
        {key: '4', icon: '', maxTemp: '17', minTemp: '12'},
        {key: '5', icon: '', maxTemp: '15', minTemp: '10'},
        {key: '6', icon: '', maxTemp: '17', minTemp: '12'},
        {key: '7', icon: '', maxTemp: '18', minTemp: '10'},
        {key: '8', icon: '', maxTemp: '17', minTemp: '12'},
    ],
];

//城市温度控件


@observer
export default class CitiesTemperature extends Component {

    renderWeeklyTempList = (weatherData) => {
        if (weatherData !== null && weatherData.length > 0) {
            return weatherData.map(data =>
                <FlatList
                    data={data.daily_forecast}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={true}
                    renderItem={
                        ({item, index}) => {
                            if (index > 4) return null;
                            return (
                                <WeeklyTemperature
                                    weatherCode={item.cond_code_d}
                                    maxTemp={item.tmp_max}
                                    minTemp={item.tmp_min}
                                />
                            )
                        }

                    }
                />
            );
        }
    };

    renderTitle = (weatherData) => {
        if (weatherData !== null && weatherData.length > 0) {
            return weatherData[0].daily_forecast.map(item =>
                <WeeklyDate date={item.date}/>
            );
        }
    };

    render() {
        const weatherData = StateStore.cityDataSource; //获取城市数据

        return (
            <View
                style={styles.container}>
                <View style={styles.rowView}>
                    <DateItem/>
                    {this.renderTitle(weatherData)}
                </View>
                <ScrollView>
                    <View style={styles.rowView}>
                        <CityList style={styles.cityList}/>
                        <View style={styles.wrapperView}>
                            {this.renderWeeklyTempList(weatherData)}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffad26',
    },
    rowView: {
        flexDirection: 'row',
    },
    cityList: {
        flex: 3,
    },
    wrapperView: {
        backgroundColor: '#666',
        flex: 1,
    },
});
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
import WeeklyTemperature from '../weekly/WeeklyTemperature.js';
import WeeklyDate from "../weekly/WeeklyDate";
import CityList from "./CityList";
import DateItem from "./DateItem";

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
export default class CitiesTemperature extends Component {

    render() {

        let renderWeeklyTempList = datas.map(data =>
            <FlatList
                data={data}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
                renderItem={
                    ({item, index}) => {
                        if (index > 4) return null;
                        return (
                            <WeeklyTemperature
                                icon={item.icon}
                                maxTemp={item.maxTemp}
                                minTemp={item.minTemp}
                            />
                        )
                    }

                }
            />
        );

        let renderTitle = title.map(item =>
            <WeeklyDate
                day={item.day}
                date={item.date}/>
        );

        return (
            <View
                style={styles.container}>
                <View style={styles.rowView}>
                    <DateItem/>
                    {renderTitle}
                </View>
                <ScrollView>
                    <View style={styles.rowView}>
                        <CityList style={styles.cityList}/>
                        <View style={styles.wrapperView}>
                            {renderWeeklyTempList}
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
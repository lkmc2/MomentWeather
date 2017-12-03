/**
 * Created by lkmc2 on 2017/12/3.
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
import EditCityItem from "./EditCityItem";

const data = [
    {cityName: '南宁', minTemp: '18', maxTemp: '22', weatherCode: '101'},
    {cityName: '北海', minTemp: '14', maxTemp: '23', weatherCode: '104'},
    {cityName: '广州', minTemp: '16', maxTemp: '22', weatherCode: '102'},
    {cityName: '福州', minTemp: '2', maxTemp: '10', weatherCode: '101'},
    {cityName: '山东', minTemp: '15', maxTemp: '28', weatherCode: '103'},
];

export default class EditCityList extends Component {

    /**
     * 生成key迭代器
     * @param item 迭代的项
     * @param index 下标
     */
    createKeyExtractor = (item, index) => item.cityName + index;

    render() {
        return (
            <FlatList
                data={data}
                keyExtractor={this.createKeyExtractor}
                renderItem={
                    ({item}) =>
                        <EditCityItem
                            cityName={item.cityName}
                            minTemp={item.minTemp}
                            maxTemp={item.maxTemp}
                            weatherCode={item.weatherCode}
                        />
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffb4a2',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});
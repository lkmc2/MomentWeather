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
import HourlyItem from './HourlyItem';

const data = [
    {key:'1',time:'11:00',txt:'小雨',temp:'12',icon:'',rainrate:'10'},
    {key:'2',time:'13:00',txt:'中雨',temp:'16',icon:'',rainrate:'50'},
    {key:'3',time:'15:00',txt:'大雨',temp:'18',icon:'',rainrate:'50'},
    {key:'3',time:'17:00',txt:'中雨',temp:'17',icon:'',rainrate:'40'},
    {key:'5',time:'19:00',txt:'小雨',temp:'15',icon:'',rainrate:'10'},
    {key:'6',time:'21:00',txt:'大雨',temp:'15',icon:'',rainrate:'20'},
    {key:'7',time:'23:00',txt:'中雨',temp:'15',icon:'',rainrate:'15'},
    {key:'8',time:'01:00',txt:'小雨',temp:'12',icon:'',rainrate:'10'},
];

export default class HourlyForecast extends Component {
    render() {
        return (
            <FlatList
                data={data}
                renderItem={
                    ({item}) =>
                        <HourlyItem
                            time={item.time}
                            txt={item.txt}
                            temp={item.temp}
                            icon={item.icon}
                            rainrate={item.rainrate}/>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffad26',
        alignItems: 'center',
    },
});

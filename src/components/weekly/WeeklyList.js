import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
} from 'react-native';

import WeeklyItem from "./WeeklyItem";

const data = [
    {key:'1',day:'周二',date:'11.23',icon:'',maxTemp:'17',minTemp:'12'},
    {key:'2',day:'周三',date:'11.24',icon:'',maxTemp:'16',minTemp:'11'},
    {key:'3',day:'周四',date:'11.25',icon:'',maxTemp:'14',minTemp:'10'},
    {key:'4',day:'周五',date:'11.26',icon:'',maxTemp:'16',minTemp:'12'},
    {key:'5',day:'周六',date:'11.27',icon:'',maxTemp:'19',minTemp:'11'},
    {key:'6',day:'周日',date:'11.28',icon:'',maxTemp:'17',minTemp:'12'},
    {key:'7',day:'周一',date:'11.29',icon:'',maxTemp:'18',minTemp:'10'},
];

export default class WeeklyList extends Component {
    render() {
        return (
            <FlatList
                data={data}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={
                    ({item}) =>
                        <WeeklyItem
                            day={item.day}
                            date={item.date}
                            icon={item.icon}
                            maxTemp={item.maxTemp}
                            minTemp={item.minTemp}/>
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

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
} from 'react-native';

import WeeklyItem from "./WeeklyItem"; //一周天气子项
import WeatherStore from '../../stores/WeatherStore.js'; //天气存储数据库
import {observer} from 'mobx-react/native';

@observer
export default class WeeklyList extends Component {
    render() {
        return (
            <FlatList
                data={WeatherStore.dailyDataSource}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={
                    ({item}) =>
                        <WeeklyItem
                            date={item.date}
                            weatherCode={item.cond_code_d}
                            maxTemp={item.tmp_max}
                            minTemp={item.tmp_min}/>
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

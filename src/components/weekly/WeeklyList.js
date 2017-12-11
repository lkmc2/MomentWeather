import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
} from 'react-native';

import WeeklyItem from "./WeeklyItem"; //一周天气子项
import WeatherStore from '../../stores/WeatherStore.js'; //天气存储数据库
import {observer} from 'mobx-react/native';

@observer
export default class WeeklyList extends Component {

    /**
     * 生成key迭代器
     * @param item 迭代的项
     * @param index 下标
     */
    createKeyExtractor = (item, index) => item.cond_code_d + index;

    render() {
        return (
            <FlatList
                data={WeatherStore.dailyDataSource}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={this.createKeyExtractor}
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

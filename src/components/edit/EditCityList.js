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
import EditCityItem from "./EditCityItem.js"; //编辑城市控件
import StateStore from '../../stores/StateStore.js'; //城市状态数据库

//编辑城市列表
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
                data={StateStore.cityDataSource}
                keyExtractor={this.createKeyExtractor}
                renderItem={
                    ({item}) =>
                        <EditCityItem
                            cityName={item.cityName}
                            tmp={item.now.tmp}
                            weatherCode={item.now.cond_code}
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
/**
 * Created by lkmc2 on 2017/11/24.
 */
import React, {Component} from 'react';
import { FlatList } from 'react-native';
import HourlyItem from './HourlyItem.js'; //逐小时预报子项
import WeatherStore from '../../stores/WeatherStore.js'; //天气存储数据库
import IconUtil from '../../util/IconUtil.js'; //图标工具类
import DateUtil from '../../util/DateUtil.js'; //日期工具类
import {observer} from 'mobx-react/native';

//逐小时天气预报
@observer
export default class HourlyForecast extends Component {

    /**
     * 生成key迭代器
     * @param item 迭代的项
     * @param index 下标
     */
    createKeyExtractor = (item, index) => item.tmp + index;

    render() {
        return (
            <FlatList
                data={WeatherStore.hourlyDataSource}
                keyExtractor={this.createKeyExtractor}
                renderItem={
                    ({item}) =>
                        <HourlyItem
                            time={DateUtil.getHoursAndMinsByDate(item.time)}
                            txt={item.cond_txt}
                            temp={item.tmp}
                            icon={IconUtil.loadMaxWeatherIcon(item.cond_code)}/>
                }
            />
        );
    }
}

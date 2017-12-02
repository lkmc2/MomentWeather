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


//城市温度控件
@observer
export default class CitiesTemperature extends Component {

    /**
     * 生成key迭代器
     * @param item 迭代的项
     * @param index 下标
     */
    createKeyExtractor = (item, index) => item.tmp_max + index;

    /**
     * 生成一周天气列表
     * @param weatherData 天气信息
     */
    renderWeeklyTempList = (weatherData) => {
        if (weatherData !== null && weatherData.length > 0) {
            return weatherData.map(data =>
                <FlatList
                    data={data.daily_forecast}
                    horizontal={true}
                    key={data.cityName}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={true}
                    keyExtractor={this.createKeyExtractor}
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

    /**
     * 生成一周标题
     * @param weatherData 天气信息
     */
    renderTitle = (weatherData) => {
        if (weatherData !== null && weatherData.length > 0) {
            return weatherData[0].daily_forecast.map(item =>
                <WeeklyDate date={item.date} key={item.date}/>
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
    scrollView: {
        flex: 1,
    },
});
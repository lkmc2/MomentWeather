/**
 * Created by lkmc2 on 2017/11/24.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ScrollView,
    TouchableHighlight,
    RefreshControl,
    Alert,
    NetInfo,
} from 'react-native';
import WeeklyTemperature from '../weekly/WeeklyTemperature.js'; //每周天气控件
import WeeklyDate from "../weekly/WeeklyDate.js"; //每周日期控件
import CityList from "./CityList.js"; //城市列表控件
import DateItem from "./DateItem.js"; //日期显示控件
import WeatherStore from '../../stores/WeatherStore.js'; //天气存储数据库
import StateStore from '../../stores/StateStore.js'; //天气状态数据库
import {observer} from 'mobx-react/native'; //观察者组件


//城市温度控件
@observer
export default class CitiesTemperature extends Component {

    /**
     * 选择某个城市的天气
     * @param data 城市天气数据
     * @param navigate 导航器
     */
    chooseCityWeather = (data, navigate) => {
        WeatherStore.changeCurrentCityName(data.cityName); //改变当前城市名
        // WeatherStore.requestWeatherByName(data.cityName, true); //请求当前城市天气信息
        navigate('TodayPage', {}); //跳转到今天页面
    };

    /**
     * 生成key迭代器
     * @param item 迭代的项
     * @param index 下标
     */
    createKeyExtractor = (item, index) => item.tmp_max + index;

    /**
     * 生成一周天气列表
     * @param weatherData 天气信息
     * @param navigate 导航器
     */
    renderWeeklyTempList = (weatherData, navigate) => {
        if (weatherData !== null && weatherData.length > 0) {
            return weatherData.map(data =>
                <TouchableHighlight
                    key={data.cityName}
                    activeOpacity={0.9}
                    underlayColor='#000'
                    style={{marginTop: 1}}
                    onPress={() => this.chooseCityWeather(data, navigate)}>
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
                </TouchableHighlight>
            );
        }
    };

    /**
     * 生成一周标题
     * @param weatherData 天气信息
     */
    renderTitle = (weatherData) => {
        if (weatherData === null || weatherData === undefined || weatherData.length <= 0) return;

        const data = weatherData[0].daily_forecast; //获取每周天气

        if (data !== null && data !== undefined) { //数据不为空
            return data.map(item =>
                <WeeklyDate date={item.date} key={item.date}/>
            );
        }
    };

    //刷新天气数据
    refreshWeatherData = () => {
        NetInfo.isConnected.fetch().done((isConnected) => { //获取当前网络状态
            if (isConnected) { //网络已连接
                WeatherStore.requestWeatherByName(WeatherStore.currentCityName, true); //根据当前设置的城市名请求数据
                WeatherStore.requestAllCityWeather(); //请求所有天气的数据
            } else { //网络未连接
                Alert.alert('提示', '网络未连接!', [{text: '确定', onPress: () => {}}]);
            }
        });
    };

    render() {
        const {navigate} = this.props; //获取导航器
        const weatherData = StateStore.cityDataSource; //获取城市数据

        return (
            <View
                style={styles.container}>
                <View style={styles.rowView}>
                    <DateItem
                        weather={weatherData}
                    />
                    {this.renderTitle(weatherData)}
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={WeatherStore.loading}
                            onRefresh={this.refreshWeatherData} />
                    }>
                    <View style={styles.rowView}>
                        <CityList navigate={navigate} style={styles.cityList}/>
                        <View style={styles.wrapperView}>
                            {this.renderWeeklyTempList(weatherData, navigate)}
                        </View>
                    </View>
                    <View style={{height:115}}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#efeef4',
        paddingTop: 1,
    },
    rowView: {
        flexDirection: 'row',
    },
    cityList: {
        flex: 3,
    },
    wrapperView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
});
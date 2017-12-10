import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    RefreshControl,
    Alert
} from 'react-native';

import TitleBar from '../components/custom/TitleBar.js'; //标题栏
import MaxWeatherView from '../components/today/MaxWeatherView.js';  //大视野天气展示窗口
import WeeklyList from '../components/weekly/WeeklyList.js'; //一周天气列表
import HourlyForecast from "../components/hourly/HourlyForecast.js"; //逐小时天气预报
import LifeSuggestion from "../components/suggetion/LifeSuggestion.js"; //生活指数
import WeatherStore from '../stores/WeatherStore.js'; //天气存储数据库
import StateStore from '../stores/StateStore.js'; //状态存储数据库
import {observer} from 'mobx-react/native';


@observer
export default class TodayPage extends Component {

    static navigationOptions = { //页面标题
        title: '今日', //标题栏文字
        header: null, //隐藏标题栏
    };

    async componentWillMount() {
        await StateStore.loadSettingData(); //加载设置信息
        await StateStore.loadLocalCityData(); //等待加载本地数据
        if (StateStore.isLocation) { //开启定位
            WeatherStore.getLocation(); //进行定位
        } else { //未开启定位
            this.refreshWeatherData(); //刷新天气数据
        }
    }

    //刷新天气数据
    refreshWeatherData = () => {
        WeatherStore.requestWeatherByName(WeatherStore.currentCityName); //根据当前设置的城市名请求数据
        // WeatherStore.requestAllCityWeather(); //请求所有天气的数据
    };

    render() {
        const {navigate} = this.props.navigation; //获取导航工具

        return (
            <View style={styles.container}>
                <TitleBar index={1} navigate={navigate}/>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={WeatherStore.loading}
                            onRefresh={this.refreshWeatherData} />
                    }>
                    <MaxWeatherView/>
                    <WeeklyList/>
                    <HourlyForecast/>
                    <LifeSuggestion/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});

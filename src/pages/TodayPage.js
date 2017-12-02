import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    RefreshControl,
} from 'react-native';

import TitleBar from '../components/TitleBar.js'; //标题栏
import MaxWeatherView from '../components/MaxWeatherView.js';  //大视野天气展示窗口
import WeeklyList from '../components/weekly/WeeklyList.js'; //一周天气列表
import HourlyForecast from "../components/hourly/HourlyForecast.js"; //逐小时天气预报
import LifeSuggestion from "../components/LifeSuggestion.js"; //生活指数
import WeatherStore from '../stores/WeatherStore.js'; //天气存储数据库
import StateStore from '../stores/StateStore.js'; //状态存储数据库
import {observer} from 'mobx-react/native';

@observer
export default class TodayPage extends Component {

    static navigationOptions = { //页面标题
        title: '今日', //标题栏文字
        header: null, //隐藏标题栏
    };

    componentWillMount() {
        StateStore.loadLocalCityData();
        // WeatherStore.getCurrentPosition();
        this._refreshWeatherData();
    }

    _refreshWeatherData = () => {
        WeatherStore.requestWeatherByName(WeatherStore.currentCityName);
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
                            onRefresh={this._refreshWeatherData} />
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

import React, {Component} from 'react';
import {
    Platform,
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

let city = '北京';
const key = '3ad94afdc775428fb9da709e66d62581';
const forecast_api = `https://free-api.heweather.com/s6/weather/forecast?location=${city}&key=${key}`;
const now_api = `https://free-api.heweather.com/s6/weather/now?location=${city}&key=${key}`;

export default class TodayPage extends Component {
    static navigationOptions = { //页面标题
        title: '今日', //标题栏文字
        header: null, //隐藏标题栏
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this._refreshWeatherData();
        StateStore.loadLocalCityData();
    }

    _refreshWeatherData = () => {
        WeatherStore.requestWeatherByName(WeatherStore.currentCityName);
    };

    render() {
        // const {data} = this.state;
        // const {province,city,adcode,weather,temperature,winddirection,windpower,humidity,reporttime} = this.state;
        const {navigate} = this.props.navigation; //获取导航工具

        return (
            <View style={styles.container}>
                {/*<Text style={styles.text}>{data}</Text>*/}
                {/*<Text style={styles.text}>{province}</Text>*/}
                {/*<Text style={styles.text}>{city}</Text>*/}
                {/*<Text style={styles.text}>{adcode}</Text>*/}
                {/*<Text style={styles.text}>{weather}</Text>*/}
                {/*<Text style={styles.text}>{temperature}</Text>*/}
                {/*<Text style={styles.text}>{winddirection}</Text>*/}
                {/*<Text style={styles.text}>{windpower}</Text>*/}
                {/*<Text style={styles.text}>{humidity}</Text>*/}
                {/*<Text style={styles.text}>{reporttime}</Text>*/}
                <TitleBar title={city} subtitle="Beijing" index={1} navigate={navigate}/>

                <ScrollView
                    contentContainerStyle={styles.scrollview}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={WeatherStore.loading}
                            onRefresh={this._refreshWeatherData}
                            tintColor={'white'}
                            titleColor={'white'}
                            title={WeatherStore.loading?"刷新中...":'下拉刷新'}/>
                    }>
                    <MaxWeatherView style={styles.maxWeatherView}/>
                    <WeeklyList style={styles.weeklyList}/>
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
    scrollview: {

    },
    text: {
        // alignItems: 'center',
        // justifyContent: 'center',
        fontSize: 18,
    },
    maxWeatherView: {
        alignItems: 'center',
    },
    weeklyList: {
        // alignItems: 'center',
    },
});

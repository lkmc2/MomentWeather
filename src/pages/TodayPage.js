import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    RefreshControl,
    NetInfo,
    Alert,
} from 'react-native';

import TitleBar from '../components/custom/TitleBar.js'; //标题栏
import MaxWeatherView from '../components/today/MaxWeatherView.js';  //大视野天气展示窗口
import WeeklyList from '../components/weekly/WeeklyList.js'; //一周天气列表
import HourlyForecast from "../components/hourly/HourlyForecast.js"; //逐小时天气预报
import LifeSuggestion from "../components/suggetion/LifeSuggestion.js"; //生活指数
import WeatherStore from '../stores/WeatherStore.js'; //天气存储数据库
import StateStore from '../stores/StateStore.js'; //状态存储数据库
import {observer} from 'mobx-react/native';

//今天页面
@observer
export default class TodayPage extends Component {

    static navigationOptions = { //页面标题
        title: '今日', //标题栏文字
        header: null, //隐藏标题栏
    };

    async componentWillMount() { //页面加载完成时调用
        await StateStore.loadCurrentCityInfo(); //加载当前城市信息
        await StateStore.loadSettingData(); //加载设置信息
        if (!StateStore.isLoadingEnd) { //如果是第一次加载
            await StateStore.loadLocalCityData(); //等待加载本地数据
        }
        this.refreshWeatherData(); //刷新天气数据
    }


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

    //检查定位状态
    checkLocation = () => {
        if(StateStore.isLoadingEnd && StateStore.isLocation && StateStore.isFirstLocation) { //开启了定位
            WeatherStore.getLocation(); //启动定位
            StateStore.cancelIsFirstLocate(); //标记取消第一次定位
        }
    };

    render() {
        const {navigate} = this.props.navigation; //获取导航工具

        this.checkLocation(); //检查定位状态

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
        backgroundColor: '#f8f6f7',
    },
});

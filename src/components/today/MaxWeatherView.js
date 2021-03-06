/**
 * Created by lkmc2 on 2017/11/22.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import {observer} from 'mobx-react/native'
import WeatherStore from '../../stores/WeatherStore.js'; //引入天气存储数据库
import IconUtil from '../../util/IconUtil.js'; //图标工具类
import DateUtil from '../../util/DateUtil.js'; //日期工具类

//当前城市大图标信息展示控件
@observer
export default class MaxWeatherView extends Component {

    render() {
        let weatherData = WeatherStore.getCurrentCityWeather; //获取城市天气数据
        if (weatherData === null) { //数据为空
            return this.renderLoading(); //显示加载图标
        } else {
            return this.renderHeader(weatherData); //加载界面
        }
    }

    renderLoading = () => {
        return (
            <View style={styles.container}>
                <Image source={require('../../images/weather/rain.png')} style={styles.weatherIcon}/>
                <Text style={styles.updateTime}>Loading</Text>
                <Text style={styles.temperature}>Loading</Text>
                <Text style={styles.weatherDescription}>Loading</Text>
                <Text style={styles.airCondition}>Loading</Text>
            </View>
        )
    };

    renderHeader = (weatherData) => {
        const {
            now:{cond_code, cond_txt, tmp, hum}, //天气代码，天气描述，温度，空气质量
            update:{ loc }, //更新时间
        } = weatherData;

        return (
            <View style={styles.container}>
                <Image source={IconUtil.loadMaxWeatherIcon(cond_code)} style={styles.weatherIcon}/>
                <Text style={styles.updateTime}>更新：{DateUtil.getHoursAndMinsByDate(loc)}</Text>
                <Text style={styles.temperature}>{tmp}℃</Text>
                <Text style={styles.weatherDescription}>{cond_txt}</Text>
                <Text style={styles.airCondition}>{hum} 空气质量{hum < 50 ? '优':'良'}</Text>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        height: 370,
        backgroundColor: '#f8f6f7',
        alignItems: 'center',
    },
    weatherIcon: { //天气图标
        width: 200,
        height: 200,
    },
    updateTime: { //更新时间
        fontSize: 13,
    },
    temperature: { //当前温度
        fontSize: 22,
        fontWeight: 'bold',
    },
    weatherDescription: { //天气描述
        fontSize: 34,
        fontWeight: 'bold',
    },
    airCondition: { //空气质量
        fontSize: 13,
        backgroundColor: '#b9db62',
        padding: 3,
        borderRadius: 5,
    },
});
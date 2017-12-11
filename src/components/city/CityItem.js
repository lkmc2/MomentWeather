/**
 * Created by lkmc2 on 2017/11/24.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight
} from 'react-native';
import IconUtil from '../../util/IconUtil.js'; //图标工具类
import WeatherStore from '../../stores/WeatherStore.js'; //天气存储数据库
import StateStore from '../../stores/StateStore.js'; //天气状态数据库

export default class CityItem extends Component {

    /**
     * 选择某个城市的天气
     * @param cityName
     * @param navigate 导航器
     */
    chooseCityWeather = (cityName, navigate) => {
        WeatherStore.currentCityName = cityName;
        WeatherStore.currentCityNameEng = StateStore.getFullCityName(cityName);
        navigate('TodayPage', {}); //跳转到今天页面
    };

    render() {
        //城市名、城市英文名、空气质量、天气代码、温度、导航器
        const {cityName, air, weatherCode, temperature, navigate} = this.props;

        return (
            <TouchableHighlight
                key={cityName}
                activeOpacity={0.7}
                underlayColor='green'
                onPress={() => this.chooseCityWeather(cityName, navigate)}>
                <View style={styles.container}>
                    <Text style={styles.city}>{cityName}</Text>
                    <Text style={styles.air}>{air}{air < 50 ? '优' : '良'}</Text>
                    <View style={styles.wrapperView}>
                        <Image source={IconUtil.loadMaxWeatherIcon(weatherCode)} style={styles.icon}/>
                        <Text style={styles.temp}>{temperature}℃</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 90,
        backgroundColor: '#ffb4a2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    city: {
        fontSize: 16,
        textAlign: 'center',
    },
    air: {
        fontSize: 12,
        backgroundColor: '#b9db62',
        borderRadius: 3,
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
    wrapperView: {
        flexDirection: 'row',
        width: 60,
        justifyContent: 'center',
    },
    icon: {
        width: 20,
        height: 20,
    },
    temp: {
        fontSize: 12,
    },
});
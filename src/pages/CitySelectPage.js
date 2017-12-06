/**
 * Created by lkmc2 on 2017/11/25.
 */
'use strict';
import React, {Component,} from 'react';
import {View, StatusBar,} from 'react-native'
import {observer} from 'mobx-react/native'
import WeatherStore from '../stores/WeatherStore.js'; //天气存储数据库
import StateStore from '../stores/StateStore.js'; //天气状态数据库
import CitySelect from '../components/city/CitySelect.js'; //城市选择器

//城市选择界面
@observer
export default class CitySelected extends Component {

    static navigationOptions = {
        title: '选择城市'
    };


    /**
     * 处理CitySelect控件选择城市后的回调方法
     * @param cityObj 城市对象
     */
    handleCitySelect = (cityObj) => {
        WeatherStore.changeCurrentCityName(cityObj.cityName); //改变当前城市名
        WeatherStore.requestWeatherByName(cityObj.cityName); //用城市名请求天气数据
        let navigation = this.props.navigation; //获取导航工具
        navigation.goBack(); //返回上一页
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <CitySelect
                    header={false}
                    selectCity={this.handleCitySelect}
                    style={{flex: 1}}
                />
            </View>
        )
    }
}
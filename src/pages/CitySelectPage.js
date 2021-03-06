/**
 * Created by lkmc2 on 2017/11/25.
 */
'use strict';
import React, {Component,} from 'react';
import {View} from 'react-native'
import {observer} from 'mobx-react/native'
import WeatherStore from '../stores/WeatherStore.js'; //天气存储数据库
import CitySelect from '../components/city/CitySelect.js'; //城市选择器
import InputTool from "../components/custom/InputTool"; //输入框工具

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
        if (typeof  cityObj === "string") {
            WeatherStore.requestWeatherByName(cityObj, true); //用城市名请求天气数据
        } else {
            WeatherStore.requestWeatherByName(cityObj.cityName, true); //用城市名请求天气数据
        }

        let navigation = this.props.navigation; //获取导航工具
        navigation.goBack(); //返回上一页
    };

    render() {
        return (
            <View>
                <InputTool
                    selectCity={this.handleCitySelect}/>
                <CitySelect
                    header={false}
                    selectCity={this.handleCitySelect}
                />
            </View>
        )
    }
}
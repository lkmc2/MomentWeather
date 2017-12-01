/**
 * Created by lkmc2 on 2017/11/25.
 */
'use strict';
import React, { Component,  } from 'react';
import {Text, View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native'
import {observer} from 'mobx-react/native'
import CITYDATA from '../util/CityData'
import stateStore from '../stores/StateStore'
import weatherStore from '../stores/WeatherStore'
import CitySelect from '../components/city/CitySelect'

@observer
export default class CitySelected extends Component {

    static navigationOptions = {
        title: '选择城市'
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            cityText: '',
            cityId: '',
        }
    }


    handleCitySelect =
        (cityObj) => {
        stateStore.currentCityEngName = cityObj.cityNameEn.toLowerCase();
        weatherStore.requestWeatherByName(cityObj.cityName);
        let navigation=this.props.navigation;
        navigation.goBack();
    };


    renderCitySelect = () => {
        return (
            <CitySelect
                header={false}
                selectCity={this.handleCitySelect}
                cityData={CITYDATA}
                style={{flex:1}}
            />
        )
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle={'dark-content'}></StatusBar>
                {this.renderCitySelect()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center'
    }
});
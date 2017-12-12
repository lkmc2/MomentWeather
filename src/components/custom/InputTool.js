/**
 * Created by lkmc2 on 2017/12/12.
 */

'use strict';
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    TextInput,
    Button,
} from 'react-native';
import WeatherState from '../../stores/WeatherStore.js'; //天气存储数据库

//输入框工具
export default class InputTool extends Component {

    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    //查询城市名称
    searchForCityName = () => {
        const cityName = this.state.text; //获取输入框中的文字
        if (cityName !== '') { //城市名非空
            WeatherState.requestWeatherByName(cityName, true); //根据城市名请求天气预报
        }
    };

    render() {
        return (
            <View style={[styles.container]}>
                <TextInput
                    style={styles.input}
                    placeholder="搜索城市名"
                    onChangeText={(text) => this.setState({text})}/>
                <Button
                    style={styles.button}
                    title="确认"
                    onPress={() => this.searchForCityName()}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(100,100,100,0.1)'
    },
    input: {
        height: 40,
        flex: 5,
    },
    button: {
        height: 40,
        flex: 2,
    }
});
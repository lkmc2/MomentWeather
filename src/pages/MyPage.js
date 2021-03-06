/**
 * Created by lkmc2 on 2017/11/5.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import TitleBar from '../components/custom/TitleBar.js'; //标题栏
import CitiesTemperature from "../components/city/CitiesTemperature";

//我的页面
export default class MyPage extends Component {
    static navigationOptions = { //页面标题
        title: '我的', //标题栏文字
        header: null, //隐藏标题栏
    };

    render() {
        const {navigate} = this.props.navigation; //获取导航工具

        return (
            <View style={styles.container}>
                <TitleBar index={2} navigate={navigate}/>
                <CitiesTemperature navigate={navigate}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efeef4',
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
    },
});

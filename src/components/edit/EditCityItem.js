/**
 * Created by lkmc2 on 2017/12/3.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import IconUtil from '../../util/IconUtil.js'; //图标工具
import Divider from "../Divider"; //图标工具
import StateStore from '../../stores/StateStore.js'; //天气状态数据库
const deviceWidth = Dimensions.get('window').width; //屏幕宽

//编辑城市列表的子项
export default class EditCityItem extends Component {
    render() {
        //城市名、当前温度、天气代码
        const {cityName, tmp, weatherCode} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <TouchableOpacity style={styles.subView} onPress={() => StateStore.removeCityByName(cityName)}>
                        <Image source={require('../../images/icon/ic_delete.png')} style={styles.iconDelete}/>
                    </TouchableOpacity>
                    <View style={styles.subView}>
                        <Text>{cityName}</Text>
                    </View>
                    <View style={styles.subView}>
                        <Text>{tmp}℃</Text>
                    </View>
                    <View style={styles.subView}>
                        <Image source={IconUtil.loadMaxWeatherIcon(weatherCode)} style={styles.iconWeather}/>
                    </View>
                </View>
                <Divider/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: deviceWidth,
        height: 61,
    },
    subContainer: {
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#ffb82d',
        alignItems: 'center',
    },
    subView: { //子界面
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
    },
    iconWeather: { //天气图标
        width: 30,
        height: 30,
    },
    iconDelete: { //删除图标
        width: 20,
        height: 20,
    },
});
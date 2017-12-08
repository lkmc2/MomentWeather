/**
 * Created by lkmc2 on 2017/11/5.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Switch,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';

import TitleBar from '../components/TitleBar.js'; //标题栏
import Divider from '../components/Divider.js' //分隔线
import StateStore from '../stores/StateStore.js'; //天气状态数据库
import WeatherStore from '../stores/WeatherStore.js';//天气存储数据库

export default class MorePage extends Component {
    static navigationOptions = { //页面标题
        title: '更多', //标题栏文字
        header: null, //隐藏标题栏
    };

    constructor(props) {
        super(props);
        this.state = {
            locationAble: StateStore.isLocaton,
            voiceAble: true
        }
    }


    //展示清除成功弹窗
    showClearDialog = () => {
        Alert.alert('提示', '清除成功!', [{
            text: '确定', onPress: () => {
            }
        }]);
    };

    //改变定位按钮的状态
    changeLocationSwitchState = () => {
        StateStore.locate = !this.state.locationAble;
        this.setState({
            locationAble: !this.state.locationAble
        });
        if (StateStore.isLocaton) { //定位开启
            WeatherStore.getLocation(); //进行定位
        }
    };

    //改变语音按钮的状态
    changeVoiceSwitchState = () => {
        this.setState({
            voiceAble: !this.state.voiceAble
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <TitleBar index={3}/>
                <ScrollView>
                    <View style={{flex: 1, backgroundColor: 'rgb(239,238,244)'}}>
                        <View style={[styles.itemContainer, {marginTop: 20}]}>
                            <Text style={styles.title}>自动定位</Text>
                            <Switch style={styles.itemRight}
                                    value={this.state.locationAble}
                                    onValueChange={this.changeLocationSwitchState}/>
                        </View>
                        <Divider dividerHeight={1}/>
                        <View style={styles.itemContainer}>
                            <Text style={styles.title}>自动语音播报</Text>
                            <Switch
                                style={styles.itemRight}
                                value={this.state.voiceAble}
                                onValueChange={this.changeVoiceSwitchState}/>
                        </View>
                        <Divider dividerHeight={1}/>
                        <TouchableOpacity onPress={this.showClearDialog}>
                            <View style={styles.itemContainer}>
                                <Text style={styles.title}>清除缓存</Text>
                                <Image source={require('../images/icon/ic_arrow_right.png')} style={styles.arrow}/>
                            </View>
                        </TouchableOpacity>

                        <Divider dividerHeight={1}/>
                        <View style={[styles.itemContainer, {marginTop: 40}]}>
                            <Text style={styles.title}>关于我们</Text>
                            <Image source={require('../images/icon/ic_arrow_right.png')} style={styles.arrow}/>
                        </View>
                        <Divider dividerHeight={1}/>
                        <View style={styles.itemContainer}>
                            <Text style={styles.title}>当前版本</Text>
                            <Text style={[styles.title, {marginRight: 20}]}>V1.0.0</Text>
                        </View>
                        <Divider dividerHeight={1}/>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        marginLeft: 20,
        fontSize: 15
    },

    itemContainer: {
        flexDirection: 'row',
        height: 40,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemRight: {
        marginRight: 20
    },
    arrow: {
        width: 20,
        height: 20,
        marginRight: 20,
    },
});

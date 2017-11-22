/**
 * Created by lkmc2 on 2017/11/5.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import TitleBar from '../components/TitleBar.js'; //标题栏
import PicConfig from '../config/PicConfig'; //图片配置信息

export default class MyPage extends Component<{}> {
    static navigationOptions = { //页面标题
        title: '我的', //标题栏文字
        // header: null, //隐藏标题栏
    };

    render() {
        alert("PicConfig.ic_edit="+PicConfig.ic_edit);
        return (
            <View style={styles.container}>
                <TitleBar title="我的" subtitle="Mine" index={2}/>
                <Text style={styles.text}>我的页面</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
    },
});

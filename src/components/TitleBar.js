/**
 * Created by lkmc2 on 2017/11/21.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

export default class TitleBar extends Component {
    render() {
        const {title, subtitle, index} = this.props; //获取标题，子标题，页面下标

        let leftIcon, rightIcon; //标题栏左右图标

        // if (index === 1) { //今日页面
        //     leftIcon = require('../images/ic_my.png');
        //     rightIcon = require('../images/ic_share.png');
        // } else if (index === 2) { //我的页面
        //     leftIcon = require('../images/ic_edit.png');
        //     rightIcon = require('../images/ic_plus.png');
        // } else { //更多页面
        //     leftIcon = null;
        //     rightIcon = null;
        // }

        if (index !== 3) { //标题栏下标不为3
            leftIcon = index === 1 ? require('../images/icon/ic_my.png') : require('../images/icon/ic_edit.png'); //设置左图标
            rightIcon = index === 1 ? require('../images/icon/ic_share.png') : require('../images/icon/ic_plus.png'); //设置右图标
        }


        return (
            <View style={styles.container}>
                <Image source={leftIcon} style={styles.icon}/>
                <View style={styles.centerView}>
                    <Text style={styles.text}>{title}</Text>
                    <Text>{subtitle}</Text>
                </View>
                <Image source={rightIcon} style={styles.icon}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#9fbbff',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    centerView: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
    icon: {
        width: 30,
        height: 30,
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
    },
});
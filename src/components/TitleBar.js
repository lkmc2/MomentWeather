/**
 * Created by lkmc2 on 2017/11/21.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

export default class TitleBar extends Component {

    /**
     * 根据下标获取对应的按钮信息
     * @param index 页面下标
     * @param navigate 导航器
     * @returns {*} 按钮信息对象
     */
    getButtonInfoByIndex = (index, navigate) => {
        if (index === 3) return {}; //更多界面返回空对象

        if (index === 1) { //今日页面
            return {
                leftIcon: require('../images/icon/ic_my.png'), //标题栏左图标
                rightIcon: require('../images/icon/ic_share.png'), //标题栏右图标
                onPressLeft: () => navigate('MyPage', {}), //点击左边按钮事件
                onPressRight: () => navigate('MyPage', {}), //点击右按钮事件
            }
        } else if (index === 2) { //我的页面
            return {
                leftIcon: require('../images/icon/ic_edit.png'), //标题栏左图标
                rightIcon: require('../images/icon/ic_plus.png'), //标题栏右图标
                onPressLeft: () => navigate('CitySelected', {}), //点击左边按钮事件
                onPressRight: () => navigate('CitySelected', {}), //点击右按钮事件
            }
        }
    };

    render() {
        const {title, subtitle, index, navigate} = this.props; //获取标题，子标题，页面下标

        //获取标题栏左图标、右图标、左图标点击事件、右图标点击事件
        const {leftIcon, rightIcon, onPressLeft, onPressRight} = this.getButtonInfoByIndex(index, navigate);

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.iconWrapper} onPress={onPressLeft}>
                    <Image source={leftIcon} style={styles.icon}/>
                </TouchableOpacity>
                <View style={styles.centerView}>
                    <Text style={styles.text}>{title}</Text>
                    <Text>{subtitle}</Text>
                </View>
                <TouchableOpacity style={styles.iconWrapper} onPress={onPressRight}>
                    <Image source={rightIcon} style={styles.icon}/>
                </TouchableOpacity>
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
        width: 40,
        height: 40,
    },
    iconWrapper: {
        width: 40,
        height: 40,
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
    }
});
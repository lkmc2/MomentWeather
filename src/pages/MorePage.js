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

export default class MorePage extends Component {
    static navigationOptions = { //页面标题
        title: '更多', //标题栏文字
        header: null, //隐藏标题栏
    };

    showClearDialog = ( )=> {
        Alert.alert('提示','清除成功!')
    };

    render() {
        return (
            <View style={styles.container}>
                <TitleBar index={3}/>
                <ScrollView>
                    <View style={{flex: 1,backgroundColor:'rgb(239,238,244)'}}>
                        <View style={[styles.itemContainer,{marginTop:20}]}>
                            <Text style={styles.text}>自动定位</Text>
                            <Switch style={styles.itemRight}/>
                        </View>
                        <Divider dividerHeight={1}/>
                        <View style={styles.itemContainer}>
                            <Text style={styles.text}>自动语音播报</Text>
                            <Switch style={styles.itemRight}/>
                        </View>
                        <Divider dividerHeight={1}/>
                        <TouchableOpacity onPress={this.showClearDialog}>
                            <View style={styles.itemContainer}>
                                <Text style={styles.text}>清除缓存</Text>
                                <Image source={require('../images/icon/ic_arrow_right.png')} style={styles.arrow}/>
                            </View>
                        </TouchableOpacity>

                        <Divider dividerHeight={1}/>
                        <View style={[styles.itemContainer,{marginTop:40}]}>
                            <Text style={styles.text}>关于我们</Text>
                            <Image source={require('../images/icon/ic_arrow_right.png')} style={styles.arrow}/>
                        </View>
                        <Divider dividerHeight={1}/>
                        <View style={styles.itemContainer}>
                            <Text style={styles.text}>当前版本</Text>
                            <Text style={[styles.text,{marginRight:20}]}>V1.0.0</Text>
                        </View>
                        <Divider dividerHeight={1}/>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
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

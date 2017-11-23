/**
 * Created by lkmc2 on 2017/11/22.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
} from 'react-native';

export default class WeeklyList extends Component {
    render() {
        return (
            <FlatList contentContainerStyle={styles.container}
                      horizontal={true}
                      data={[
                          {key:'Devin'},
                          {key:'Jackson'},
                          {key:'James'},
                          {key: 'Joel'},
                          {key:'Jililian'},
                      ]}
                      renderItem={({item}) => <Text style={styles.itme}>{item.key}</Text>}>

            </FlatList>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 150,
        backgroundColor: '#ffad26',
        alignItems: 'center',
        flex: 1,
    },
    weatherIcon: { //天气图标
        width: 200,
        height: 200,
    },
    updateTime: { //更新时间
        fontSize: 13,
    },
    temperature: { //当前温度
        fontSize: 22,
        fontWeight: 'bold',
    },
    weatherDescription: { //天气描述
        fontSize: 34,
        fontWeight: 'bold',
    },
    airCondition: { //空气质量
        fontSize: 13,
        backgroundColor: '#b9db62',
        padding: 3,
        borderRadius: 5,
    },
});
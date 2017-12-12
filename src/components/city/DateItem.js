/**
 * Created by lkmc2 on 2017/11/25.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
} from 'react-native';

export default class DateItem extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.day}>25</Text>
                <View>
                    <Text style={styles.title}>11月</Text>
                    <Text style={styles.title}>周六</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 50,
        backgroundColor: '#fbfbfb',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    day: {
        fontSize: 23,
    },
    title: {
        fontSize: 12,
        marginLeft: 2,
    }
});
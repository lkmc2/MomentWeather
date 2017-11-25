/**
 * Created by lkmc2 on 2017/11/25.
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
import CityItem from "./CityItem";

export default class CityList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.day}>25</Text>
                <View>
                    <Text style={styles.text}>11月</Text>
                    <Text style={styles.text}>周六</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        backgroundColor: '#ffb4a2',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    day: {
        fontSize: 23,
    },
    text: {
        fontSize: 12,
        marginLeft: 2,
    }
});
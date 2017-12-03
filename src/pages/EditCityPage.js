/**
 * Created by lkmc2 on 2017/12/3.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import EditCityList from "../components/edit/EditCityList.js"; //编辑城市列表

export default class App extends Component<{}> {
    static navigationOptions = {
        title: '编辑城市'
    };

    render() {
        return (
            <View style={styles.container}>
                <EditCityList/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffc591',
    },
});
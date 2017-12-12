/**
 * Created by lkmc2 on 2017/11/23.
 */
'use strict';
import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native';

//分隔线
export default class Divider extends Component {

    render() {
        let dividerHeight = this.props.dividerHeight; //分隔线高度
        if (dividerHeight === null)
            dividerHeight=1;
        return (
            <View style={[styles.container,{height:dividerHeight}]}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(100,100,100,0.1)'
    },
});
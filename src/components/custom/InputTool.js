/**
 * Created by lkmc2 on 2017/12/12.
 */

'use strict';
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    TextInput,
    Alert,
} from 'react-native';

//输入框工具
export default class InputTool extends Component {

    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    //查询城市名称
    searchForCityName = () => {
        const cityName = this.state.text; //获取输入框中的文字
        if (cityName !== '') { //城市名非空
            this.props.selectCity(cityName);
        } else { //城市名为空
            Alert.alert('提示', '城市名不能为空!', [{
                text: '确定', onPress: () => {
                }
            }]);
        }
    };

    render() {
        return (
            <View style={[styles.container]}>
                <TextInput
                    style={styles.input}
                    placeholder="搜索城市名"
                    underlineColorAndroid='transparent'
                    onSubmitEditing={() => this.searchForCityName()}
                    onChangeText={(text) => this.setState({text})}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        backgroundColor: '#f4f4f4',
    },
    input: {
        height: 36,
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#fff',
        marginTop: 2,
        fontSize: 14,
        textAlign: 'center',
    },
    button: {
        height: 30,
        marginRight: 10,
    }
});
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


export default class TitleBar extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../images/my_icon.png')}/>
                <Text style={styles.text}>{this.props.city}</Text>
                <Image source={require('../images/share_icon.png')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 100,
        backgroundColor: '#F5FCFF',
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
    },
});
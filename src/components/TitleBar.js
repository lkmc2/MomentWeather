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
        const {title, subtitle, leftIcon, rightIcon} = this.props;

        return (
            <View style={styles.container}>
                {leftIcon ? <Image source={require(leftIcon)} style={styles.icon}/> : null}
                <View style={styles.centerView}>
                    <Text style={styles.text}>{title}</Text>
                    <Text>{subtitle}</Text>
                </View>
                {rightIcon ? <Image source={require(rightIcon)} style={styles.icon}/> : null}
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
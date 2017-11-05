import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

const api = 'http://restapi.amap.com/v3/weather/weatherInfo?key=fab76b6f3301b1804e9ab390eac37dfa&city=110101';

export default class TodayPage extends Component<{}> {
    static navigationOptions = { //页面标题
        title: '今天', //标题栏文字
        // header: null, //隐藏标题栏
    };

    constructor(props) {
        super(props);
    }

    state = {
        data: '',
    };

    fetchData = () => {
        return fetch(api) //拼接请求的网址
            .then((response) => response.text())
            .catch((error) => {
                console.error(error);
            })
    };

    async componentDidMount() { //组件挂载时调用的方法
        const result = await this.fetchData(); //加载更多数据，使用await后，下一行代码将等到await行执行完成后才会执行
        this.setState({
            data: result, //设置第一次加载数据完成
        })
    }

    render() {
        const {data} = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.text}>{data}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
    },
});

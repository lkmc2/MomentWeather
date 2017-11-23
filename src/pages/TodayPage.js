import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';

import TitleBar from '../components/TitleBar.js'; //标题栏
import PicConfig from '../config/PicConfig'; //图片配置信息
import MaxWeatherView from '../components/MaxWeatherView';  //大视野天气展示窗口
import WeeklyList from '../components/WeeklyList.js'; //一周天气列表

let city = '北京';
const key = '3ad94afdc775428fb9da709e66d62581';
const forecast_api = `https://free-api.heweather.com/s6/weather/forecast?location=${city}&key=${key}`;
const now_api = `https://free-api.heweather.com/s6/weather/now?location=${city}&key=${key}`;

export default class TodayPage extends Component {
    static navigationOptions = { //页面标题
        title: '今日', //标题栏文字
        // header: null, //隐藏标题栏
    };

    constructor(props) {
        super(props);
    }

    state = {
        data: '',
        province: '', //省份名
        city: '', //城市名
        adcode: '', //区域编码
        weather: '', //天气现象，天气现象对应描述
        temperature: '', //实时气温，单位：摄氏度
        winddirection: '', //风向，风向编码对应描述
        windpower: '', //风力，此处返回的是风力编码，风力编码对应风力级别，单位：级
        humidity: '', //空气湿度
        reporttime: '', //数据发布的时间
    };

    fetchData = () => {
        return fetch(api) //拼接请求的网址
            .then((response) => response.text())
            .then((responseText) => {
                const json = JSON.parse(responseText); //使用JSON对象解析json，出错时可以抛异常
                this.setState({
                    // movies: json.subjects, //使用网络电影数据替换本地数据
                    refreshing: false, //将FlatList的刷新状态设置为false
                });
                this.isRefreshing = false; //设置数据不在刷新
                return json; //返回json数据
            })
            .catch((error) => {
                console.error(error);
            })
    };

    async componentDidMount() { //组件挂载时调用的方法
        const result = await this.fetchData(); //加载更多数据，使用await后，下一行代码将等到await行执行完成后才会执行
        const {status, infocode, lives} = result;

        // this.setState({
        //     data: result, //设置第一次加载数据完成
        // })
    }

    render() {
        // const {data} = this.state;
        // const {province,city,adcode,weather,temperature,winddirection,windpower,humidity,reporttime} = this.state;
        const {navigate} = this.props.navigation; //获取导航工具

        return (
            <View style={styles.container}>
                {/*<Text style={styles.text}>{data}</Text>*/}
                {/*<Text style={styles.text}>{province}</Text>*/}
                {/*<Text style={styles.text}>{city}</Text>*/}
                {/*<Text style={styles.text}>{adcode}</Text>*/}
                {/*<Text style={styles.text}>{weather}</Text>*/}
                {/*<Text style={styles.text}>{temperature}</Text>*/}
                {/*<Text style={styles.text}>{winddirection}</Text>*/}
                {/*<Text style={styles.text}>{windpower}</Text>*/}
                {/*<Text style={styles.text}>{humidity}</Text>*/}
                {/*<Text style={styles.text}>{reporttime}</Text>*/}
                <TitleBar title={city} subtitle="Beijing" index={1} navigate={navigate}/>

                <ScrollView contentContainerStyle={styles.scrollview}>
                    <MaxWeatherView style={styles.maxWeatherView}/>
                    <WeeklyList style={styles.weeklyList}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    scrollview: {
        flex: 1,
    },
    text: {
        // alignItems: 'center',
        // justifyContent: 'center',
        fontSize: 18,
    },
    maxWeatherView: {
        alignItems: 'flex-start',
    },
    weeklyList: {
        // alignItems: 'center',
    },
});

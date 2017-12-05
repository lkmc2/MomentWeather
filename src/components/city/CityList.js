/**
 * Created by lkmc2 on 2017/11/25.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import CityItem from "./CityItem.js"; //城市控件
import StateStore from '../../stores/StateStore.js'; //天气状态数据库
import {observer} from 'mobx-react/native';

//城市列表
@observer
export default class CityList extends Component {

    /**
     * 生成城市列表
     * @param weatherData 城市天气数据
     * @param navigate 导航器
     */
    renderCityList = (weatherData, navigate) => {
        if (weatherData !== null && weatherData.length > 0) {
            return weatherData.map(item =>
                <CityItem
                    cityName={item.cityName}
                    cityNameEng={item.cityNameEng}
                    air={item.now.hum}
                    key={item.cityName}
                    navigate={navigate}
                    weatherCode={item.now.cond_code}
                    temperature={item.now.tmp}
                />
            );
        }
    };

    render() {
        const {navigate} = this.props; //获取导航器
        const weatherData = StateStore.cityDataSource; //获取城市数据

        return (
            <View style={styles.container}>
                {this.renderCityList(weatherData, navigate)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        backgroundColor: '#ffb4a2',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
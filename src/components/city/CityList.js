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
import DateItem from "./DateItem";

const citiesData = [
    {city:'南宁', air:'22 优', icon:'', temperature:'11'},
    {city:'上海', air:'57 良', icon:'', temperature:'15'},
    {city:'北京', air:'53 良', icon:'', temperature:'14'},
    {city:'纽约', air:'22 优', icon:'', temperature:'15'},
];

export default class CityList extends Component {
    render() {
        let renderCityList = citiesData.map(item =>
            <CityItem
                city={item.city}
                air={item.air}
                icon={item.icon}
                temperature={item.temperature}
            />
        );

        return (
            <View style={styles.container}>
                <DateItem/>
                {renderCityList}
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
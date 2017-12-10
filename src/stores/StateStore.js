/**
 * Created by lkmc2 on 2017/11/29.
 */
'use strict';
import {observable, computed} from 'mobx';
import {
    Alert,
    AsyncStorage,
} from 'react-native';
import WeatherStore from './WeatherStore.js';//天气存储数据库
import pinyin from 'pinyin'; //汉字转英文工具


class StateStore {

    @observable cityList = []; //城市列表
    @observable locate = true; //是否定位

    /**
     * 获取城市数据
     * @returns 城市数据
     */
    @computed get cityDataSource() {
        return this.cityList.slice(0);
    }

    @computed get isLocation() {
        return this.locate;
    }


    /**
     * 根据名字移除城市
     * @param name 城市名
     */
    removeCityByName = (name) => {
        if (this.cityList.length <= 1) {//列表只剩最后一项不删除
            Alert.alert('提示', '最后一项无法删除!', [{
                text: '确定', onPress: () => {
                }
            }]);
            return;
        }

        let index = -1;
        for (let i = 0; i < this.cityList.length; i++) { //找到城市列表中同名的下标
            if (this.cityList[i].cityName === name) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            this.cityList.splice(index, 1); //在cityList中从index位置删除一个数据
            WeatherStore.changeCurrentCityName(this.cityList[0].cityName); //改变当前城市名
            stateStore.saveLocalCityData(); //存储当前城市列表数据
        }
    };

    /**
     * 保存本地城市信息
     */
    saveLocalCityData = () => {
        AsyncStorage.setItem('cities', JSON.stringify(this.cityList), (error) => {
            if (error) {
                Alert.alert('提示', '存储数据失败!');
            } else {
                Alert.alert('提示', '数据存储成功');
            }
        });
    };

    /**
     * 通过城市中文名获取城市的英文名
     * @param cityName 城市中文名
     * @returns 城市英文名
     */
    getFullCityName = (cityName) => {
        if (cityName === '邕宁') return 'Yongning';

        let array = pinyin(cityName, {style: pinyin.STYLE_NORMAL}); //将中文转换成英文数组
        let fullCityName = "";

        if (array !== undefined && array.length > 0) {
            let word = array[0].toString();
            array[0] = word[0].toUpperCase() + word.slice(1);

            fullCityName = array.join("");
        }
        return fullCityName;
    };


    /**
     * 加载本地城市信息
     */
    loadLocalCityData = () => {
        return AsyncStorage.getItem('cities', (error, result) => {
            if (error) {
                Alert.alert('提示', '数据获取失败!');
            } else {
                Alert.alert('提示', '数据库获取成功!');
                let array = JSON.parse(result);
                for (let i = 0; i < array.length; i++) {
                    this.cityList.push(array[i]);
                }
            }
        }).done();
    };

    // /**
    //  * 移除数据中重复的项目
    //  * @param array 数组
    //  * @returns 移除重复项目后的数据
    //  */
    // removeDuplicatedItem(array) {
    //     let ret = [];
    //
    //     array.forEach((value, index, ar) => {
    //         if (ar.indexOf(value) === index) {
    //             ret.push(value);
    //         }
    //     });
    //
    //     return ret;
    // }

}

const stateStore = new StateStore();
export default stateStore;
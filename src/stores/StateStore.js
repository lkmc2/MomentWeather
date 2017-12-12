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

//天气状态数据库
class StateStore {

    @observable cityList = []; //城市列表
    @observable locate = true; //是否定位
    @observable isLoadingEnd = false; //状态加载完成
    @observable isFirstLocation = true; //第一次定位

    /**
     * 获取城市数据
     * @returns 城市数据
     */
    @computed get cityDataSource() {
        return this.cityList.slice(0);
    }

    //获取是否定位
    @computed  get isLocation() {
        return this.locate;
    }

    //设置标记取消第一次定位
    cancelIsFirstLocate = () => {
          this.isFirstLocation = false;
    };

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
            array[0] = word[0].toUpperCase() + word.slice(1); //将城市英文名第一个字母变成大写

            fullCityName = array.join(""); //拼接城市名
        }
        return fullCityName;
    };

    //转换定位状态
    changeLocateState = () => {
        const state = !this.locate; //获取定位状态
        this.locate = state; //设置是否定位
        this.saveSettingData(state); //保存设置数据
    };

    /**
     * 加载本地城市信息
     */
    loadLocalCityData = () => {
        return AsyncStorage.getItem('cities', (error, result) => {
            if (!error) { //获取信息正确
                let array = JSON.parse(result); //解析成数组

                if (array === null || array === undefined) return; //数组非空

                for (let i = 0; i < array.length; i++) {
                    this.cityList.push(array[i]); //将数据填充到城市列表
                }
            }
        }).done();
    };

    /**
     * 保存所有本地城市信息
     */
    saveLocalCityData = () => {
        AsyncStorage.setItem('cities', JSON.stringify(this.cityList)); //保存城市列表到数据库
    };

    /**
     * 保存当前城市信息
     */
    saveCurrentCityInfo = (info) => {
        WeatherStore.currentCityInfo = info; //设置当前城市信息
        AsyncStorage.setItem('currentCity', JSON.stringify(info)); //保存当前城市信息
    };

    /**
     * 加载当前城市信息
     */
    loadCurrentCityInfo = () => {
        return AsyncStorage.getItem('currentCity', (error, result) => {
            if (!error) { //获取信息正确
                const  data = JSON.parse(result); //解析数据

                if (data !== undefined && data !== null) { //数据非空
                    WeatherStore.currentCityInfo = data; //设置当前城市数据
                    WeatherStore.changeCurrentCityName(data.cityName); //设置当前城市名称
                }
            }
        }).done();
    };

    /**
     * 保存设置信息
     * @param isLocate 是否定位
     */
    saveSettingData = (isLocate) => {
        AsyncStorage.multiSet([["isLocate",isLocate.toString()]]); //设置定位信息
    };

    //加载设置信息
    loadSettingData = () => {
        AsyncStorage.multiGet(['isLocate'], (error, stores) => { //加载定位信息
            if(!error) { //加载正确
                this.locate = stores[0][1] === null || stores[0][1] === "true"; //获取定位状态
                this.isLoadingEnd = true; //设置加载结束
            }
        }).done();
    };

}

const stateStore = new StateStore();
export default stateStore;
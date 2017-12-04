/**
 * Created by lkmc2 on 2017/11/29.
 */
'use strict';
import {observable, computed, asMap, autorun} from 'mobx';
import {StyleSheet, ListView} from 'react-native';
import storage from '../config/StorageConfig.js'; //存储器
import WeatherStore from './WeatherStore.js'; //天气存储数据库


class StateStore {

    @observable cityList = []; //城市列表

    /**
     * 获取城市数据
     * @returns 城市数据
     */
    @computed get cityDataSource() {
        return this.cityList.slice(0);
    }

    /**
     * 根据名字移除城市
     * @param name 城市名
     */
    removeCityByName = (name) => {
        if (this.cityList.length <= 1) return; //列表只剩最后一项不删除

        let index = -1;
        for (let i = 0; i < this.cityList.length; i++) {
            if (this.cityList[i].cityName === name) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            this.cityList.splice(index, 1);
            stateStore.saveLocalCityData();
            WeatherStore.currentCityName = this.cityList[0].cityName;
        }
    };

    /**
     * 保存本地城市信息
     */
    saveLocalCityData = () => {
        storage.save({
            key: 'cities',
            data: JSON.stringify(this.cityList)
        })
    };


    /**
     * 加载本地城市信息
     */
    loadLocalCityData = () => {
        storage.load({
            key: 'cities',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true,
        }).then(ret => {
            let array = JSON.parse(ret);
            for (let i = 0; i < array.length; i++) {
                this.cityList.push(array[i]);
            }
            this.cityList = this.removeDuplicatedItem(this.cityList);
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // alert('读取失败');
                    // TODO;
                    break;
                case 'ExpiredError':
                    // alert('读取失败');
                    // TODO
                    break;
            }
        });
    };

    /**
     * 移除数据中重复的项目
     * @param array 数组
     * @returns 移除重复项目后的数据
     */
    removeDuplicatedItem(array) {
        let ret = [];

        array.forEach(function (value, index, ar) {
            if (ar.indexOf(value) === index) {
                ret.push(value);
            }
        });

        return ret;
    }

}

const stateStore = new StateStore();
export default stateStore;
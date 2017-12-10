/**
 * Created by lkmc2 on 2017/11/29.
 */
'use strict';
import { observable, computed, asMap, autorun } from 'mobx';
import { NetInfo, Alert } from 'react-native';
import CityItemInfo from '../model/CityItemInfo.js'; //城市天气信息子控件
import StateStore from './StateStore.js'; //天气状态
import { Geolocation } from 'react-native-baidu-map'; //定位器
import WebConfig from '../config/WebConfig.js'; //网络配置
// import MscSpeech from 'react-native-msc-speech'

class WeatherStore {

    @observable currentCityName = '北京';
    @observable currentCityNameEng = 'Beijing';
    @observable currentCityInfo = null; //当前城市信息
    @observable loading = true;

    /**
     * 返回一周天气预报
     * @returns 一周天气预报
     */
    @computed get dailyDataSource() {
        let data = this.getCurrentCityWeather;
        if (data !== null) {
            return data.daily_forecast;
        } else {
            return [];
        }
    }

    /**
     * 返回每3小时的天气信息
     * @returns 每3小时的天气信息
     */
    @computed get hourlyDataSource() {
        let data = this.getCurrentCityWeather;
        if (data !== null) {
            return data.hourly;
        } else {
            return [];
        }
    }

    /**
     * 获取当前城市天气数据
     * @returns 当前城市天气数据
     */
    @computed get getCurrentCityWeather(){
        return this.currentCityInfo;
    };


    /**
     * 改变当前城市名
     * @param cityName 城市名
     */
    changeCurrentCityName = (cityName) => {
        this.currentCityName = cityName;
        this.currentCityNameEng = StateStore.getFullCityName(cityName);

        this.checkIfHaveDataInList(cityName); //检查城市名否在数据库中存在
    };

    //检查城市名否在数据库中存在，存在则替换数据
    checkIfHaveDataInList = (cityName) => {
        let flag = -1;
        for (let i = 0; i < StateStore.cityList.length; i++) {
            if (StateStore.cityList[i].cityName === cityName) {
                flag = i;
                break;
            }
        }
        if (flag !== -1) {
            this.currentCityInfo = StateStore.cityList[flag];
        }
    };

    //获取位置
    getLocation = () => {
        Geolocation.getCurrentPosition().then(
            (data) => {
                // Alert.alert('提示', '城市:'+data.city+'\n'+'精度:'+data.longitude+'\n纬度:'+data.latitude+'\n地址:'+data.address);
                this.requestWeatherByLongitudeAndLatitude(this.getRightPoint(data.longitude),
                    this.getRightPoint(data.latitude)); //根据经纬度进行天气请求
            }
        ).catch(error => {
            Alert.alert('提示', '定位失败');
            this.requestWeatherByName(WeatherStore.currentCityName); //根据设置的城市名进行天气请求
        });
    };

    /**
     * 获取正确的坐标
     * @param str 字符串
     */
    getRightPoint = (str) => {
        let point = str.toString();
        return point.substring(0, point.indexOf('.') + 4);
    };

    /**
     * 通过经纬度获取天气信息
     * @param longitude 经度
     * @param latitude 纬度
     */
    requestWeatherByLongitudeAndLatitude = (longitude, latitude) => {
        this.loading = true;
        return fetch(WebConfig.weatherApi + longitude + ',' + latitude) //请求天气数据
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((jsonData) => {
                this.changeCurrentCityName(jsonData.HeWeather6[0].basic.location); //改变当前城市名
                this.saveWeatherData(jsonData); //保存天气数据
                this.loading = false;
            })
            .done();
    };

    /**
     * 根据城市名获取天气
     * @param cityName 城市名
     */
    requestWeatherByName = (cityName) => {
        this.loading = true;
        return fetch(WebConfig.weatherApi + cityName)  //请求天气数据
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((jsonData) => {
                this.saveWeatherData(jsonData);
                this.loading = false;
            })
            .done();
    };

    /**
     * 请求所有城市的天气预报
     */
    requestAllCityWeather = async () => {
        const cityList = StateStore.cityDataSource; //获取城市数据列表

        for (let [cityName] of cityList) {
            await this.requestWeatherByName(cityName);
        }

        // cityList.map((data) => {
        //     this.requestWeatherByName(data.cityName);
        // })
    };

    /**
     * 存储天气信息
     * @param jsonData 天气数据
     */
    saveWeatherData = (jsonData) => {
        let weatherData = jsonData.HeWeather6[0];

        console.log("key="+weatherData.basic.location+",value="+weatherData);

        this.saveCityItem(weatherData);
        let voiceContent = weatherData.basic.location + '现在' + weatherData.cond_txt + ',气温' +
            weatherData.now.tmp + '度';
        // this.speakWeather(voiceContent);
    };

    /**
     * 进行语音输出
     * android端采用讯飞云语音合成，ios端采用自带的tts合成
     * @param content 语音输出内容
     */
    // speakWeather = (content) => {
    //     if (!__ANDROID__) {
    //         MscSpeech.speak(true, content, () => {
    //             console.log('ios输出!')
    //         });
    //     } else {
    //         NetInfo.isConnected.fetch().done((isConnected) => {
    //             if (isConnected)
    //                 MscSpeech.speak(false, content, () => {
    //                     console.log('android输出')
    //                 });
    //             else
    //                 alert('Android需要连接网络才能语音播报!')
    //         });
    //     }
    // };

    /**
     * 存储天气数据
     * @param  weatherData  单项天气数据
     */
    saveCityItem = (weatherData) => {
        let flag = -1;
        for (let i = 0; i < StateStore.cityList.length; i++) {
            if (StateStore.cityList[i].cityName === weatherData.basic.location) {
                flag = i;
                break;
            }
        }
        let weatherItem = new CityItemInfo(weatherData);
        this.currentCityInfo = weatherItem;
        if (flag !== -1) {
            StateStore.cityList[flag] = weatherItem;
        } else {
            StateStore.cityList.push(weatherItem);
        }
        StateStore.saveLocalCityData();
    };

}

const weatherStore = new WeatherStore();
export default weatherStore;
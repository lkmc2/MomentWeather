/**
 * Created by lkmc2 on 2017/11/29.
 */
'use strict';
import { observable, computed, asMap, autorun } from 'mobx';
import { ListView, NetInfo } from 'react-native';
import Weather from '../model/WeatherInfo.js'; //天气信息
import AqiItem from '../model/AqiItemInfo.js'; //空气质量数据
import SuggestionInfo from '../model/SuggestionInfo.js'; //今日生活指数
import CityItemInfo from '../model/CityItemInfo.js'; //城市天气信息子控件
import StateStore from './StateStore.js'; //天气状态
import { Geolocation } from 'react-native-baidu-map'; //定位器
import ApiConfig from '../config/WebConfig'
// import MscSpeech from 'react-native-msc-speech'

class WeatherStore {

    @observable weatherMap = observable.map();
    @observable currentCityName = '北京';
    @observable currentCityNameEng = 'Beijing';
    @observable currentCityInfo = null; //当前城市信息
    @observable currentPosition = 'unknown';
    @observable lastPosition = 'unknown';
    @observable watchId = 'unknown';
    @observable aqiList = [];
    @observable lifeList = [];
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
        return fetch("https://free-api.heweather.com/s6/weather?key=3ad94afdc775428fb9da709e66d62581&location="
            + longitude + ',' + latitude)
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
        return fetch("https://free-api.heweather.com/s6/weather?key=3ad94afdc775428fb9da709e66d62581&location=" + cityName)
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

        // this.weatherMap.set(weatherData.basic.location, new Weather(weatherData));
        // this.convertAqiToList(weatherData);
        // this.convertSuggestionList(weatherData);
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


    convertAqiToList = (weatherData) => {
        this.aqiList = [];
        let aqi = weatherData.aqi.city;
        this.aqiList.push(new AqiItem('CO', aqi.co, '一氧化碳', 'mg/m³'));
        this.aqiList.push(new AqiItem('NO2', aqi.no2, '二氧化氮', 'μg/m³'));
        this.aqiList.push(new AqiItem('O³', aqi.o3, '臭氧', 'μg/m³'));
        this.aqiList.push(new AqiItem('PM10', aqi.pm10, '可吸入颗粒物', 'μg/m²'));
        this.aqiList.push(new AqiItem('PM2.5', aqi.pm25, '可入肺颗粒', 'μg/m³'));
        this.aqiList.push(new AqiItem('PM10', aqi.so2, '二氧化硫', 'μg/m³'));
    };

    convertSuggestionList = (weatherData) => {
        this.lifeList = [];
        let suggestion = weatherData.lifestyle;

        const title = ['舒适指数','洗车指数','穿衣指数','感冒指数','运动指数','旅游指数','紫外线指数','空气污染指数'];

        suggestion.map((item, index) => {
            this.lifeList.push(new SuggestionInfo(title[index], item.brf, item.txt));
        });
    };




}

const weatherStore = new WeatherStore();
export default weatherStore;
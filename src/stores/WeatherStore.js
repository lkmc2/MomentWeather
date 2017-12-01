/**
 * Created by lkmc2 on 2017/11/29.
 */
'use strict';
import { observable, computed, asMap, autorun } from 'mobx';
import Weather from '../model/WeatherInfo';
import { ListView, NetInfo } from 'react-native';
import AqiItem from '../model/AqiItemInfo';
import SuggestionInfo from '../model/SuggestionInfo'
import CityItemInfo from '../model/CityItemInfo'
import stateStore from './StateStore'
import ApiConfig from '../config/WebConfig'
import MscSpeech from 'react-native-msc-speech'

class WeatherStore {

    @observable weatherMap = observable.map();
    @observable currentCityName = '北京';
    @observable currentPosition = 'unknown';
    @observable lastPosition = 'unknown';
    @observable watchId = 'unknown';
    @observable aqiList = [];
    @observable lifeList = [];
    @observable loading = true;

    ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });


    /**
     * 返回每日天气预报ds
     * @returns {ListViewDataSource}
     */
    @computed get dailyDataSource() {
        let data = this.getCurrentCityWeather();
        if (data !== null) {
            return this.ds.cloneWithRows(data.daily.slice());
        } else {
            return this.ds.cloneWithRows([]);
        }
    }

    /**
     * 返回一天内的天气信息ds
     * @returns {ListViewDataSource}
     */
    @computed get hourlyDataSource() {
        let data = this.getCurrentCityWeather();
        if (data !== null) {
            let hourlyData = data.hourly;
            return this.ds.cloneWithRows(hourlyData.slice());
        } else {
            return this.ds.cloneWithRows([]);
        }
    }

    /**
     * 获取地理位置信息并且通过经纬度获取天气信息
     */
    getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            weatherStore.currentPosition = position;
            this.requestWeatherByLongitudeAndLatitude(position.coords.longitude + ',' + position.coords.latitude);
        }, (error) => {
            alert(JSON.stringify(error));
        }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
        weatherStore.watchId = navigator.geolocation.watchPosition((position) => {
            weatherStore.lastPosition = position;
        });
    };

    /**
     * 通过经纬度获取天气信息
     * @param name
     */
    requestWeatherByLongitudeAndLatitude = (name) => {
        this.loading = true;
        return fetch("https://free-api.heweather.com/s6/weather?key=3ad94afdc775428fb9da709e66d62581&location=" + name)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((jsonData) => {
                let weatherData = jsonData.HeWeather6[0];
                this.changeCurrentCityName(weatherData.basic.location);
                this.saveWeatherData(jsonData);
                this.loading = false;
            })
            .done();
    };

    /**
     * 根据城市名获取天气
     * @param name
     */
    requestWeatherByName = (name) => {
        this.loading = true;
        return fetch("https://free-api.heweather.com/s6/weather?key=3ad94afdc775428fb9da709e66d62581&location=" + name)
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
     * 存储天气信息
     * @param jsonData
     */
    saveWeatherData = (jsonData) => {
        let weatherData = jsonData.HeWeather6[0];

        console.log("key="+weatherData.basic.location+",value="+weatherData);

        this.weatherMap.set(weatherData.basic.location, new Weather(weatherData));
        // this.convertAqiToList(weatherData);
        this.convertSuggestionList(weatherData);
        // this.saveCityItem(weatherData);
        let voiceContent = weatherData.basic.location + '现在' + weatherData.cond_txt + ',气温' +
            weatherData.now.tmp + '度';
        // this.speakWeather(voiceContent);
    };

    /**
     * 进行语音输出
     * android端采用讯飞云语音合成，ios端采用自带的tts合成
     * @param content 语音输出内容
     */
    speakWeather = (content) => {
        if (!__ANDROID__) {
            MscSpeech.speak(true, content, () => {
                console.log('ios输出!')
            });
        } else {
            NetInfo.isConnected.fetch().done((isConnected) => {
                if (isConnected)
                    MscSpeech.speak(false, content, () => {
                        console.log('android输出')
                    });
                else
                    alert('Android需要连接网络才能语音播报!')
            });
        }
    };

    /**
     * 存储天气数据
     * @param  weatherData  单项天气数据
     */
    saveCityItem = (weatherData) => {
        let flag = -1;
        for (let i = 0; i < stateStore.cityList.length; i++) {
            if (stateStore.cityList[i].cityName === weatherData.basic.city) {
                flag = i;
                break;
            }
        }
        let weatherItem = new CityItemInfo(weatherData.basic.city,
            weatherData.daily_forecast[0].tmp.min + '~' + weatherData.daily_forecast[0].tmp.max + '°C',
            ApiConfig.iconApi + weatherData.daily_forecast[0].cond.code_d + '.png');
        if (flag !== -1) {
            stateStore.cityList[flag] = weatherItem;
        } else {
            stateStore.cityList.push(weatherItem);
        }
        stateStore.saveLocalCityData();
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

    /**
     * 通过名字获取天气预报信息
     * @param name
     * @returns {null}
     */
    getWeatherDataByName = (name) => {
        if (!this.weatherMap.has(name)) {
            return null;
        } else {
            return this.weatherMap.get(name);
        }
    };


    /**
     * 改变当前城市名
     * @param name
     */
    changeCurrentCityName = (name) => {
        this.currentCityName = name;
        if (this.getCurrentCityWeather() !== null) {
            this.convertSuggestionList(this.getCurrentCityWeather());
            // this.convertAqiToList(this.getCurrentCityWeather());
        } else {
            this.requestWeatherByName(name);
        }
    };

    /**
     * 获取当前城市天气数据
     * @returns {null}
     */
    getCurrentCityWeather = () => {
        let weatherData = this.getWeatherDataByName(this.currentCityName);
        return weatherData;
    };


}

const weatherStore = new WeatherStore();
export default weatherStore;
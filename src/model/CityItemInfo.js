/**
 * Created by lkmc2 on 2017/11/29.
 */
'use strict';
import {observable} from 'mobx';

//城市信息
export default class CityItemInfo {
    @observable cityName; //城市名
    @observable basic; //基础信息
    @observable now; //当前天气
    @observable hourly; //逐小时天气
    @observable daily_forecast; //一周天气
    @observable lifestyle; //生活指数
    @observable update; //更新时间

    constructor(jsonData) {
        this.cityName = jsonData.basic.location;
        this.now = jsonData.now;
        this.hourly = jsonData.hourly;
        this.basic = jsonData.basic;
        this.daily_forecast = jsonData.daily_forecast;
        this.lifestyle = jsonData.lifestyle;
        this.update = jsonData.update;
    }
}
/**
 * Created by lkmc2 on 2017/11/29.
 */
'use strict';
import {observable, computed} from 'mobx';

export default class Weather {
    @observable aqi;
    @observable basic;
    @observable daily;
    @observable hourly;
    @observable now;
    @observable suggestion;

    constructor(jsonData) {
        this.aqi = jsonData.aqi;
        this.basic = jsonData.basic;
        this.daily = jsonData.daily_forecast;
        this.hourly = jsonData.hourly_forecast;
        this.now = jsonData.now;
        this.suggestion = jsonData.suggestion;
    }
}

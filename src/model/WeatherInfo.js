/**
 * Created by lkmc2 on 2017/11/29.
 */
'use strict';
import {observable, computed} from 'mobx';

export default class Weather {

    @observable basic;
    @observable daily_forecast;
    @observable lifestyle;
    @observable now;
    @observable update;
    @observable hourly;

    constructor(jsonData) {
        this.basic = jsonData.basic;
        this.daily_forecast = jsonData.daily_forecast;
        this.lifestyle = jsonData.lifestyle;
        this.now = jsonData.now;
        this.update = jsonData.update;
        this.hourly = jsonData.hourly;
    }
}

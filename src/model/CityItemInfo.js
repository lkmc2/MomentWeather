/**
 * Created by lkmc2 on 2017/11/29.
 */
'use strict';
import {observable, computed} from 'mobx';

//城市信息
export default class CityItemInfo {
    @observable cityName; //城市名
    @observable cityNameEng; //城市英文名
    @observable now; //当前天气
    @observable daily_forecast; //一周天气

    constructor(cityName, cityNameEng, now, daily_forecast) {
        this.cityName = cityName;
        this.cityNameEng = cityNameEng;
        this.now = now;
        this.daily_forecast = daily_forecast;
    }
}
/**
 * Created by lkmc2 on 2017/11/29.
 */
'use strict';
import {observable, computed} from 'mobx';

export default class CityItemInfo {
    @observable cityName;
    @observable tmp;
    @observable iconUrl;

    constructor(cityName, tmp, iconUrl) {
        this.cityName = cityName;
        this.tmp = tmp;
        this.iconUrl = iconUrl;
    }
}
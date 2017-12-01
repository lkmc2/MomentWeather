/**
 * Created by lkmc2 on 2017/11/29.
 */
'use strict';
import {observable, computed} from 'mobx';

export default class SuggestionInfo {
    @observable type;
    @observable brf;
    @observable txt;

    constructor(type, brf, txt) {
        this.type = type;
        this.brf = brf;
        this.txt = txt;
    }

}
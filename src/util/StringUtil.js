/**
 * Created by lkmc2 on 2017/12/6.
 */

import pinyin from 'pinyin'; //汉字转英文工具
/**
 * 通过城市中文名获取城市的英文名
 * @param cityName 城市中文名
 * @returns 城市英文名
 */
getFullCityName = (cityName) => {
    let array = pinyin(cityName, {style: pinyin.STYLE_NORMAL});
    let fullCityName = "";

    if (array !== undefined && array.length > 0) {
        let word = array[0].toString();
        array[0] = word[0].toUpperCase() + word.slice(1);

        fullCityName = array.join("");
    }
    return fullCityName;
};

module.exports = {
    getFullCityName: getFullCityName,
};
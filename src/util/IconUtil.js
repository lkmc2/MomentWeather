/**
 * Created by lkmc2 on 2017/12/1.
 */

/**
 * 加载大型天气图标
 * @param weatherCode 天气代码
 * @returns 对应的天气图标
 */
loadMaxWeatherIcon = (weatherCode) => {
    let icon, hour;

    switch (weatherCode) {
        case "100": //晴天
            hour = new Date().getHours(); //获取时间
            if (hour < 12) { //白天
                icon = require('../images/weather/sunny.png');
            } else { //黑夜
                icon = require('../images/weather/sunny_night.png');
            }
            break;
        case "101": //多云的
        case "102":
            hour = new Date().getHours(); //获取时间
            if (hour < 12) { //白天
                icon = require('../images/weather/cloudy.png');
            } else { //黑夜
                icon = require('../images/weather/cloudy_night.png');
            }
            break;
        case "103": //晴转多云
            icon = require('../images/weather/partly_cloudy.png');
            break;
        case "104": //阴
            icon = require('../images/weather/overcast.png');
            break;
        case "200": //有风的
            icon = require('../images/weather/windy.png');
            break;
        case "201": //大风的
        case "202":
        case "203":
        case "204":
        case "205":
        case "206":
        case "207":
        case "208":
            icon = require('../images/weather/blustery.png');
            break;
        case "209": //龙卷风
        case "210":
        case "211":
        case "212":
        case "213":
            icon = require('../images/weather/tornado.png');
            break;
        case "300": //雷阵雨
        case "301":
        case "302":
        case "303":
            icon = require('../images/weather/thundershower.png');
            break;
        case "304": //雷阵雨带冰雹
            icon = require('../images/weather/thundershower_with_hail.png');
            break;
        case "305": //雨天
        case "306":
        case "307":
        case "308":
        case "309":
        case "310":
        case "311":
        case "312":
        case "313":
            icon = require('../images/weather/rain.png');
            break;
        case "400": //下雪
        case "401":
        case "402":
            icon = require('../images/weather/snow.png');
            break;
        case "403": //暴风雪
        case "404":
        case "405":
        case "406":
        case "407":
            icon = require('../images/weather/snowstorm.png');
            break;
        case "500": //有雾
        case "501":
        case "502":
            icon = require('../images/weather/foggy.png');
            break;
        case "503": //有尘
        case "504":
            icon = require('../images/weather/dust.png');
            break;
        case "507": //沙尘暴
        case "508":
            icon = require('../images/weather/sandstorm.png');
            break;
        case "900": //警告
        case "901":
            icon = require('../images/weather/warning.png');
            break;
        default:
            icon = require('../images/weather/unknown.png');
            break;
    }

    return icon;
};

module.exports = {
    loadMaxWeatherIcon: loadMaxWeatherIcon,
};
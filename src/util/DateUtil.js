/**
 * Created by lkmc2 on 2017/11/29.
 */
/**
 * 根据日期获取星期
 * @param date
 * @returns {*}
 */
getWeekdayByDate = (date) => {
    let a = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    let day = new Date(date).getDay();
    let today = getNowFormatDate();
    let tomorrow = getTomorrowFormatDate();
    if (today === date)
        return '今天';
    else if (date === tomorrow)
        return '明天';
    else
        return a[day];
};

/**
 * 获取今天的时间戳
 * @returns {string}
 */
getNowFormatDate = () => {
    let date = new Date();
    let seperator1 = "-";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
};

/**
 * 获取明天的时间戳
 * @returns {string}
 */
getTomorrowFormatDate = () => {
    let date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
    let seperator1 = "-";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
};

/**
 * 根据时间戳获取月日
 * @param date
 */
getMonthAndDayByDate = (date) => {
    return date.substring(8,date.length)+'日';
};

/**
 * 根据时间戳获取时分
 * @param date
 */
getHoursAndMinsByDate = (date) => {
    return date.substring(11,date.length);
};

/**
 * 获取日期中的时间
 * @param date 日期
 * @returns 时间
 */
getTimeInDate = (date) => {
    const hour = new Date(date).getHours(); //获取时间

    let str;

    if (hour < 7) {
        str = '凌晨';
    } else if (hour >= 7 && hour <12) {
        str = '早上';
    } else if(hour >= 12 && hour < 13) {
        str = '中午';
    } else if (hour >= 13 && hour < 18) {
        str = '下午';
    } else if (hour >= 18 && hour < 19) {
        str = '傍晚';
    } else {
        str = '晚上';
    }

    return str + date.substring(11);
};


module.exports = {
    getWeekdayByDate: getWeekdayByDate,
    getMonthAndDayByDate: getMonthAndDayByDate,
    getHoursAndMinsByDate:getHoursAndMinsByDate,
    getTimeInDate: getTimeInDate,
};
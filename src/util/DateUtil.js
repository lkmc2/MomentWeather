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
    if (date === today)
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
    return date.substring(11);
};

/**
 * 获取日期中的时间
 * @param date 日期
 * @returns 时间
 */
getTimeInDate = (date) => {
    return date.substring(5).replace('-', '.');
};

module.exports = {
    getWeekdayByDate: getWeekdayByDate,
    getMonthAndDayByDate: getMonthAndDayByDate,
    getHoursAndMinsByDate:getHoursAndMinsByDate,
    getTimeInDate: getTimeInDate,
};
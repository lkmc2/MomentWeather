import {
    TabNavigator,
    StackNavigator,
} from 'react-navigation';

import TodayPage from './src/pages/TodayPage.js';
import MyPage from './src/pages/MyPage.js';
import MorePage from './src/pages/MorePage.js';
import CitySelect from './src/pages/CitySelect.js';

const MyTab = TabNavigator({ //利用导航底栏生成界面
    TodayPage: {screen: TodayPage}, //电影列表页
    MyPage: {screen: MyPage}, //影院页
    MorePage: {screen: MorePage}, //我的电影页
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#0390EB',
        inactiveTintColor: '#fff',
        labelStyle: {
            fontSize: 16,
        },
        style: {
            backgroundColor: '#9fbbff',
        },
        indicatorStyle: {
            backgroundColor: '#fbff59',
        },
    },
});

const App = StackNavigator({ //利用标题导航栏生成界面
    Home: {screen: MyTab}, //底栏生成的界面
    SelectCity: {screen: CitySelect}, //详情页
}, {
    headerMode: 'screen', //标题栏模式，内容连同标题栏一起改变
});

export default App; //导出App模块
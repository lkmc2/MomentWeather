import {
    TabNavigator,
} from 'react-navigation';

import TodayPage from './src/pages/TodayPage.js';
import MyPage from './src/pages/MyPage.js';
import MorePage from './src/pages/MorePage.js';

const App = TabNavigator({ //利用导航底栏生成界面
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
            backgroundColor: '#222',
        },
    },
});

export default App; //导出App模块
import {
    TabNavigator,
    StackNavigator,
} from 'react-navigation';

import TodayPage from './src/pages/TodayPage.js'; //今天界面
import MyPage from './src/pages/MyPage.js'; //我的界面
import MorePage from './src/pages/MorePage.js'; //更多界面
import CitySelected from './src/pages/CitySelectPage.js'; //城市选择界面
import EditCityPage from './src/pages/EditCityPage.js'; //编辑城市页面

const MyTab = TabNavigator({ //利用导航底栏生成界面
    TodayPage: {screen: TodayPage}, //今天界面
    MyPage: {screen: MyPage}, //我的界面
    MorePage: {screen: MorePage}, //更多界面
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#000',
        inactiveTintColor: '#a0a0a0',
        labelStyle: {
            fontSize: 16,
        },
        style: {
            backgroundColor: '#fff',
        },
        indicatorStyle: {
            backgroundColor: '#ffd700',
        },
    },
});

const App = StackNavigator({ //利用标题导航栏生成界面
    Home: {screen: MyTab}, //底栏生成的界面
    CitySelected: {screen: CitySelected}, //城市选择界面
    EditCityPage: {screen: EditCityPage}, //编辑城市页面
}, {
    headerMode: 'screen', //标题栏模式，内容连同标题栏一起改变
});

export default App; //导出App模块
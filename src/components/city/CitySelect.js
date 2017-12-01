import React, {Component} from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions,
    SectionList,
} from 'react-native'
import CITYDATA from '../../util/CityData.js';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const statusHeight = 20;
const sectionWidth = 20;
const sectionTopBottomHeight = 50;
const sectionItemHeight = (deviceHeight - 56 - statusHeight - sectionTopBottomHeight * 2) / CITYDATA.length;
const touchDownBGColor = '#999999';
const touchUpBGColor = 'transparent';


export default class CitySelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalY: new Animated.Value(deviceHeight),
        }
    }

    componentDidMount() {
        Animated.timing(this.state.modalY, {
            duration: 50,
            toValue: 0
        }).start()
    }

    renderCityItem(cityData) {
        return cityData.map((item, index) => (
            <TouchableOpacity
                style={styles.city}
                key={item.cityId}
                onPress={this.props.selectCity.bind(this,item)}
            >
                <Text style={styles.cityText}>
                    {item.cityName}
                </Text>
            </TouchableOpacity>
        ));
    }

    renderHeader = () => {
        const cancelText = {
            color: this.props.cancelColor,
            fontSize: this.props.cancelSize
        };
        if (this.props.header) {
            return (
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.cancel}>
                        <Text style={cancelText}>
                            {this.props.cancelText}
                        </Text>
                    </TouchableOpacity>
                    <Text>
                        {this.props.titleText}
                    </Text>
                </View>
            )
        }
    };

    renderItem = (info) => {
        return (
            <View key={info.item}>
                <View style={styles.cityBox}>
                    {this.renderCityItem(info.item)}
                </View>
            </View>
        )
    };

    renderSectionHeader = ({section}) => (
        <View style={{flex: 1, height: 25}}>
            <Text style={styles.title}>{section.key}</Text>
        </View>
    );

    extraUniqueKey = (item, index) => {
        return "index" + index + item;
    };

    /*用户手指开始触摸*/
    responderGrant = (event) => {
        this.scrollSectionList(event);

        this.setState({
            isTouchDown: true,
        })
    };

    /*用户手指在屏幕上移动手指，没有停下也没有离开*/
    responderMove = (event) => {
        this.scrollSectionList(event);

        this.setState({
            isTouchDown: true,
        })
    };

    /*用户手指离开屏幕*/
    responderRelease = () => {
        this.setState({
            isTouchDown: false,
        })
    };

    /*手指滑动，触发事件*/
    scrollSectionList = (event) => {
        const touch = event.nativeEvent.touches[0];

        // 手指滑动范围 从 A-Q  范围从50 到 50 + sectionItemHeight * cities.length
        if (touch.pageY - statusHeight - 56 >= sectionTopBottomHeight && touch.pageY <= statusHeight + 56 + sectionTopBottomHeight + sectionItemHeight * CITYDATA.length) {

            //touch.pageY 从顶部开始，包括导航条 iOS 如此，如果是android 则具体判断
            const index = (touch.pageY - statusHeight - 56 - sectionTopBottomHeight) / sectionItemHeight;

            console.log(parseInt(index));

            // 默认跳转到 第 index 个section  的第 1 个 item
            this.refs.sectionList.scrollToLocation({animated: true, itemIndex: 0, sectionIndex: parseInt(index)});

        }
    };

    /*右侧索引*/
    sectionItemView = () => {
        const sectionItem = CITYDATA.map((item, index) => {
            return (
                <Text key={index}
                      style={
                          [styles.sectionItemStyle,
                              {backgroundColor: this.state.isTouchDown ? touchDownBGColor : touchUpBGColor}]
                      }
                >
                    {item.key}
                </Text>
            )
        });

        return (
            <View style={styles.sectionItemViewStyle}
                  ref="sectionItemView"
                  onStartShouldSetResponder={() => true} // 在用户开始触摸的时候（手指刚刚接触屏幕的瞬间），是否愿意成为响应者？
                  onMoveShouldSetResponder={() => true} // :如果View不是响应者，那么在每一个触摸点开始移动（没有停下也没有离开屏幕）时再询问一次：是否愿意响应触摸交互呢？
                  onResponderGrant={this.responderGrant} // View现在要开始响应触摸事件了。这也是需要做高亮的时候，使用户知道他到底点到了哪里
                  onResponderMove={this.responderMove} // 用户正在屏幕上移动手指时（没有停下也没有离开屏幕）
                  onResponderRelease={this.responderRelease} // 触摸操作结束时触发，比如"touchUp"（手指抬起离开屏幕）
            >
                {sectionItem}
            </View>
        );
    };

    render() {
        return (
            <Animated.View
                style={[
                    styles.container, {transform: [{translateY: this.state.modalY}]}]}>
                {this.renderHeader()}
                <SectionList
                    ref="sectionList"
                    sections={CITYDATA}
                    renderItem={this.renderItem}
                    renderSectionHeader={this.renderSectionHeader}
                    keyExtractor={this.extraUniqueKey}/>
                {this.sectionItemView()}
            </Animated.View>
        )
    }
}

CitySelect.defaultProps = {
    cancelText: '取消',
    titleText: '选择城市',
    header: true,
    cancelColor: '#51a8fb',
    cancelSize: 14,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
    },
    header: {
        padding: 15,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderColor: '#F2F2F2',
        borderBottomWidth: 1,
    },
    cancel: {
        position: 'absolute',
        left: 10,
    },
    title: {
        backgroundColor: '#F2F2F2',
        padding: 5,
        color: '#333',
        fontSize: 14,
    },
    cityBox: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    city: {
        width: deviceWidth * 1 / 3,
        height: 40,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#f3f3f3',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cityText: {
        color: '#333',
        fontSize: 16,
    },
    sectionItemViewStyle:{
        position: 'absolute',
        width: sectionWidth,
        height: deviceHeight - statusHeight - 56,
        right: 0,
        top: 0,
        paddingTop: sectionTopBottomHeight,
        paddingBottom: sectionTopBottomHeight,
    },
    sectionItemStyle:{
        textAlign: 'center',
        alignItems: 'center',
        height: sectionItemHeight,
        lineHeight: sectionItemHeight
    },

});


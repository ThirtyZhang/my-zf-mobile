import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import News from '../news/news'
import Profile from '../profile/profile';
import HouseList from '../houseList/houseList';
import Index from '../index';
import { TabBar } from 'antd-mobile'; // 导入TabBar组件
import './home.css'// 引入样式文件
// 定义 tabbar 数组数组
const tabItems = [{
    title: '首页',
    icon: 'icon-ind',
    path: '/home/index'
},
{
    title: '找房',
    icon: 'icon-findHouse',
    path: '/home/houselist'
},
{
    title: '资讯',
    icon: 'icon-infom',
    path: '/home/news'
},
{
    title: '我的',
    icon: 'icon-my',
    path: '/home/profile'
}]

class Home extends Component {
    state = {
        selectedTab: '',  // 选中的Tab
        hidden: false, // 是否隐藏
    }

    componentDidMount(){
        console.log(this.props)
        this.setState({
            selectedTab: this.props.location.pathname  // 根据请求地址, 重新给选中的Tab赋值, 解决浏览器刷新后, tab栏高亮的值与地址也不一致
        })
    }
    // componentWillMount  (){
    //     console.log(this.props)
    //     this.setState({
    //         selectedTab: this.props.location.pathname  // 根据请求地址, 重新给选中的Tab赋值, 解决浏览器刷新后, tab栏高亮的值与地址也不一致
    //     })
    // }
    renderItem() {
        return tabItems.map((item, index) => {
            return <TabBar.Item
                title={item.title}
                key={index}
                icon={
                    <i className={`iconfont ${item.icon}`}></i>
                }
                selectedIcon={
                    <i className={`iconfont ${item.icon}`}></i>
                }
                selected={this.state.selectedTab === item.path}
                onPress={() => {
                    this.setState({
                        selectedTab: item.path,
                    });
                    this.props.history.push(item.path)
                }}
            >
            </TabBar.Item>
        })
    }
    render() {
        return (
            <div className='home'>
                <Route path="/home/index" component={Index}></Route>
                <Route path="/home/news" component={News}></Route>
                <Route path="/home/profile" component={Profile}></Route>
                <Route path="/home/houselist" component={HouseList}></Route>

                {/* tabbar 开始*/}
                <TabBar
                    // unselectedTintColor="#949494"
                    tintColor="#21b97a"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    {this.renderItem()}
                </TabBar>
                {/* tabbar 结束*/}
            </div>

        );
    }
}

export default Home;
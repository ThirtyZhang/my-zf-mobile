import React, { Component } from 'react';
// import { Button, WhiteSpace } from 'antd-mobile';
// 导入路由组件
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
// 重定向

// 导入 home 主页
import Home from './pages/home/home'
import CityList from './pages/cityList/cityList';
import Map from './pages/map/map'

class App extends Component {
    state = {}
    render() {
        return (
            <Router>
                <div className='App'>
                    {/* 重定向 */}

                    <Route
                        exact
                        path="/"
                        render={props => {
                            // console.log('render-props模式：', props)
                            // Redirect 组件：是路由的重定向组件，通过 to 属性，来指定要重定向到的路由地址
                            return <Redirect to="/home/index" />
                        }}
                    />
                    {/* <Route exact path="/" component={Home}></Route> */}
                    <Route path="/home" component={Home}></Route>
                    <Route path="/map" component={Map}></Route>
                    <Route path="/CityList" component={CityList}></Route>
                </div>
            </Router>

        );
    }
}

export default App;
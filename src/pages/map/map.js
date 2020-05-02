import React, { Component } from 'react';
import './map.scss'
let BMap=window.BMap  // 这里调用 BMap 需要使用 this 统一设置下
class Map extends Component {
    state = {}
    componentDidMount(){
        this.map()
    }
    map() {
        // 1 创建地图 放到对应div
        var map = new BMap.Map("container");
        // 2 移动地图到中心点经纬度    116.404, 39.915 天安门
        var point = new BMap.Point(116.404, 39.915);
        // 3 缩放地图
        map.centerAndZoom(point, 15);  //15 数字 越大 地图就会放大 看到的就更精确 放大缩小
    }
    render() {
        return (
            <div className='map'>
                <div id='container'>

                </div>
            </div>
        );
    }
}

export default Map;
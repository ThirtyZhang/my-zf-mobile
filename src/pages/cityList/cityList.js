import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile'
import axios from 'axios'
import './cityList.scss'
class CityList extends Component {
    state = {
        citylist: {},
        cityindex: []
    }
    /**
 * 格式化返回的数据
 * @param {*} list 
 */
    // 获取城市列表和城市字母数组 封装一下 免得代码太长 太乱了
    formatCity(list) {
        //    let city=res.data.body
        // 处理数据 把数据 变成我们想要的格式
        //循环 把拼音开头的城市 放在 对应的数组里面
        let citylist = {}
        list.forEach(item => {
            // 'nc'.substr(0,1) 从0索引开始 截取1个
            let word = item.short.substr(0, 1)// a  b  c
            // citylist[word] citylist['a'] citylist.a
            if (citylist[word]) {//有这个单词  就把城市push 到数组
                citylist[word].push(item)
            } else {//没有 就设置为数组 并且带上第一次的城市
                citylist[word] = [item] //citylist.a=
            }

        })
        //    console.log("城市",citylist)
        // 把得到的城市数据 的 字母 拿出来 单独 存一个数组 还排序了 从a...
        // Object.keys 把对象的 key 组成数组返回 Object.values
        let cityindex = Object.keys(citylist).sort()
        //  console.log("字母数组",cityindex)
        return {
            citylist,
            cityindex
        }
    }
    async getCityList() {
        let res = await axios.get("http://api-haoke-dev.itheima.net/area/city?level=1")
        console.log("城市列表数据", res)
        // 1 在公司里面  1 发送ajax拿到的数据 正好是符合 可以直接用  2 发送ajax拿到数据 格式不太好 (1 给后台 2 只能自己再做格式)
        let { citylist, cityindex } = this.formatCity(res.data.body)
        // 2 通过分析发现 还差 热门城市和定位城市 我们需要添加
        // 2.1 发送ajax先获取热门城市加上
        let hotres = await axios.get("http://api-haoke-dev.itheima.net/area/hot")
        citylist['hot'] = hotres.data.body;// {hot:[]}
        cityindex.unshift("hot");// [hot,a...]
        console.log('左侧城市列表对象citylist', citylist)
        console.log('右侧单词数组cityindex', cityindex)
        // 赋值
        this.setState({
            citylist,
            cityindex
        })
    }

    componentDidMount() {
        // simulate img loading
        this.getCityList()
    }
    render() {
        return (
            <div className="citylist">
                <NavBar
                    className='navbar'
                    // 模式 默认值是 dark
                    mode="light"
                    // 左侧小图片 也可以用 Icon
                    icon={<i className='iconfont icon-back' />}
                    // 左侧按钮的点击事件
                    onLeftClick={() => this.props.history.go(-1)}
                >城市列表</NavBar>
            </div>

        );
    }
}

export default CityList;
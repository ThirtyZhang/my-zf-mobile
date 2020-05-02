import React, { Component } from 'react'
// 导入 组件框架
import { Carousel, WingBlank,Flex,Grid  } from 'antd-mobile';
// 导入axios
import axios from 'axios'
// 导入 样式
import './index.scss'
// 导入 图片
import nav1 from  "../../assets/images/nav-1.png"
import nav2 from  "../../assets/images/nav-2.png"
import nav3 from  "../../assets/images/nav-3.png"
import nav4 from  "../../assets/images/nav-4.png"

// navs导航菜单 觉得 是比较死的 就写死数据了  后面你也可以在公司 发送请求
// 导航菜单的数据
const navs = [{
  id: 0,
  img: nav1,
  title: '整租',
  path: '/home/houselist'
}, {
  id: 1,
  img: nav2,
  title: '合租',
  path: '/home/houselist'
}, {
  id: 2,
  img: nav3,
  title: '地图找房',
  path: '/map'
}, {
  id: 3,
  img: nav4,
  title: '去出租',
  path: '/rent/add'
}]
// WingBlank 两侧留白  其实就 左右margin 15px

// 使用原生js 自带的定位
// window.navigator.geolocation.getCurrentPosition((position)=>{
//   console.log('当前城市经纬度',position)
// })
export default class Index extends Component {
  state = {
    swiperData: [],//轮播图数据
    imgHeight: 176,
    isplay:false,// 是否自动轮播
    groups:[], //租房小组数据
    news:[], //最新资讯数据
    cityname:"" //当前城市
  }
  componentDidMount() {
    // axios 发送请求 获取 轮播图数据
    // http://api-haoke-dev.itheima.net/home/swiper
    this.getSwiper()
    // 发送请求 获取 租房小组数据
    this.getGroups()
    // 发送请求 获取 最新资讯数据
    this.getNews()

      //使用百度 定位当前城市--ip定位  BMap.LocalCity
      var myCity = new window.BMap.LocalCity();
      // 里面就是 回调函数
      myCity.get((result)=>{
        var cityName = result.name;
        // alert("当前定位城市:"+cityName);// 北京市  定位的当前城市 在哪打开网站就是哪
        // 赋值
        this.setState({
          cityname:cityName
        })
      }); 
  }
  // axios 发送请求 获取 轮播图数据
  async getSwiper(){
    let res=await axios.get("http://api-haoke-dev.itheima.net/home/swiper")
    console.log('轮播图数据',res)
    // 把数据 赋值
    // 你觉得swiperData 和 isplay 谁先赋值？
    // setState 是异步的 第二个参数 保证数据是最新  // 必须保证 有数据 变成 true
    // 代码 就正常写 这里只是这个地方 有这个问题 千万不要因为这个 以后想一直写第二个参数
    this.setState({
      swiperData:res.data.body
    },()=>{
        // 在第二个参数写
        this.setState({
          isplay:true //  必须保证 有数据 变成 true
        })
    })
    
  }
  //发送请求 获取 租房小组数据
  async getGroups(){
    let res=await axios.get("http://api-haoke-dev.itheima.net/home/groups?area=AREA%7C88cff55c-aaa4-e2e0")
    console.log('租房小组',res)
    if(res.data.status==200){
        // 成功就赋值
        this.setState({
          groups:res.data.body
        })
    }
  }
  // 发送请求 获取 最新资讯数据
  async getNews(){
    let res=await axios.get("http://api-haoke-dev.itheima.net/home/news?area=AREA%7C88cff55c-aaa4-e2e0")
    console.log('最新资讯',res)
    // 赋值
    this.setState({
      news:res.data.body // 新闻数据
    })
  }

  // 渲染 轮播图 图片的函数
  renderSwiper(){
    return this.state.swiperData.map(val => (
              // 循环 生成 轮播的每一个图片
              <a
                key={val.id}
                href="http://www.alipay.com"
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
              >
                <img
                  src={'http://api-haoke-dev.itheima.net'+val.imgSrc}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </a>
            ))
  }

  // 渲染 四个导航菜单
  renderNavs(){
   return navs.map((item)=>{
      return  <Flex.Item 
                key={item.id}
                onClick={()=>{
                   //点击 跳转到对应 页面
                   this.props.history.push(item.path)
                }}
              >
            <img src={item.img} alt=""/>
            <p>{item.title}</p>
        </Flex.Item>
   })
  }

  // 渲染 最新资讯 3个li
  renderNews(){
    return this.state.news.map((item,index)=>{
           return <li key={item.id}>
          <div className="imgBox">
              <img src={`http://api-haoke-dev.itheima.net${item.imgSrc}`} alt=""/>
          </div>
          <div  className="news-text">
              <h4>{item.title}</h4>
              <p>
                <span>{item.from}</span>
                <span>{item.date}</span>
              </p>
          </div>
        </li>
    })
  }

  render() {
    return (
      <div className="index">

        {/* 搜索栏部分 */}
        <Flex className='searchBox'>
            <Flex className='searchLeft'>
                <div
                  className='location'
                  onClick={()=>{
                    // 点击跳到 /map
                    this.props.history.push("/citylist")
                  }}
                  >
                    {/* 不能写死 定位的 那个城市才对 */}
                   <span>{this.state.cityname}</span>
                   
                    <i className="iconfont icon-arrow" />
                </div>
                <div
                className='searchForm'
                >
                    <i className="iconfont icon-seach" />
                    <span>请输入小区或地址</span>
                </div>
            </Flex>
            {/* 右侧地图图标 点击跳到 /map */}
            <i className="iconfont icon-map" 
              onClick={()=>{
                // 点击跳到 /map
                this.props.history.push("/map")
              }}
             />
        </Flex>

        {/* 轮播图 使用框架 */} 
        {/* autoplay true应该要自动轮播 但是现在 没动 代码是对的 是antd-mobile的 小bug */}
        <Carousel
          autoplay={this.state.isplay} // 是否自动轮播 true自动 false不自动
          infinite // infinite 无限循环轮播
        >
          {/* 调用生成轮播图图片的函数 renderSwiper  */}
          { this.renderSwiper() }
        </Carousel>

        {/* 导航菜单 不用 Flex  也可以自己写div 写flex布局
          Flex 外层大盒子 写了 flex
          Flex.Item 每一个小盒子
          可以找他的类名 修改样式 也可以自己加 类名
          // img  1 用服务器 http 地址 图片直接用
                  2 本地文件夹里面的图片  不能直接用 需要先 import
              注意：没关系 我们基本都是 发送 ajax 获取数据
                   基本项目的图片 都是 http开头
        */}
        <Flex className="navs">
          {/* 循环navs 生成 四个菜单导航 */}
          {  this.renderNavs() }
        </Flex>

        {/* 租房小组 */}
        <div className="group">
            {/* 标题 */}
            <div className="group-title">
                  <h3>租房小组</h3>
                  <span>更多</span>
            </div>
            {/* 四个盒子内容--我们可以自己写样式 现在用框架 Grid宫格组件 
                data 数组数据
                columnNum={2}  列数 一行占几个
                renderItem  每个格子 都会执行一次这个函数 会把 每个数据传进去
                            是一个函数  里面可以写 每个格子的 html样式
                square 是否固定正方形 true 正方形 false 矩形
                hasLine 是否有边框线  true 有 false没有
                activeStyle  点击是否有灰色样式 true 有 false 没有
                itemStyle 每个格子的样式对象
              Grid 是不是 相当于 帮我们 把那个 flex布局 封装了而已
             */}
            <Grid 
              data={this.state.groups} 
              activeStyle={true} 
              columnNum={2}
              square={false}
              hasLine={false}
              // itemStyle={{'backgroundColor':"red"}}
              renderItem={(item,index)=>{
                // console.log('item',item) // item就是 数组里面的 每一项数据
                 //renderItem 在这里 可以写每个格子的 样式结构---左边两行文字 右边图片
                 return <Flex className="grid-item" justify="between">
                         {/* 左边两行文字 */}
                          <div className="desc">
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                          </div>
                          {/* 右边图片 */}
                          <img src={`http://api-haoke-dev.itheima.net${item.imgSrc}`} alt="" />
                      </Flex>
              }}
            />
        </div>
        
        {/* 最新资讯 */}
        <div className="news">
            {/* 头 */}
            <h3>最新资讯</h3>
            {/* 列表 */}
            <ul>
                {/* 一个  循环news数组 生成三个li */}
                { this.renderNews() }
            </ul>
        </div>

      </div>
    )
  }
}

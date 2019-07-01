// pages/index/index.js
let app=getApp();
let _util = require('../../utils/util.js');
let _fn=require('./fn.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js"

Page({

  /**
   * 页面的初始数据'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
   */
  data: {
    // showReleaseBox:false,
    // banner:[],//banner
    // recom_building: null,//推荐楼盘
    // recom_housing: null,//推荐房源
    // recomInfo:[],//推荐资讯
    baseSet:{
      indicatorDots: false,//是否显示面板指示点
      indicatorColor: 'rgba(0, 0, 0, .3)',//指示点颜色
      indicatorActiveColor: '#000000',//当前选中的指示点颜色
      autoplay: true,//是否自动切换
      interval: 5000,//自动切换时间间隔
      duration: 1000,//滑动动画时长
      circular: true,//是否采用衔接滑动
      hiddDefinedDots:true,
      vertical: false//滑动方向是否为纵向
    },
    imgsData:[
    ],
    baseSet_2: {
      indicatorDots: false,//是否显示面板指示点
      indicatorColor: 'rgba(0, 0, 0, .3)',//指示点颜色
      indicatorActiveColor: '#000000',//当前选中的指示点颜色
      autoplay: false,//是否自动切换
      interval: 5000,//自动切换时间间隔
      duration: 1000,//滑动动画时长
      circular: false,//是否采用衔接滑动
      hiddDefinedDots: true,
      vertical: false//滑动方向是否为纵向
    },
    imgsData_2: [
      {
        img_url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        id: 1
      },
      {
        img_url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        id: 1
      },
      {
        img_url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        id: 1
      },
      {
        img_url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        id: 1
      }
    ],
    // amount:0,//雄心币,
    // tabSelectFlag:true,
    // recomJob:null,
    // imgUrl: getApp().globalData.imgUrl,
    // areaList:[],
    // areaIndex:9

    showLoginBtn:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
    //用户登录
    getApp().UserToLogin((res) => {
      console.log(res)
      this.setData({
        showLoginBtn: getApp().globalData.visible==2?false:true
      })
      _fn.getIndexInfo(this)
    })

    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.hideLoading()
    this.onUnload()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.hideLoading();
    this.setData({
      showReleaseBox:false
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    // let imageUrl=undefined;
    // console.log(getApp().shareInfo)
    // return getApp().ShareFn({
    //   imageUrl: getApp().globalData.shareInfo.share_img,
    //   title: getApp().globalData.shareInfo.share_title,
    // })
  },
  //授权登录
  onGetUserInfo({ currentTarget, detail}){
    //拒绝授权
    if (detail.errMsg=="getUserInfo:fail auth deny") return 
    wx.showLoading({
      title: '加载中...',
    })
    let {url,src}=currentTarget.dataset;
    getApp().UserLogin(res=>{
      if(res=='err')
      {
        return
      } 
      loginFn(url, src)
      console.log(res)
    })
    console.log(currentTarget, detail)
  },
  //普通跳转
  onToNave({ currentTarget}){
    let { url } = currentTarget.dataset;
    loginFn(url)
  },
  onToExamingYZ(){
    wx.navigateTo({
      url: '../examingYZ/examingYZ',
    })
  },
  //跳转板块详情
  onToPlateDetail({currentTarget}){
    let {pid}=currentTarget.dataset;
    wx.navigateTo({
      url:"../tempDetail/tempDetail"
    })
  }

})

function loginFn(url, src){
  //修改导航
  getApp().globalData.navBar.forEach((item, index) => {
    if (index == 0) {
      item.selected = true
    }
    else {
      item.selected = false
    }
  })
  wx.hideLoading()
  let visible = getApp().globalData.visible;
  if (parseInt(visible) == 1) {

    
    console.log('认证页面')
    wx.navigateTo({
      url: `../checkUser/checkUser?src=${src}`,
    })
  }
  else {
    wx.navigateTo({
      url: url,
    })
  }
}
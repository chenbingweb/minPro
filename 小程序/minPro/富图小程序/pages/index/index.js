// pages/index/index.js
let app=getApp();
let _util = require('../../utils/util.js');
let _fn=require('./fn.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js"
import {User} from "../../model/user.js";
import {Index} from "../../model/index.js"
Page({

  /**
   * 页面的初始数据'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
   */
  data: {
    events:false,
    isLogn:true,
    banner:[],//banner
    foodRange:[],
    recommendFood:[],//推荐菜品
    baseSet:{
      indicatorDots: false,//是否显示面板指示点
      indicatorColor: 'rgba(0, 0, 0, .3)',//指示点颜色
      indicatorActiveColor: '#000000',//当前选中的指示点颜色
      autoplay: true,//是否自动切换
      interval: 5000,//自动切换时间间隔
      duration: 1000,//滑动动画时长
      circular: true,//是否采用衔接滑动
      vertical: false//滑动方向是否为纵向
    },
    isPower:true,

    amount:0,//雄心币,
    tabSelectFlag:true,
    recomJob:null,
    imgUrl: getApp().globalData.imgUrl,
    areaList:[],
    areaIndex:9
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

   
    this.setData({
      events: User.CanClick
    })
    console.log(User.CanClick)
    
   
  },
  //取消绑定事件
  _offEvent(){
    User.login.Off(this.loginSuccess);
    User.isLocationPower.Off(this.isLocationPower);
    User.getLocalSucc.Off(this.getLocalSucc);
    Index.bannerEvent.Off(this.setBaner);
    Index.rangeEvent.Off(this.rangeEvent);
    Index.recommendEvent.Off(this.recommendEvent)
    
  },
  _bindEvent(){
    //绑定登录事件
    User.login.On(this, this.loginSuccess);  
    //获取地理坐标成功
    User.getLocalSucc.On(this, this.getLocalSucc);
    
    User.isLocationPower.On(this, this.isLocationPower);
    //设置banner
    Index.bannerEvent.On(this,this.setBaner);
    //获取推荐菜品
    Index.recommendEvent.On(this,this.recommendEvent)
    //菜品排行
    Index.rangeEvent.On(this,this.rangeEvent);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // getApp().UserToLogin(res=>{
    //   console.log(res)
    // })
  },
  //推荐菜品
  recommendEvent(){
    this.setData({
      recommendFood: []
    },()=>{
      this.setData({
        recommendFood: Index.recommendFood
      })
    })
  },
  //是否授权
  isLocationPower(res){
    this.setData({
      isPower:res
    })
  },
  //登录成功
  loginSuccess(res){

    this.setData({
      isLogn: res,
      events: User.CanClick,
    }, () => {
      if (this.data.isLogn == false) {
        wx.setNavigationBarTitle({
          title: '手机登录',
        })
        wx.hideLoading()
      }
    })
  },
  //banner
  setBaner(){
  
    this.setData({
      banner: Index.banner
    })
  },
  rangeEvent(){
    console.log('-------', Index.foodRange)
    this.setData({
      foodRange:[]
    },()=>{
      this.setData({
        foodRange: Index.foodRange
      })
    })
    
  },
  //获取地理坐标成功后，跳转附近餐厅列表
  getLocalSucc(res){
   
    if (User.restaurant_id == '') {

      if (res != false) {
        wx.navigateTo({
          url: '../restaurant/restaurant',
        })
      }
    }
    else {
      wx.navigateTo({
        url: '../restaurantDetail/restaurantDetail?rid=' + User.restaurant_id,
      })
    }

    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._offEvent()
    this._bindEvent()
    // Index._getPageInfo(false)
    this.setBaner();
    this.rangeEvent();
    this.recommendEvent()
    //用户登录
    // getApp().UserToLogin((res) => {
    
    // })

    
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
    this._offEvent()
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

    let imageUrl=undefined;
    console.log(getApp().shareInfo)
    return getApp().ShareFn({
      imageUrl: getApp().globalData.shareInfo.share_img,
      title: getApp().globalData.shareInfo.share_title,
    })
  },
  //设置回调
  onOpenSetting({detail}){
    let { authSetting }=detail;
    if (authSetting['scope.userLocation'])
    {
      setTimeout(() => { User.getNearShopList();},500)
     // User.getNearShopList();
      this.setData({
        isPower: true
      }) 
    }

  },
  //登录注册
  onIsLogin(){
    this.setData({
      isLogn: true
    }, () => {
      if (this.data.isLogn == false) {
        wx.setNavigationBarTitle({
          title: '首页',
        })
      }
    })
  },
  //去订餐
  onToRestaurant(){
    User.getNearShopList()
    
    
  }
})
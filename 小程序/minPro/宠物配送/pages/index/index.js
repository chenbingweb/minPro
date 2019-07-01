// pages/index/index.js
let app=getApp();
let _util = require('../../utils/util.js');
let _fn=require('./fn.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js"
import {User} from "../../model/user.js";
setInterval(()=>{
  User.getOrderList()
},20*60*1000)
// import {Index} from "../../model/index.js";
let _interface = require('../../utils/interface.js')
Page({

  /**
   * 页面的初始数据'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
   */
  data: {
    dataObj: {},
    orderList: [],



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


    imgUrl: getApp().globalData.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(User.token!=='')
    {
      this.loginSuccess(true)
    }
    getApp().updataNav(0)


  },
  onPageData({ detail }) {
    let list = this.data.orderList;
    list.push(...detail);
    this.setData({
      orderList: list
    })
    console.log(detail)
  },
  //取消绑定事件
  _offEvent(){
    User.login.Off(this.loginSuccess);
    User.isLocationPower.Off(this.isLocationPower);
    User.getLocalSucc.Off(this.getLocalSucc);
    User.getOrderEvent.Off(this.getOrderEvent);
    // Index.bannerEvent.Off(this.setBaner);
    // Index.rangeEvent.Off(this.rangeEvent);
    // Index.recommendEvent.Off(this.recommendEvent)
    
  },
  _bindEvent(){
    //绑定登录事件
    User.login.On(this, this.loginSuccess);  
    //获取地理坐标成功
    User.getLocalSucc.On(this, this.getLocalSucc);
    
    User.isLocationPower.On(this, this.isLocationPower);
    User.getOrderEvent.On(this,this.getOrderEvent);
    //设置banner
    // Index.bannerEvent.On(this,this.setBaner);
    // //获取推荐菜品
    // Index.recommendEvent.On(this,this.recommendEvent)
    // //菜品排行
    // Index.rangeEvent.On(this,this.rangeEvent);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // getApp().UserToLogin(res=>{
    //   console.log(res)
    // })
  },

  //是否授权
  isLocationPower(res){
    this.setData({
      isPower:res
    })
  },
  //登录成功
  loginSuccess(res){
    if(res==false)
    {
      wx.reLaunch({
        url: '../loginPage/loginPage',
      })
      return
    }
    User.getOrderList()
    this.setData({
      isLogn: res,
    }, () => {
      if (this.data.isLogn == false) {
        wx.setNavigationBarTitle({
          title: '手机登录',
        })
        wx.hideLoading()
      }
    })
  },
  //获取订单
  getOrderEvent(res){
      
      this.setData({
        orderList: res
      })
    
  },
  //获取地理坐标成功后，跳转附近餐厅列表
  getLocalSucc(res){
   
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._offEvent()
    this._bindEvent()
    // Index._getPageInfo(false)
    //this.setBaner();
   // this.rangeEvent();
   // this.recommendEvent()
    //用户登录
    // getApp().UserToLogin((res) => {
    
    // })

    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.hideLoading()
    //this.onUnload()
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
  //刷新
  onrefresh(){
    // this.setData({
    //   orderList:[]
    // })
    User.getOrderList()
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

  }
 
})
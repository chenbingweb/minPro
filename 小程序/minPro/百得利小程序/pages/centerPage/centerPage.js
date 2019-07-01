// pages/beadhouseMap/beadhouseMap.js
let app = getApp();
let _util = require('../../utils/util.js');
import Ajax from "../../libs/Ajax.js";
let _interface = require('../../utils/interface.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBar: app.globalData.navBar,
    showLogin:true,
    showButton:true,
    userInfo:null,
    login:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().updateNav(3)
    // wx.showLoading({
    //   title: '加载中',
    //   mask:true
    // })
    //获取用户id
    this.uid=app.globalData.uid;
    if(this.uid=='')
    {
      this.setData({
        showLogin:false
      })
    }
   
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
   
    if (!app.globalData.UserId)
    {
      //登陆，获取用户绑定信息
      app.UserLogin(() => {
        console.log(app.globalData)
        // this.setData({
        //   userInfo: app.globalData.userInfo,
        //   showLogin: true
        // })
        this.getUserInfo(app.globalData.UserId)
        this.setData({
          login: getApp().globalData.UserId == undefined ? false : true
        })
      })
    }
    else
    {
      // this.setData({
      //   userInfo: app.globalData.userInfo,
      //   showLogin: true
      // })
     this.getUserInfo(app.globalData.UserId)
     this.setData({
       login: getApp().globalData.UserId == undefined ? false : true
     })
    }
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
   
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

  },
  //用户手动登录
  login:function(){
    wx.showLoading({
      title: '登录中...',
      mask: true
    })
    app.UserLogin(()=>{
      console.log(app.globalData)
     
      // this.setData({
      //   userInfo: app.globalData.userInfo,
      //   showLogin:true
      // })
      this.getUserInfo(app.globalData.UserId)
      wx.hideLoading()
    })

  },
  //跳转
  toNavigator:function(e){
    let url=e.currentTarget.dataset.url;
    //获取用户绑定状态
    if (app.globalData.UserId)
    {
      wx.navigateTo({
        url: url,
      })
    }
    else
    {//跳转至绑定页面
      wx.showToast({
        title: '尚未登录,请登录',
        icon: 'none'
      })
    }
    
  },
  //获取用户基本信息
  getUserInfo(id){
   
    let data = { AccessToken: id }
    let ajax = new Ajax({
      data,
      path: _interface.userInfo
    })
    ajax.then(res => {
      if (res.errcode==0)
      {
        console.log(res.data)
        this.setData({
          userInfo: res.data,
          showLogin: true,
          showButton:false
        })
      }
      console.log(res)
    }).catch(err => {

    })
  }

})
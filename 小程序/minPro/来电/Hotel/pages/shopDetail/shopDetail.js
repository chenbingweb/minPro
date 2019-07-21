// pages/shopDetail/shopDetail.js
import { getNearList } from "./fn.js"
import { User } from "../../model/user.js"; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    isSign: false,
    loginPhone: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideNavigationBarLoading();

    User.UserToLogin(res => {
      this.setData({
        isSign: User.isSign
      })
    })
    let { sid } = options;
    getNearList(sid,this)
  },
  //注册
  onGetUserInfo({ detail }) {
    if (detail.errMsg == 'getPhoneNumber:fail user deny') return
    if (User.isSign == false) {
      detail.phone_iv = this.phoneInfor.iv;
      detail.phone_encryptedData = this.phoneInfor.encryptedData;
    }

    User.register(detail, () => {
      User.scanningCode()
    })
  },
  //手机号注册
  onSign({ detail }) {

    if (detail.errMsg == 'getUserInfo:fail auth deny') return
    this.phoneInfor = detail;
    this.setData({
      loginPhone: true
    })
    wx.showToast({
      title: '手机号验证成功',
      mask: true
    })
    console.log(detail)
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
  //导航
  onDH(){
    let latitude = parseFloat(this.data.detail.latitude);
    let longitude = parseFloat( this.data.detail.longitude);
    wx.openLocation({
      latitude,
      longitude,
      scale: 18
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
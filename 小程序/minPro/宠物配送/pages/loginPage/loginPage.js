// pages/loginPage/loginPage.js
import { User} from "../../model/user.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.account="";
    this.pwd=""
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onAccount({detail:{value}}){
    console.log(value)
    this.account = value;
  },
  onPwd({ detail: { value } }) {
    this.pwd = value;
    console.log(value)
  },
  //确认登录
  onGetUserInfo({ detail}){
    if (detail.errMsg == 'getUserInfo:fail auth deny') return;
    if (this.account==''){
      wx.showToast({
        title: '请输入您的账号',
        icon:"none"
      })
      return;
    } 
    if (this.pwd == '') {
      wx.showToast({
        title: '请输入密码',
        icon: "none"
      })
      return;
    } 
    detail.account = this.account;
    detail.pwd=this.pwd;
    User.register(detail,res=>{
      wx.reLaunch({
        url: '../index/index',
      })
      User.isSign = false;//默认未注册
      User.token = '';//用户id
      User.userInfo = null;
    })
    console.log(detail)
  }
})
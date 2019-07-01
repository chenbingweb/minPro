// pages/workDetail/workDetail.js
let _fn=require("./fn.js")
import Tool from "../../libs/Tool.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selfDetail:{},
    imgUrl:getApp().globalData.imgUrl,
    sid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.sid=options.sid;
    let time=options.time;
    //import Tool from "../../libs/Tool.js";
    if (time) {
      this.setData({
        time: Tool.formatTime(new Date(parseInt(time) * 1000), '-')
      })
    }
    this.setData({
      sid: this.sid
    })
    _fn.getSelfDetail(this)
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
  
  }
})
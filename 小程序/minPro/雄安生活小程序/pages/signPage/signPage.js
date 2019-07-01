// pages/signPage/signPage.js
let _fn=require("./fn.js")
let _interface=require("../../utils/interface.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signList:[],
    dataObj: {},
    signDayList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    _fn.toSign(this)
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
  //获取签到记录
  pageData({detail}){
    let signDayList = this.data.signDayList;
    console.log(detail)
    signDayList.push(...detail)
    this.setData({
      signDayList
    })
    console.log(signDayList)
  }
})
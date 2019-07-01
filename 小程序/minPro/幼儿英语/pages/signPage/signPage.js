// pages/signPage/signPage.js
let _fn=require("./fn.js")
let _interface = require('../../utils/interface.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signInfo:null,
    signHisList:[],
    dataObj: {},
    day:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.updateShareMenu({
      withShareTicket: true,
      success() {
        console.log("set_share_succ")
      }
    })
    console.log(getApp().globalData.UserId)
    this.day = undefined;
    this.gold = undefined;
    this.setData({
      CheckInPageTip: getApp().globalData.BECConf.Text.CheckInPageTip.Value,
      ['dataObj']: {
        url: _interface.getSignList,
        outData: { userid: getApp().globalData.UserId }
      }
    })
    _fn.getSignPageInfo(this)
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
    this.day = undefined;
    this.gold = undefined;
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.day = undefined;
    this.gold = undefined;
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
   * 用户点击右上角分享*/
  
  onShareAppMessage: function () {
    return getApp().ShareFn({
      imageUrl: getApp().globalData.shareInfo.share_img,
      title: getApp().globalData.shareInfo.share_title,
      sharePath: "pages/signPage/signPage",
      isBtn: false
    })
  }, 
  //签到
  toSign(){
    _fn.toSignEvent(this)
  },
  //获取签到记录
  pageData({detail}){
    for(let i=0;i<detail.length;i++){
      detail[i].date = detail[i].date.replace(/[-]/g, '.')
    }
    let list = this.data.signHisList;

    list.push(...detail)
    this.setData({
      signHisList: list
    })
  }

})
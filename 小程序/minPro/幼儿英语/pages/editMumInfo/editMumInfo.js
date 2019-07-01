// pages/editMumInfo/editMumInfo.js
let _fn=require("./fn.js")
let Tool=require("../../libs/Tool.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{
      sex: "male"
    },
    showTip:false,
    gold:0,
    staticUrl: getApp().globalData.staticUrl,
    birthday:'',
    ParentInformationPageTip:''
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ParentInformationPageTip: getApp().globalData.BECConf.Text.ParentInformationPageTip.Value
    })
    wx.updateShareMenu({
      withShareTicket: true,
      success() {
        console.log("set_share_succ")
      }
    })
    _fn.getMumInfo(this)
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
    return getApp().ShareFn({
      imageUrl: getApp().globalData.shareInfo.share_img,
      title: getApp().globalData.shareInfo.share_title,
      sharePath: 'pages/editMumInfo/editMumInfo',
      isBtn: false
    })
  },
  radioChange({detail}){
    let value=detail.value;
    this.setData({
      ['info.gender']:value
    })
  },
  // 提交
  formSubmit({ detail}){
    this.saveData = detail.value;
    _fn.saveInfo(this)
  },
  //返回上页面
  goOnBK(){
    wx.navigateBack({
      delta:1
    })
  },
  //生日选择
  birthDayEvent({detail}){
    let {value}=detail;
    this.setData({
      ["info.age"]:value
    })
  }
})
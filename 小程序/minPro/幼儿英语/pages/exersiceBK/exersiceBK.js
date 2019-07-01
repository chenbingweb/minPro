// pages/exersiceBK/exersiceBK.js
let _fn=require("./fn.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMark:false,
    selectNumList:[],
    explain:'',
    staticUrl: getApp().globalData.staticUrl
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
    this.userid = getApp().globalData.UserId;
    this.uid = options.uid;
    this.lid = options.lid;
    this.num='';//选择数量
    this.cid = options.cid;
    this.totalNum=undefined;//总题数
    _fn.getQuestionNum(this)
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
      sharePath: "pages/exersiceBK/exersiceBK",
      isBtn: false
    })
  },
  //选择题目数量
  radioChange({detail}){
    console.log(detail)
    this.num=detail.value;
    if(this.num=='') return
    _fn.userSelect(this)
  },
  //确认
  userSure(){
    _fn.endSelectNum(this)
    console.log(this.num)
  },
  //继续备课
  goOnBK() {
    wx.navigateBack({
      delta: 1
    })
  },
  //关闭提示
  closeTip() {
    this.setData({
      showMark: false
    })
  },
})
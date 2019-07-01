// pages/myWallet/myWallet.js
let _interface = require('../../utils/interface.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected:'xb',
    dataObj:{},
    list:[],
    userIntegral:null
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
    let src=options.src;

    this.setData({
      selected: src,
      userIntegral: getApp().globalData.userIntegral,
      ['dataObj']: {
        url: src == 'xb' ? _interface.getUserConsumeXB : _interface.getUserConsumeMY,
        outData: { userid: getApp().globalData.UserId ||0}
      }
    })
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
      sharePath: "pages/myWallet/myWallet",
      isBtn: false
    })
  },
  // 选择
  selectBtn(e) {
    let id = e.currentTarget.id;
    this.setData({
      selected: id,
      list:[]
    })
    this.setData({
      selected: id,
      ['dataObj']: {
        url: id == 'xb' ? _interface.getUserConsumeXB : _interface.getUserConsumeMY,
        outData: { userid: getApp().globalData.UserId }
      }
    })
  },
  pageData({ detail}){
    wx.hideLoading()
    let list = this.data.list;
    list.push(...detail)
    this.setData({
      list: list
    })
  }
})
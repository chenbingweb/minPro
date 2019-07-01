// pages/subPackages/pages/tiXianTip/tiXianTip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTX:false,
    arrMsg:[{
      msg:'小程序上线了',
      time:'2018.09.30 08:00:00'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //站内信息
    this.setData({
      isTX: options.src =='msg'
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

  },
  OnBack(){
    getApp().globalData.wnds.Wnd_TiXianTip.back()
  }
})
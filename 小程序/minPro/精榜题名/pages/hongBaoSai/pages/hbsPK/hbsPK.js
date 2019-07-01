// pages/hongBaoSai/pages/hbsPK/hbsPK.js
let datas={
  daanBtn: [
    {
      v: 0,//是否显示按钮
      txt: "按钮文本",//按钮文本
      style: "",//风格  select_yes select_no
      licon: null,//按钮上左边图标
      ricon: null,//按钮上右边图标,
      select: '',
      outer: false,
      lp: false,
      rp: false,
      X: 1
    },
    {
      v: true, select: '', txt: "按钮文本", style: "select_yes", licon: null, ricon: null, outer: false, lp: false, rp: false,
      X:1
    },
    {
      v: true, select: '', txt: "按钮文本", style: "select_no", licon: null, ricon: null, outer: false, lp: false, rp: false,
      X: 1
    },
    {
      v: true, select: '', txt: "按钮文本", style: "", licon: null, ricon: null, outer: false, lp: false, rp: false,
      X: 1
    }
  ]
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: datas
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
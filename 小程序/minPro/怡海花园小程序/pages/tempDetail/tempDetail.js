// pages/tempDetail/tempDetail.js
let bar = [
  {
      name: `首页`,
    selected: true,
    icon: '../../images/home_n.png',
    icon_s: '../../images/home_s.png',
    path: '../index/index' ,
    width:32,
    height:32
  }
  ,
  {
      name: '发布',
    selected: false,
    icon: '../../images/release.png',
    icon_s: '../../images/release.png',
    path: '',
    width:81,
    height: 81
  },
  {
    name: '我的',
    selected: false,
    icon: '../../images/my_n.png',
    icon_s: '../../images/my_y.png',
    path: '../myCenter/myCenter',
    width: 36,
    height: 34
  }]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bar: bar,
    navBarKey:'bk'
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
  
  },
  onToDetail(){
    wx.navigateTo({
      url: '../tempDetailInfo/tempDetailInfo',
    })
  }
})
// pages/myRelease/myRelease.js
let tab_1=[
  {
    id:'fb',
    selected:true,
    name:'发布'
  },
   {
    id: 'close',
    selected: false,
    name: '关闭'
  }
]
let tab_2 = [
  {
    id: 'used',
    selected: true,
    name: '二手'
  },
  {
    id: 'theme',
    selected: false,
    name: '话题'
  },
  {
    id: 'active',
    selected: false,
    name: '活动'
  }
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList_1: tab_1,
    tabList_2: tab_2
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
  onSelectTab1({detail}){
    console.log(detail)
  },
  onSelectTab2({ detail}) {
    console.log(detail)
  }
})
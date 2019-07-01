// pages/search/search.js
let _fn=require("./fn.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labels:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // _fn.getSeachList(this)
    this.key = '';
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
  //搜索
  searchConfirm({detail}){
    let {value}=detail;
    this.key = value;
    if (this.key=='')
    {
      wx.showToast({
        title: '请输入搜索关键词',
        icon:'none'
      })
      return 
    }
    _fn.getResultList(this)
    console.log(value)
  },
  //点击 猜你想搜
  toSearchList({currentTarget}){
    let {name } = currentTarget.dataset;
    this.key=name;
    _fn.getResultList(this)
    console.log(name)
  }
})
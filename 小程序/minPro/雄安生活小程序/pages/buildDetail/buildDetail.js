// pages/buildDetail/buildDetail.js
let _fn=require("./fn.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bulidDetail:null,
    imgUrl: getApp().globalData.imgUrl,
    baseSet: {
      hiddDefinedDots:true,//隐藏自定义面板指示
      indicatorDots: false,//是否显示面板指示点
      indicatorColor: 'rgba(0, 0, 0, .3)',//指示点颜色
      indicatorActiveColor: '#000000',//当前选中的指示点颜色
      autoplay: true,//是否自动切换
      interval: 5000,//自动切换时间间隔
      duration: 1000,//滑动动画时长
      circular: true,//是否采用衔接滑动
      vertical: false//滑动方向是否为纵向
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.bid = options.id;//楼盘id
    this.preimg=[]
    //获取楼盘详情
    _fn.getBuildDetail(this)
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
  onShowImg({currentTarget}){
    let {index}=currentTarget.dataset;
    wx.previewImage({
      current:index,
      urls: this.preimg,
    })
  }
})
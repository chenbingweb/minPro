// pages/infoRelDetail/infoRelDetail.js
let _fn=require('./fn.js')
import Tool from "../../libs/Tool.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoDetail:{},
    imgUrl:getApp().globalData.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Inid=options.id;
    let time = options.time;
    if (time) {
      this.setData({
        time: Tool.formatTime(new Date(parseInt(time) * 1000), '-')
      })
    }
    this.img=[]
    _fn.getInfoDetail(this)
    // wx.showLoading({
    //   title: '加载中...',
    //   mask:true
    // })
    // wx.getStorage({
    //   key: 'infoDetai',
    //   success: res=>{
    //     if(res.data)
    //     {
    //       this.setData({
    //         infoDetail:res.data
    //       })
    //       wx.hideLoading()
    //    //   wx.removeStorageSync('infoDetai')
    //     }
    //   },
    // })
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
  viewImg({currentTarget}){
    let {index}=currentTarget.dataset;
    console.log(this.img)
    wx.previewImage({
      urls: this.img,
      current:index
    })
  }
})
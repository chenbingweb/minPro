// pages/jobDetail/jobDetail.js
let _fn=require("./fn.js");
import Tool from "../../libs/Tool.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectNav:'job',
    imgUrl: getApp().globalData.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.jid = options.id;//获取id
    let time=options.time;
    if(time)
    {
      this.setData({
        time: Tool.formatTime(new Date(parseInt(time)*1000),'-')
      })
    }
    _fn.getJobDetail(this)
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
  //选择
  selectNav({currentTarget}){
    let {nav}=currentTarget.dataset;
    this.setData({
      selectNav:nav
    })
    
    console.log(nav)
  },
  viewImg({ currentTarget }){
    let {index} =currentTarget.dataset;

    let list = [];

    this.data.jobDetail.companyDetail.img_url.forEach(item=>{
      list.push(this.data.imgUrl + item) 
    })
    console.log(list)
    wx.previewImage({
      current:list[index],
      urls: list,
    })
  }
})
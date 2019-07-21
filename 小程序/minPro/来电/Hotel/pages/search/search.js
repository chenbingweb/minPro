// pages/search/search.js
let _interface =require("../../utils/interface.js")
import { getNearList } from "./fn.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj:{},
    list:[],
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { content } =options;
    getNearList(content,this)
    this.setData({
      content: content,
      dataObj: {
        url: _interface.getNearList || '',
        outData: {
          userId: getApp().globalData.userId,
          // village_id: getApp().globalData.village_id,
          // key: '',
          // collect: ''//
        }
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
  onCom({detail:{value}}){
    getNearList(value, this)
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
  onPageData({ detail }) { }
})
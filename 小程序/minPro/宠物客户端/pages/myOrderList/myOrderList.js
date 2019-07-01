// pages/myOrderList/myOrderList.js
let _interface = require('../../utils/interface.js')
import { User } from "../../model/user.js"
import Tool from "../../libs/Tool.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj:{},
    orderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      
      dataObj: {
        url: _interface.orderList || '',
        outData: {
          token: User.token
          // userId: getApp().globalData.userId,
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
  ///
  onPageData({detail}){
    detail.forEach(item=>{
      item.create_at = Tool.formatTime(new Date(item.create_at * 1000), '-', true);
    
    })
    let list = this.data.orderList;
    list.push(...detail);

    this.setData({
      orderList:list
    })
    console.log(detail)
  },
  onRefresh(){
    
    this.setData({
      orderList:[],
      dataObj: {
        url: _interface.orderList || '',
        outData: {
          token: User.token
          // userId: getApp().globalData.userId,
          // village_id: getApp().globalData.village_id,
          // key: '',
          // collect: ''//
        }
      }
    })
  }
})
// pages/myOrder/myOrder.js
let _interface=require("../../utils/interface.js");
import { User } from "../../model/user.js";
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj:{},
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dataObj: {
        url: _interface.getOrderlist || '',
        outData: {
          token: User.token
        }
      }
    })
  },
  onPageData({ detail }) {
    if(detail.length==0) return
    let list=this.data.list;
    detail.forEach(item=>{
      item.food_names = item.items[0].name;
      item.quantity =0;
      item.items.forEach(child=>{
        item.quantity += child.quantity;
        
      })
      item.restaurant_logo_url = getApp().globalData.imgUrl + item.restaurant_logo_url
    })
    list.push(...detail)
    this.setData({
      list
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

  }
})
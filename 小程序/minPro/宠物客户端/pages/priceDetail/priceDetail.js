// pages/priceDetail/priceDetail.js
let _interface = require('../../utils/interface.js');
import Ajax from "../../libs/Ajax.js"
import { User } from "../../model/user.js"
let WxParse = require('../../wxParse/wxParse.js');
//获取文章详情 richTextImg(reg, strings, replaceString)
function getDetail(that, path = _interface.priceIntroduce) {
  wx.showLoading({
    title: '加载中...',
  })
  var data = {
    token: User.token
  }
  var ajax = new Ajax({
    data,
    path: path
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      WxParse.wxParse('article', 'html', res.data, that, 5);


    }
    else {

    }
  })
  ajax.catch(err => {
    wx.hideLoading()
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let ajax = new Ajax({
      path: _interface.priceList,
      data: { id: options.oid, token: User.token }
    })
    ajax.then(res => {
      wx.hideLoading();
      if (res.errcode == 0) {
        res.data.distance = (parseFloat(res.data.distance)/1000).toFixed(2)
        this.setData({
          detail: res.data
        })
        getDetail(this)
      }
      console.log(res)
    })
    ajax.catch(err => {

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
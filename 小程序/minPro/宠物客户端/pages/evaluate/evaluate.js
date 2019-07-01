// pages/evaluate/evaluate.js
let _interface = require('../../utils/interface.js');
import Ajax from "../../libs/Ajax.js";
import { User } from "../../model/user.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.oid=options.oid;
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
  onSubmit({ detail: { value } }){
    if (value.platform == '') {
      wx.showToast({
        title: '请输入您的评价',
        icon: 'none',
        mask: true
      })
      return
    }
    if (value.send == '') {
      wx.showToast({
        title: '请输入您的评价',
        icon: 'none',
        mask: true
      })
      return
    }
    value.token=User.token;
    value.id=this.oid;
    wx.showLoading({
      title: '提交中...',
      mask: true
    })
    let ajax = new Ajax({
      path: _interface.evalute,
      data: value
    })
    ajax.then(res => {
      wx.hideLoading();
      if (res.errcode == 0) {
        wx.showToast({
          title: '提交成功',
          mask: true
        })
        getCurrentPages().forEach(item=>{
          if (item.route == "pages/orderDetail/orderDetail")
          {
            item.setData({
              ['detail.is_comment']:1
            })
          }
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 2000)
      }
     
    })
    ajax.catch(err => {

    })
    console.log(value)

  }
})
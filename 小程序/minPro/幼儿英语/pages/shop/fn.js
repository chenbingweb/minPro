let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
function getShopInfo(that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var data = {
    userid: that.userid,
    
  }
  var ajax = new Ajax({
    data,
    path: _interface.getShopInfo
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      that.setData({
        shopInfo:res.data,
        userIntegral: res.data.userinfo
      })
    }
    else {
      wx.showToast({
        title: '获取失败',
        icon:'none'
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading()
    console.log(err)
  })
}
//兑换学贝
function exchangeMY(that) {
  wx.showLoading({
    title: '兑换中...',
    mask: true
  })
  var data = {
    userid: that.userid,
    id: that.adfloor
  }
  var ajax = new Ajax({
    data,
    path: _interface.exchangeMY
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {

      if(res.data.is_ok)
      {
        wx.showToast({
          title: '兑换成功',
          mask:true
        })
        that.setData({
          ['userIntegral.diamonds']: res.data.diamonds,
          ['userIntegral.gold']: res.data.total_gold
        })
   
        getApp().globalData.userIntegral.diamonds = res.data.diamonds;
        getApp().globalData.userIntegral.total_gold = res.data.total_gold;
      }
      else
      {
        wx.showToast({
          title: res.msg,
          icon:'none',
          mask: true
        })
      }
    }
    else {
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading()
    console.log(err)
  })
}
//兑换学贝
function exchangeCode(that) {
  wx.showLoading({
    title: '兑换中...',
    mask: true
  })
  var data = {
    userid: that.userid,
    code: that.code
  }
  var ajax = new Ajax({
    data,
    path: _interface.exchangeCode
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {

      if (res.data.is_ok) {
        wx.showToast({
          title: res.msg,
          mask: true
        })
       
        that.setData({
          ['userIntegral.diamonds']: res.data.diamonds,
          code_1: '',
          code_2: ''
        })
        getApp().globalData.userIntegral.diamonds = res.data.diamonds;
      }
      else {

        wx.showToast({
          title: res.msg,
          icon: 'none',
          mask: true
        })
      }
    }
    else {
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading()
    console.log(err)
  })
}
//购买魔药成功后，获取用户总魔药
function payBack(that){
  // wx.showLoading({
  //   title: '加载中...',
  //   mask: true
  // })
  var data = {
    userid: that.userid,
  }
  var ajax = new Ajax({
    data,
    path: _interface.payBack
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      that.setData({
        ['userIntegral.diamonds']: res.data.diamonds,
      })
    }
    else {
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading()
    console.log(err)
  })
}
module.exports={
  getShopInfo,
  exchangeMY,
  exchangeCode,
  payBack
}
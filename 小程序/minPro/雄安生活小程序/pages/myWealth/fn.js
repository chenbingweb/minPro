let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"
//获取我的钱包列表
function getMyWealthList(that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  let data = {
    userId: getApp().globalData.userId
  }
  new Ajax({
    path: _interface.getWallList,
    data
  }).then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      console.log(res.data)
      res.data.day = Math.ceil(res.data.day)
      that.setData({
        shopList:res.data,
        selectItem: res.data.month.id
      })
    }
    else {
      wx.showToast({
        title: '获取失败',
        icon:'none'
      })

    }
  }).catch(err => {
    wx.hideLoading()
    wx.showToast({
      title: '服务器错误',
      icon: 'none'
    })
  })
}
//获取之支付参数
function order(that){
  wx.showLoading({
    title: '购买中...',
    mask: true
  })
  let data = {
    userId: getApp().globalData.userId,
    id:that.payId
  }
  new Ajax({
    path: _interface.getPayData,
    data
  }).then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      console.log(res.data)
     
    }
    else {
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })

    }
  }).catch(err => {
    wx.hideLoading()
    wx.showToast({
      title: '服务器错误',
      icon: 'none'
    })
  })
}
module.exports = {
  getMyWealthList,
  order
}
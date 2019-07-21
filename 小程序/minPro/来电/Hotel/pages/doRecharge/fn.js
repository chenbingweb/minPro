let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js";
import { User } from "../../model/user.js";
import { Location } from "../../model/map.js";
export function getRechangeList(that){
  wx.showLoading({
    title: '加载中...',
    mask:true
  })
  var ajax = new Ajax({
    data:{},
    path: _interface.getRechangeList  // _interface.get_shop_banner //
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      if(res.data.length)
      {
        res.data[0].select = true
        that.setData({
          rechange: res.data
        })
      }
      

    }
    else {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    }


  })
  ajax.catch(err => {
    that.isPos = true;
    console.log(err)
  })
}
//获取banner 
export function pay(pid,callback) {
  wx.showLoading({
    title: '正在充值...',
    mask:true
  })
  var data = {
    type: '2',
    uid: User.userId,
    openid: User.openid,
    id:pid
  }
  var ajax = new Ajax({
    data,
    path: _interface.payment  // _interface.get_shop_banner //
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      Tool.WXpay(res.data).then(res => {
        console.log(res)
        callback && callback(res)
      }).catch(err => {
        wx.showToast({
          title: '支付失败',
          icon: 'none'
        })
      })

    }
    else {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    }


  })
  ajax.catch(err => {
    that.isPos = true;
    console.log(err)
  })
}
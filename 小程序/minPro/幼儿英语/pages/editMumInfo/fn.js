let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
//获取妈妈的信息
function getMumInfo(that) {

  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var data = {
    userid: getApp().globalData.UserId
  }
  var ajax = new Ajax({
    data,
    path: _interface.getMumInfo
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {

      that.setData({
        info: res.data
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
//保存妈妈信息
function saveInfo(that) {
  if (!checkInput(that)) {
    return
  }
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var data = {
    userid: getApp().globalData.UserId,
  }
  data = Object.assign(data, that.saveData)
  var ajax = new Ajax({
    data,
    path: _interface.updataMumInfo
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      //gold
      if (res.data.get_gold)
      {
        that.setData({
          showTip:true,
          gold: res.data.get_gold
        })
      }
      else
      {
        wx.showToast({
          title: '保存成功',
          mask: true
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 2000)
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
//验证
function checkInput(that){
  let email = that.saveData.email;
  let reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/g;
  if (!reg.test(email))
  {
    wx.showToast({
      title:'输入的邮箱不正确',
      icon:'none'
    })
    return false
  }
  return true
}
module.exports = {
  getMumInfo,
  saveInfo
}
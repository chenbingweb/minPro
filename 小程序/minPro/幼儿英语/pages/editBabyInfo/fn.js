let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
//获取宝宝的信息
function getBabyInfo(that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var data = {
    userid: getApp().globalData.UserId
  }
  var ajax = new Ajax({
    data,
    path: _interface.getBabyInfo
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
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading()
    console.log(err)
  })
}
//保存宝宝信息
function saveInfo(that){
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var data = {
    userid: getApp().globalData.UserId,

  }
  data = Object.assign(data,that.saveData)
  var ajax = new Ajax({
    data,
    path: _interface.updataBabyInfo
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      if (res.data.get_gold) {
        that.setData({
          showTip: true,
          gold: res.data.get_gold
        })
      }
      else
      {
        
        wx.showToast({
          title: '保存成功',
          mask:true
        })
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1
          })
        },2000)
      }
      
    }
    else {
      wx.showToast({
        title: '获取失败',
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading()
    console.log(err)
  })
} 

module.exports = {
  getBabyInfo,
  saveInfo
}
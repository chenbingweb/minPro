let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
//获取妈妈的信息
function getMumInfo(that){
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
        dflag: false
      })
      for (let key in res.data) {
        if (key == 'age' || key == 'gender' || key == 'name' || key == 'email' || key =='mobile') {
          if (res.data[key] == '' || res.data[key] == null) {
            that.setData({
              dflag: true
            })
            break
          }
        }
      }
      that.setData({
        info:res.data
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
//修改头像


module.exports={
  getMumInfo
}
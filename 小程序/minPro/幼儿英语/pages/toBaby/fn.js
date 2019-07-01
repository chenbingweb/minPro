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
      //是否显示小圆点
      that.setData({
        dflag: false
      })
      for (let key in res.data){
        if (key == 'birth' || key == 'gender' || key == 'nickname') {
          if (res.data[key] == '' || res.data[key] == null) {
            that.setData({
              dflag: true
            })
            break
          }
        }
      }

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


module.exports = {
  getBabyInfo
}
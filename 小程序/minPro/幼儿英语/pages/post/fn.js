let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
//获取成绩单
function getPoster(that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var data = {
    courseid: that.cid,
    share_userid: that.shareid
  }
  var ajax = new Ajax({
    data,
    path: _interface.getPoster
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      console.log(res)
      that.getPosterInf(res.data)
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
  getPoster
}
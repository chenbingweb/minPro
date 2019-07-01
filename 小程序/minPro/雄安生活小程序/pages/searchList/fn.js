
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"
//获取搜索列表
function getResultList(that) {
  wx.showLoading({
    title: '搜索中...',
  })
  let data = {
    key: that.key||'房'
  }
  let ajax = new Ajax({
    data,
    path: _interface.getSearchResultRest
  })
  ajax.then(res => {
    wx.hideLoading()
    console.log(res)
    if (res.errcode == 0) {

      that.setData({
        resultList: res.data
      })
    }
    else {

    }
  })
  ajax.catch(err => {
    wx.hideLoading()
    wx.showToast({
      title: '服务器报错了',
      icon: "none"
    })
  })
}
module.exports = {
  getResultList
}
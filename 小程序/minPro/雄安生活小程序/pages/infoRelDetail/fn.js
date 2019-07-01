let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"
//获取任务列表
function getInfoDetail(that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  let data = {
    id: that.Inid
  }
  let ajax = new Ajax({
    path: _interface.getInfoDetail,
    data
  }).then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      res.data.img_url=res.data.img
      that.setData({
        infoDetail: res.data
      })
      
      res.data.img.forEach(item=>{
        let img = getApp().globalData.imgUrl + item
        that.img.push(img)
      })
      console.log(that.img)
    }
    else {
      wx.showToast({
        icon: 'none',
        title: '获取数据失败',
      })
    }

  }).catch(err => {
    wx.hideLoading();
    wx.showToast({
      icon: 'none',
      title: '服务器报错了...',
    })
  })
}

module.exports = {
  getInfoDetail
}
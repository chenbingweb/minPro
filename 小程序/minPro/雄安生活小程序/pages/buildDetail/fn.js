let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"

//获取楼盘详情
function getBuildDetail(that) {
  var data = {
    id:that.bid
  }
  wx.showLoading({
    title: '加载中...',
    mask:true
  })
  var ajax = new Ajax({
    data,
    path: _interface.getBuiltDetail
  })
  ajax.then(res => {
    wx.hideLoading();
    if (res.errcode==0)
    {
      res.data.create_at = Tool.formatTime(new Date(parseInt(res.data.create_at)*1000),'-')
      res.data.tag = res.data.tag.join(" | ")
      that.preimg=[]
      res.data.sell_door_list.forEach(item=>{
        that.preimg.push(getApp().globalData.imgUrl + item.img_url)
      })
      res.data.img_url= res.data.img_url.map((item,index)=>{
      
        return {
          img_url:item,
          id:index
        }
      })
      that.setData({
        bulidDetail:res.data
      })
    }
  })
  ajax.catch(err => {
    wx.hideLoading();
    wx.showToast({
      title: '服务器报错了...',
    })
  })
}


module.exports = {
  getBuildDetail
}




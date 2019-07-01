//AccessToken=6c7f841&id=1
let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
let WxParse = require('../../wxParse/wxParse.js');
//获取文章详情 richTextImg(reg, strings, replaceString)
function getDetail(that)
{
  wx.showLoading({
    title: '加载中...',
  })
  var data = {
    AccessToken:getApp().globalData.UserId,
    id:that.id
  }
  var ajax = new Ajax({
    data,
    path: _interface.detail
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode==0)
    {
      WxParse.wxParse('article', 'html', res.data.Details, that, 5);
      that.setData({
       Title: res.data.Title,
         //richText: res.data.Details
      })
    
    }
    else
    {

    }
  })
  ajax.catch(err => {
    wx.hideLoading()
  })
}
module.exports={
  getDetail
}

let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"

//获取房源信息
function getSeachList(that) {
  wx.showLoading({
    title: '加载中...',
  })
  let data = {

  }
  let ajax = new Ajax({
    data,
    path: _interface.getSearchLabel
  })
  ajax.then(res=>{
    wx.hideLoading()
    if(res.errcode==0)
    {
      that.setData({
        labels:res.data
      })
    }
    else
    {

    }
  })
  ajax.catch(err=>{
    wx.hideLoading()
    wx.showToast({
      title: '服务器报错了',
      icon:"none"
    })
  })
}
//获取搜索列表
function getResultList(that) {
  wx.showLoading({
    title: '搜索中...',
  })
  let data = {
    key: that.key
  }
  let ajax = new Ajax({
    data,
    path: _interface.getSearchResultRest
  })
  ajax.then(res => {
    wx.hideLoading()
    console.log(res)
    if (res.errcode == 0) {
      if(res.data.length)
      {
        res.data.forEach(item=>{
          item.keys = that.key;
        })
        wx.setStorage({
          key: 'searchList',
          data: res.data,
          success:()=>{
            wx.navigateTo({
              url: '../searchList/searchList',
            })
          }
        })
      
      }
      else
      {
        wx.showToast({
          title: '没有找到相关数据，请重新搜索',
          icon:"none"
        })
      }
    
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
  getSeachList,
  getResultList
}

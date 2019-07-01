let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";

function getDetail(that) {
  wx.showLoading({
    title: '加载中...',
  })
  //accesstoken=c83ee&id=40
  var data = {
    accesstoken:getApp().globalData.UserId,
    id:that.Id
  }
  var ajax = new Ajax({
    data,
    path: _interface.couponDetail
  })
  ajax.then(res => {
    console.log(res)
    wx.hideLoading()
    if (res.errcode==0)
    {
      that.setData({
        detail:res.data
      })
    }
    else
    {
      wx.showToast({
        icon:'none',
        title: '获取卡券信息失败',
        
      })
      setTimeout(()=>{
        wx.navigateBack({
          delta: 1
        })
      },2000)
    }
  })
  ajax.catch(err => {
    console.log(err)
  })

}
function getMyDetail(that) {
  wx.showLoading({
    title: '加载中...',
  })
  //accesstoken=c83ee&id=40
  var data = {
    accesstoken: getApp().globalData.UserId,
    id: that.Id
  }
  var ajax = new Ajax({
    data,
    path: _interface.myCoupDetail
  })
  ajax.then(res => {
    console.log(res)
    wx.hideLoading()
    if (res.errcode == 0) {
      console.log('dddd')
      that.setData({
        detail: res.data,
        VehLicense: res.data.VehLicence
      })
    }
    else {
      wx.showToast({
        icon: 'none',
        title: '获取卡券信息失败',

      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 2000)
    }
  })
  ajax.catch(err => {
    console.log(err)
  })

}
//用户信息
//获取用户基本信息
function getUserInfo(that){
   
  let data = { AccessToken: getApp().globalData.UserId }
  let ajax = new Ajax({
    data,
    path: _interface.userInfo
  })
  ajax.then(res => {
    if (res.errcode == 0) {
      that.callBack(res.data.VehLicense)
    }
    console.log(res)
  }).catch(err => {

  })
}

module.exports={
  getDetail,
  getMyDetail,
  getUserInfo
}
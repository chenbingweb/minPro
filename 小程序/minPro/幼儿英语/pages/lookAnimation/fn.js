let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
//获取看动画信息（备课）
function LookAnimation(that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var data = {
    userid: that.userid,
    uid: that.uid,
    lid: that.lid,
    courseid: that.cid
  }
  var ajax = new Ajax({
    data,
    path: _interface.LookAnimation
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      
      that.setData({
        animationInfoList:res.data
      })
      videoExchange( that)
    }
    else {
      wx.showToast({
        title: '获取失败',
        icon:'none'
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
    wx.hideLoading()
    wx.showToast({
      title: '网络不给力呦，请检查网络连接并稍后再试！',
      icon: 'none'
    })
  })
}
//视频
function videoExchange(that) {
  let list = that.data.animationInfoList;
  wx.getNetworkType({
    success: res => {
      // 返回网络类型, 有效值：
      // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
      let networkType = res.networkType;
      console.log(networkType)

      //高清视频
      if (networkType == 'wifi' || networkType == '4g') {
        list.course_url = list.course_url_high
        that.setData({
          animationInfo: list
        })
        // for (let i = 0; i < list.length; i++) {
        //   if (list[i].type == 'high') {
        //     that.setData({
        //       animationInfo: list[i]
        //     })
        //     break
        //   }
        // }
      }
      else {
        list.course_url = list.course_url_low
        that.setData({
          animationInfo: list
        })
        // for (let i = 0; i < list.length; i++) {
        //   if (list[i].type == 'low') {
        //     that.setData({
        //       animationInfo: list[i]
        //     })
        //     break
        //   }
        // }
      }
    }
  })
}
//获取看动画信息（上课）
function LookAnimationSK(that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var data = {
    userid: that.userid,
    uid: that.uid,
    lid: that.lid,
    courseid: that.cid
  }
  var ajax = new Ajax({
    data,
    path: _interface.LookAnimationSK
  })
  ajax.then(res => {
    that.startTime = new Date().getTime()
    console.log(that.startTime)
    wx.hideLoading()
    if (res.errcode == 0) {
      // that.setData({
      //   animationInfo: res.data
      // })
      that.setData({
        animationInfoList: res.data
      })
      videoExchange(that)
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
    console
  })
}




module.exports = {
  LookAnimation,
  LookAnimationSK,
  videoExchange
}
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js";
//获取个人信息
function getUserAllInfo(that){
  let data = {
    userId: getApp().globalData.userId,

  }
  data = Object.assign(data, that.value)
  let ajax = new Ajax({
    data,
    path: _interface.getPersonInfo
  })
  ajax.then(res => {
    wx.hideLoading();
    if (res.errcode == 0) {
      if (Object.keys(res.data).length && res.data.head_img)
      {
        that.isFillInfo = true;
        let reg = /^http*/g;
        let imgUrl = getApp().globalData.imgUrl
        that.setData({
          head_img: reg.test(res.data.head_img) ? res.data.head_img : imgUrl + res.data.head_img,
        })
      }
     
     console.log(res.data)
     console.log(that.isFillInfo)
    }
    else {
     
    }
  })
  ajax.catch(err => {
    wx.hideLoading();
    wx.showToast({
      title: '服务器报错',
      icon: 'none'
    })
  })
}
//毛遂自荐发布
function selfRelease(that) {
  wx.showLoading({
    title: '正在提交...',
  })
  let data = {
    userId: getApp().globalData.userId
  }
  data = Object.assign(data, that.value)
  let ajax = new Ajax({
    data,
    path: _interface.selfRelease
  })
  ajax.then(res => {
    wx.hideLoading();
    if (res.errcode == 0) {
      wx.showToast({
        title: '提交成功',
        mask: true
      })
      setTimeout(() => {
        let category=[]
        data.thinkJob.forEach(item=>{
          category.push(item.category)
        })
        wx.removeStorageSync('experienceList')
        wx.removeStorageSync('educationList')
        wx.removeStorage({
          key: 'wantjobList',
          success: res=>{
            wx.redirectTo({
              url: '../bossReleasSucc/bossReleasSucc?src=selfRelease&category=' + category,
            })
          },
        })
       
        // wx.navigateBack({
        //   delta: 1
        // })

      }, 2000)
    }
    else {
      wx.showToast({
        title: '提交失败',
        icon: 'none'
      })
    }
  })
  ajax.catch(err => {
    wx.hideLoading();
    wx.showToast({
      title: '服务器报错',
      icon: 'none'
    })
  })
}
module.exports={
  selfRelease,
  getUserAllInfo
}
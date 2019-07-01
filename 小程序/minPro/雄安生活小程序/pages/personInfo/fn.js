let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"
//普通用户认证
function AuthUser(that){
  wx.showLoading({
    title: '正在提交...',
  })
  let data={
    userId: getApp().globalData.userId
  }
  data=Object.assign(data,that.value)
  let ajax=new Ajax({
    data,
    path: _interface.authUser
  })
  ajax.then(res=>{
    wx.hideLoading();
    if(res.errcode==0)
    {
      wx.showToast({
        title: '提交成功',
        mask:true
      })
      setTimeout(()=>{
        wx.navigateBack({
          delta:1
        })
      },2000)
    }
    else
    {
      wx.showToast({
        title: '提交失败',
        icon:'none'
      })
    }
  })
  ajax.catch(err=>{
    wx.hideLoading();
    wx.showToast({
      title: '服务器报错',
      icon:'none'
    })
  })
}
//上传图片
function submitEvent(that) {
  wx.showLoading({
    title: '正在提交...',
    mask: true
  })

  that.callBack = function (res) {
    //返回图片地址，执行提交信息
    if (res) {
      that.img_url = res+'';
      sendInfo(that)
    }
    else {
      wx.showToast({
        title: '上传图片失败',
      })
      //测试
       sendInfo(that)
    }
  }
  if (that.tempFilePaths.length)
  {
    getApp().uploadImgs(that)()
  }
  else
  {
    if (that.img_url=='')
    {
      that.img_url = getApp().globalData.userInfo.avatarUrl;
    }
  
    //测试
    sendInfo(that);
    
  }



}
//向后台提交数据
function sendInfo(that) {
  let data = {
    userId: getApp().globalData.userId,
    head_img: that.img_url
  }

  data = Object.assign(data, that.value);
  var ajax = new Ajax({
    data,
    path: that.src == 'center' ? _interface.savaBaseInfo: _interface.saveInfo
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      wx.showToast({
        title: '提交成功',
        mask: true
      })
      setTimeout(() => {
       
        wx.navigateBack({
          delta:1
        })

      }, 2000)

    }
    console.log(res)
  })
  ajax.catch(err => {

    console.log(err)
  })
}

//获取毛遂自荐信息
function getUserAllInfo(that) {
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
      if (that.data.sexList)
      {
     
        //显示性别
        that.data.sexList.forEach((item,index)=>{
          if (parseInt(item.id) == res.data.sex){
            that.setData({
              sexIndex:index
            })
          }
        })
        //显示学历
        that.data.educationList.forEach((item,index)=>{
          if (item == res.data.education) {
            that.setData({
              eduIndex: index
            })
          }
        })

        let reg = /^[a-zA-z]+:/;
        let imgUrl = getApp().globalData.imgUrl;
        that.img_url = res.data.head_img;
        that.setData({
          head_img: reg.test(res.data.head_img) ? res.data.head_img : imgUrl + res.data.head_img,
          birthday: res.data.birthday,
          register: [res.data.born_province, res.data.born_city, res.data.born_area],
          live: [res.data.live_province, res.data.live_city, res.data.live_area],
          work_time: res.data.work_time,
          userAllInfo:res.data,
          phone: res.data.phone
        })

      }
      console.log(res.data)
   
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
//获取个人基本信息
function getUserBaseInfo(that) {
  let data = {
    userId: getApp().globalData.userId,

  }
  data = Object.assign(data, that.value)
  let ajax = new Ajax({
    data,
    path: _interface.getUserBaseInfo
  })
  ajax.then(res => {
    wx.hideLoading();
    if (res.errcode == 0) {

      that.setData({
        head_img: '',
        birthday: res.data.birthday,

        phone: res.data.phone
      })
      if (res.data.phone)
      {
        that.userphone = res.data.phone
      }
     

      console.log(res.data)

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
module.exports={
  AuthUser,
  submitEvent,
  getUserAllInfo,
  getUserBaseInfo
}
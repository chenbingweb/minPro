let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"
//获取可选标签
function getLabel(that) {
  let ajax = new Ajax({
    data: {
      'type': 'recruit'
    },
    path: _interface.getLabelList
  })
  ajax.then(res => {
    if (res.errcode == 0) {
      let data = res.data;
      data.forEach(item => {
        item.selected = false
      })
      that.setData({
        lableList: data
      })
    }
    else {

    }

  })
  ajax.catch(err => {
    console.log('err')
  })
}
//获取薪资
function getPayList(that){
  let ajax=new Ajax({
    data:{},
    path: _interface.getPayList
  })
  ajax.then(res=>{
      if(res.errcode==0)
      {
        let payList = that.data.payList
        payList.push(...res.data);
        that.setData({
          payList: payList
        })
        console.log(payList)
      }
  })
  ajax.catch(err=>{
    wx.showToast({
      title: '服务器报错..',
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
      that.img_url = res;
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
  getApp().uploadImgs(that)()


}
//向后台提交数据
function sendInfo(that) {
  let data = {
    userId: getApp().globalData.userId,
    img_url: that.img_url,
    'type': that.type,
  }
  that.value.tag = that.value.tag.join(',')
  data = Object.assign(data, that.value);
  var ajax = new Ajax({
    data,
    path: _interface.bossRelease
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      wx.showToast({
        title: '提交成功',
        mask: true
      })
      try{
        wx.removeStorageSync('address')
        wx.removeStorageSync('detail')
        wx.removeStorageSync('company_detail')
      }catch(e){
          console.log(e)
      }
    
      setTimeout(() => {
        //boss招聘发布成功提示
        wx.redirectTo({
          url: '../bossReleasSucc/bossReleasSucc?src=bossrelease&category=' + data.category,
        })

      }, 2000)
    }
    else
    {
      wx.showToast({
        title: '提交失败',
        icon:'none',
        mask: true
      })
    }
    console.log(res)
  })
  ajax.catch(err => {

    console.log(err)
  })
}

module.exports = {
  getLabel,
  submitEvent,
  getPayList
}
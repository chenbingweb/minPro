let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"
//获取可选标签
function getLabel(that){
  let ajax = new Ajax({
    data: {
      'type':'house'
    },
    path: _interface.getLabelList
  })
  ajax.then(res => {
    if (res.errcode == 0) {
      let data=res.data;
      data.forEach(item=>{
        item.selected=false
      })
      that.setData({
        lableList:data
      })
    }
    else {

    }

  })
  ajax.catch(err => {
    console.log('err')
  })
}
//获取资讯分类
function getInfoClass(that) {
  let ajax = new Ajax({
    data: {
     
    },
    path: _interface.getInfoClass
  })
  ajax.then(res => {
    if (res.errcode == 0) {
      let data = res.data;
      res.data.unshift({
       name:'请选择',
       id:-1
     })
      that.setData({
        infoList: data
      })
    }
    else {

    }

  })
  ajax.catch(err => {
    console.log('err')
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
  
  }
  //房屋发布类型
  if (that.type)
  {
    data.type = that.type
  }
  //标签
  if (that.value.tag)
  {
    that.value.tag = that.value.tag.join(',')
  }
 
  data = Object.assign(data, that.value);
  var ajax = new Ajax({
    data,
    path: that.path
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
        wx.showToast({
          title: '提交成功',
          mask: true
        })
        setTimeout(() => {
          //个人房源布成功提示 personFlag isPersonal
          if (that.data.isPersonal)
          {
            wx.redirectTo({
              url: '../examiningTip/examiningTip?src=personal&category=' + data.category,
            })
          }
          //资讯发布成功提示
          else if (that.data.isInfo)
          {
            wx.redirectTo({
              url: '../bossReleasSucc/bossReleasSucc?src=info&category_id=' + data.category_id,
            })
          }//房产中介发布
          else
          {
            wx.redirectTo({
              url: '../examiningTip/examiningTip?src=release&category=' + data.category,
            })
          }
         
        }, 2000)
      
    }
    console.log(res)
  })
  ajax.catch(err => {

    console.log(err)
  })
}

module.exports={
  getLabel,
  submitEvent,
  getInfoClass
}
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"
//上传图片
function submitEvent(that){
  wx.showLoading({
    title: '正在提交...',
    mask:true
  })
  that.callBack=function(res){
      //返回图片地址，执行提交信息
      if(res)
      {
        that.license_url = res[0];
        sendInfo(that)
      }
      else
      {
        wx.showToast({
          title: '上传图片失败',
        })
      }
  }
  getApp().uploadImgs(that)()
  // let upload = new Upload({
    
  //   path: _interface.updataImg,
  //   filePath: that.tempFilePaths[0],
  //   formData: {
  //     userId: getApp().globalData.userId
  //   }
  // })
  // upload.then(res => {
  //     wx.hideLoading()
  //   if (res.errcode == 0) {
  //     that.license_url = res.data.license_url;
  //     sendInfo(that)
  //   }
  //   else
  //   {
  //     wx.showToast({
  //       title: '上传图片失败',
  //       icon: 'none',
  //       mask: true
  //     })
      
  //   }

  // }).catch(err => {
    
  //   wx.showToast({
  //     title: '上传图片失败',
  //     icon: 'none',
  //     mask: true
  //   })
  //   wx.hideLoading();
  //   //测试 
  //   that.license_url='/cad/1.jpg'
  //   sendInfo(that)
  // })
}
//向后台提交数据
function sendInfo(that){
  let data={
    userId: getApp().globalData.userId
  }
  data.license_url = that.license_url;
  data=Object.assign(data,that.value);
  var ajax = new Ajax({
    data,
    path: _interface.submitMidd
  })
  ajax.then(res => {
    wx.hideLoading()
    if(res.errcode==0)
    {
      wx.showToast({
        title: '提交成功',
        mask: true
      })
      setTimeout(() => {
        wx.redirectTo({
          url: '../examiningTip/examiningTip',
        })
      }, 2000)
    }
    else
    {
      wx.showToast({
        title: '提交信息失败',
        icon:'none'
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
  
    console.log(err)
  })
}

module.exports={
  submitEvent
}
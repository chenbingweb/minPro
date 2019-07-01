let _interface=require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js"

//推荐职位
export function Login(that) {
  wx.showLoading({
    title: '登录中...',
    mask:true
  })
  wx.login({
    success(res) {
      if (res.code) {
        var data = {
          code: res.code
        }
        var ajax = new Ajax({
          data,
          path: _interface.login
        })
        ajax.then(res => {
            wx.hideLoading()
            if(res.errcode==0)
            {
              getApp().globalData.open_id = res.data.open_id;
              if (res.data.is_bind )
              {
                getApp().globalData.userId = res.data.user_id
              }
              that.setData({
                showLogin: res.data.is_bind == 0?true:false
              })
              
            }
        })
        ajax.catch(err => {
          wx.hideLoading()
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
 
}

//核销
/*
"code": "1",
    "user_id": "123"

*/
export function check(code,callBack){
  wx.showLoading({
    title: '正在核销...',
  })
  let data={
    code,
    user_id: getApp().globalData.userId
  }
  var ajax = new Ajax({
    data,
    path: _interface.use
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      callBack && callBack(res)
    }
    else
    {
      wx.showToast({
        title: res.msg,
        icon:'none'
      })
    }
  })
  ajax.catch(err => {
    wx.hideLoading()
  })
}




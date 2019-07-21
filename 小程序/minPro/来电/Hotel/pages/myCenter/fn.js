let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js";
import { User } from "../../model/user.js";
//获取banner 
export function getBanner(that) {

  var data = {}
  var ajax = new Ajax({
    data,
    path: _interface.get_my_banner  // _interface.get_shop_banner //
  })
  ajax.then(res => {
    if (res.errcode == 0) {
      that.setData({
        banner: res.data || []
      })
    }
    else {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    }


  })
  ajax.catch(err => {

    console.log(err)
  })
}
//生成海报
export function Poster(callback){
  var data = {
    user_id:User.userId
  }
  var ajax = new Ajax({
    data,
    path: _interface.get_my_img  // _interface.get_shop_banner //
  })
  ajax.then(res => {
    if (res.errcode == 0) {
      callback && callback(res.data)
    }
    else {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    }


  })
  ajax.catch(err => {

    console.log(err)
  })
}
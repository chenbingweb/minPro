let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js";
import { User } from "../../model/user.js";
import { Location } from "../../model/map.js";
//获取banner 
export function getNearList(shop_name, that) {
 
  var data = {
    shop_name: shop_name,
    ...User.location
  }
  var ajax = new Ajax({
    data,
    path: _interface.getNearList  // _interface.get_shop_banner //
  })
  ajax.then(res => {

    if (res.errcode == 0) {
      that.setData({
        list:[]
      })
      that.setData({
        list:res.data
      })
      console.log(res.data)

    }
    else {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    }


  })
  ajax.catch(err => {
    that.isPos = true;
    console.log(err)
  })
}
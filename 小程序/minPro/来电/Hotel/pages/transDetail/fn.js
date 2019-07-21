let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js";
import { User } from "../../model/user.js";
import { Location } from "../../model/map.js";
//获取banner 
export function getMoneyList(that) {
  wx.showLoading({
    title: '加载中...',
  })
  var data = {
   uid:User.userId
  }
  var ajax = new Ajax({
    data,
    path: _interface.getMoneyList  // _interface.get_shop_banner //
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      res.data.forEach(item=>{
        item.money = parseFloat(item.money).toFixed(2)
        item.add_time = Tool.formatTime(new Date(parseInt(item.add_time )*1000), '-', true)
      })
      that.setData({
        list: res.data
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
    that.isPos = true;
    console.log(err)
  })
}
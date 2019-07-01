let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
import Upload from "../../libs/Upload.js";
import {User} from "../../model/user.js"
//获取首页信息 getCardList
function getCardList(that) {
  wx.showLoading({
    title: '加载中',
  })
  var data = {
    token: User.token
  }
  var ajax = new Ajax({
    data,
    path: _interface.getCardList
  })
  ajax.then(res => {
    wx.hideLoading()
    if(res.errcode==0)
    {
      res.data.forEach(item=>{
        item.end_time = Tool.formatTime(new Date(item.end_time*1000), '-');
        if (item.discount)
        {
          item.discount = parseInt(item.discount*10)
        }
      })
      that.setData({
        list:res.data
      })
    }
    else
    {
      console.log(res)
    }
  })
  ajax.catch(err => {
    wx.hideLoading()
    console.log(err)
  })
}
function toUserCard(cid){
  wx.showLoading({
    title: '加载中',
  })
  var data = {
    token: User.token,
    id: cid,
    orderPrice: User.inintPrice
  }
  var ajax = new Ajax({
    data,
    path: _interface.isUseCard
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      getCurrentPages().forEach(item=>{
        if (item.route== "pages/index/index")
        {
          item.setData({
            price: res.data.coupon_price
          },()=>{
            User.coupon_id = cid;
            wx.navigateBack({
              delta:1
            })
          })
        }
      })
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
    console.log(err)
  })
}

module.exports = {
  getCardList,
  toUserCard
}




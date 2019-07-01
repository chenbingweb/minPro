let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";

//获取用户购买的优惠券
function getCouponList(that) {
  if (!that.data.showMore)
  {
    wx.showLoading({
      title: '加载中...',
    })
  }
  
/*
AccessToken=7e880f&offset=0&limit=10 :
consumed
:
normal
:
status=normal
*/
  var data = {
    status: that.status == 0 ? 'normal' :'consumed',
    AccessToken: that.UserId,
    offset: (that.page - 1) * that.pageSize,//当前页
    limit: that.pageSize,//总共页数
  }


  var ajax = new Ajax({
    data,
    path: _interface.myCoupon
  })

  let list = that.data.couponList || [];
  ajax.then(res => {
    wx.hideLoading()
    that.setData({
      showMore: false,
    })
    if (res.errcode == 0) {

      if (res.data.length >= that.pageSize) {
        that.morePage = true
        that.setData({
          showTip: false
        })
      }
      else {
        if (that.morePage && res.data.length == 0) {
          that.setData({
            showTip: true
          })
        }
        else 
        {
          that.setData({
            showTip: false
          })
        }

        that.morePage = false
      }
      list.push(...res.data)
      //提示
      if (list.length == 0) {
        that.setData({
          showTip: true
        })
      }
      that.setData({
        couponList: list
      })
    }


    console.log(res)
  })
  ajax.catch(err => {
    console.log(err)
  })
}
module.exports={
  getCouponList
}
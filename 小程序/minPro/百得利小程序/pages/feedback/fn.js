let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";

//获取用户购买的优惠券
function userSuggest(that) {
  wx.showLoading({
    title: '提交中...',
  })

  var data = {

    AccessToken: that.UserId,
    details:that.suggest,//当前页
    contact:that.mobile,//总共页数
  }


  var ajax = new Ajax({
    data,
    path: _interface.suggest
  })

  let list = that.data.couponList || [];
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {

      wx.showToast({
        title: '提交成功',
        icon:'success',
        success(){
          setTimeout(()=>{

            wx.navigateBack({
              delta: 1
            })
          },2000)
         
        }
      })

    }
    else
    {
      wx.showToast({
        title: '提交失败',
        icon: 'success'
      })
    }
    console.log(res)
  })
  ajax.catch(err => {
    console.log(err)
  })
}
module.exports={
  userSuggest
}
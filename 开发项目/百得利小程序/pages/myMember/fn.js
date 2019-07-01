let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";
//获取用户会员卡
function getMemberList(that){
  wx.showLoading({
    title: '加载中...',
  })

  var data = {
    AccessToken: that.UserId,
    // Page: that.page,//当前页
    // PageSize: that.pageSize,//总共页数
  }


  var ajax = new Ajax({
    data,
    path: _interface.myMember
  })

  let list = that.data.memberList || [];
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {

      // if (res.data.length >= that.pageSize) {
      //   that.morePage = true
      //   that.setData({
      //     showTip: false
      //   })
      // }
      // else {
      //   if (that.morePage && res.data.length == 0) {
      //     that.setData({
      //       showTip: true
      //     })
      //   }
      //   else
      //   {
      //     that.setData({
      //       showTip: false
      //     })
      //   }

      //   that.morePage = false
      // }
      // list.push(...res.data)
      list.push(...res.data)
      //提示
      if (list.length == 0) {
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
      that.setData({
        memberList: list
      })
    }


    console.log(res)
  })
  ajax.catch(err => {
    console.log(err)
  })
}
//打卡卡券
function toMyMember(sendData){
  wx.showLoading({
    title: '加载中...',
  })
  let { outstr, encryptcardid, cardbiz } = sendData;
  let param = {
    encrypt_card_id: encryptcardid, outer_str: outstr + '', biz: cardbiz
  }
  console.log(param)
  Tool.memberComponent(param).then(res => {
    console.log(res)
  }).catch(err => {
    wx.showToast({
      title: '打开失败',
      icon: 'none'
    })
  })
}

module.exports={
  getMemberList,
  toMyMember
}


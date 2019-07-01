let _util = require('../../utils/util.js');
let _interface = require('../../utils/interface.js')
import Ajax from "../../libs/Ajax.js";
import Tool from "../../libs/Tool.js";

//微信授权登录
function WXBindUser(that) {
  var data = that.detail;
  getApp().globalData.bindUserDetail = data
  getApp().UserLogin((res) => {
    console.log(res)
    toNavPage(that)
    getApp().globalData.bindUserDetail = null;
    wx.removeStorage({
      key: 'signOut',
      success: function(res) {},
    })
  })

  // var ajax = new Ajax({
  //   data,
  //   path: _interface.WXBindUser
  // })
  // ajax.then(res => {
  //   if (res.errcode == 0) {
  //     getApp().globalData.UserId = res.data.userid;
  //     // wx.navigateBack({
  //     //   delta:''
  //     // })

  //     toNavPage(that)
  //   }

  // })
  // ajax.catch(err => {
  //   wx.hideLoading()
  // })
}
//判断跳转到哪个页面
function toNavPage(that) {
  let url = "";
  let src = that.src;
  getApp().globalData.signOut = false
  //签到页面
  if (src == 'sign') {
    url = '../signPage/signPage'
  }
  //查看妈妈
  else if (src == 'tomum') {
    url = "../toMum/toMum"
  }
  else if (src == 'tobaby') {
    url = "../toBaby/toBaby"
  }
  else if (src == 'changeImg') {
    wx.navigateBack({
      delta: 1
    })
  }
  else if (src == 'xb') {
    url = "../shop/shop"
  }
  else if (src == 'bkPage') {
    url = "../userLesson/userLesson"
  }
  else if (src == 'bkPageRead') {
    if (that.isBuy != undefined && that.isBuy == false) {
      wx.navigateBack({
        delta: 1
      })
      return
    }
    url = `../readRecord/readRecord?src=bk&uid=${that.uid}&lid=${that.lid}`
  }
  else if (src == 'bkPagelook') {
    if (that.isBuy != undefined && that.isBuy == false) {
      wx.navigateBack({
        delta: 1
      })
      return
    }
    url = `../lookAnimation/lookAnimation?src=bk&uid=${that.uid}&lid=${that.lid}`
  }
  else if (src == 'bkPageStory') {
    if (that.isBuy != undefined && that.isBuy == false) {
      wx.navigateBack({
        delta: 1
      })
      return
    }
    url = `../listenStory/listenStory?src=bk&uid=${that.uid}&lid=${that.lid}`
  }
  else if (src == 'bkPagePractice') {
    if (that.isBuy != undefined && that.isBuy == false) {
      wx.navigateBack({
        delta: 1
      })
      return
    }
    url = `../exersiceBK/exersiceBK?src=bk&uid=${that.uid}&lid=${that.lid}`
  }
  else if (src == 'outSign') {
    url = `../toMum/toMum`
  }
  if (url !== '') {
    wx.redirectTo({
      url
    })
  }
}
//获取验证码
function getCode(that) {
  let mobile = Tool.checkPhoneNumber(that.mobile);
  if (!mobile) return

  wx.showLoading({
    title: '正在发送...',
    mask: true
  })

  var data = {
    mobile
  };
  var ajax = new Ajax({
    data,
    path: _interface.getCode
  })
  ajax.then(res => {
    wx.showToast({
      title: '发送成功',
      mask: true
    })
    Tool.countDown(that.callback)()
    // if (res.errcode == 0) {

    //   //储存验证码，用以校验用户输入的验证码
    //   that.code=res.data.code+'';
    //   console.log(that.code)
    // }
  })
  ajax.catch(err => {
    wx.hideLoading()
  })
}
//验证验证码
function checkCode(that) {
  let mobile = Tool.checkPhoneNumber(that.mobile);
  if (!mobile) return

  wx.showLoading({
    title: '验证中...',
    mask: true
  })

  var data = {
    mobile,
    verificationcode: that.code
  };
  var ajax = new Ajax({
    data,
    path: _interface.checkCode
  })
  ajax.then(res => {

    if (res.errcode == 0) {
      let data = res.data;
      if (typeof data == 'string') {
        data = JSON.parse(res.data)
        if (data.MobilePhone) {
          wx.showToast({
            title: '验证成功',
            mask: true,
            success() {
              // getApp().globalData.mobile = data.MobilePhone;
              // //用户登录
              // getApp().UserLogin(res => {
              //   //跳转页面
              //   toNavPage(that)
              // })
              isNewUser(that)
            }

          })
        }
        else {
          if (data.code == 1011) {
            wx.showToast({
              title: data.message,
              mask: true
            })
          }
        }

      }

    }

  })
  ajax.catch(err => {
    wx.hideLoading()
  })
}
//判断是否是新用户 login/relogin
function isNewUser(that) {
  var data = {
    mobile: that.mobile
  };
  var ajax = new Ajax({
    data,
    path: _interface.isNewUser
  })
  ajax.then(res => {

    if (res.errcode == 0) {
      let data = res.data;
      //已存在
      if (data.is_exit) {
        getApp().globalData.UserId = data.userid;
        toNavPage(that)
      }
      else {
        getApp().globalData.mobile = data.MobilePhone;
        //用户登录
        getApp().UserLogin(res => {
          //跳转页面
          toNavPage(that)
        })
      }

    }



  })
  ajax.catch(err => {
    wx.hideLoading()
  })
}
//修改手机号码
function updatePhone(that){
  var data = {
    mobile: that.mobile,
    userid:getApp().globalData.UserId
  };
  var ajax = new Ajax({
    data,
    path: _interface.updatePhone
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      console.log(res)
      wx.showToast({
        title: res.msg,
        icon: res.data.is_ok ? 'success' :'none',
        mask:true
      })
      wx.removeStorage({
        key: 'signOut',
        success: function (res) { },
      })
      //fanh
      setTimeout(()=>{
        if (res.data.is_ok)
        {
          wx.navigateBack({
            delta: 1
          })
        }
        
      },2000)


    }

  })
  ajax.catch(err => {
    wx.hideLoading()
  })
}
module.exports = {
  WXBindUser,
  toNavPage,
  getCode,
  checkCode,
  updatePhone
}
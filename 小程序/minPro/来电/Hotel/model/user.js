let _interface=require("../utils/interface.js")
import Ajax from "../libs/Ajax.js";
import { Location } from "./map.js";
import Tool from "../libs/Tool.js";
import Upload from "../libs/Upload.js";
import Login from "../libs/Login.js";
import { UIEvent } from "../libs/UIEvent.js";

import UserPower from "../libs/getUserPower.js";


class User{
  constructor(){
    this.power = new UserPower();
  //  this.isPower()
    this.isSign=false;//默认未注册
    this.isVIP=false;
    this.userId='';//用户id
    this.openid=''
    this.deposit = 0;
    this.balance = 0;
    //获取附近列表
    this.posArr = [];
    this.userInfo=null;
    this._initEvent()
    // this.UserToLogin()
    this.time = 10000
    this.wxUser={}
   // this.getPos()
    this.ispos=false;
    this.Map = Location;
    
  }
  _initEvent(){
    //登录
    this.login = new UIEvent();
    this.getLocalSucc=new UIEvent();
    this.getLocalFail=new UIEvent();
    this.isLocationPower=new UIEvent();
    this.getOrderEvent=new UIEvent();
  }
  //获取用户地理位置是否授权
  isPower(){
    
    let that=this;
    this.power.resolveEvent({
      auth: 'scope.userLocation',
      succ(res) {//成功
        console.log(res)
        that.isLocationPower.Emit(true)
      },
      fail(err) {//失败
        console.log(err)
        that.isLocationPower.Emit(false)
      }

    })
  }
 
  //第一次登录
  UserToLogin(callback) {
    if (this.isSign  ) {
      callback && callback()
      return
    }
    console.log(arguments)
    var that = this;
    let login = new Login();
    login.userToLogin({
      data: arguments[1] || undefined,
      path: arguments[2] || _interface.login,//接口地址，默认为空(必传)
      loginSucc(res) { //登录成功(必传)
        if (parseInt(res.errcode) == 0) {
          that.session_key = res.data.session_key;
          //用户id
          that.userId = res.data.uid||'';
          //是否注册
          that.isSign = res.data.mobile ? true : false;
          that.mobile = res.data.mobile;
          that.isVip = parseFloat(res.data.deposit) ? true:false
          that.deposit = parseFloat(res.data.deposit) ;
          that.balance = parseFloat(res.data.balance);
          that.openid=res.data.openid;
          callback && callback(res.data)
       
        //  that.getUserInfo()
          if (!that.ispos)
          {
            that.getPos()
          }
        
      
         // that.UserToLoginTwo()
        }
        if (parseInt(res.errcode) == 404){
          //触发事件
          that.login.Emit(that.isSign);
          wx.removeStorage({
            key: 'indexInfor',
            success: function(res) {},
          })
        }
        else if (parseInt(res.errcode) == 1){
          wx.showToast({
            title: res.msg,
            icon: "none"
          })
        }
        else 
        {
          if (that.token  == '') {
            wx.showToast({
              title: '系统繁忙',
              icon: "none",
              mask: true
            })
          }

        }

      },
      loginFail(err) { //登录失败(必传)
      //  that.UserToLoginTwo()
        if (that.token  == '') {
          wx.showToast({
            title: '登录失败',
            icon: "none",
            mask: true
          })
        }
        console.log(err)
        callback && callback(err)

      }
    })
  }
  updata(callback) {
 
    var that = this;
    let login = new Login();
    login.userToLogin({
      data: arguments[1] || undefined,
      path: arguments[2] || _interface.login,//接口地址，默认为空(必传)
      loginSucc(res) { //登录成功(必传)
        if (parseInt(res.errcode) == 0) {
          that.session_key = res.data.session_key;
          //用户id
          that.userId = res.data.uid || '';
          //是否注册
          that.isSign = res.data.mobile ? true : false;
          that.mobile = res.data.mobile;
          that.isVip = parseFloat(res.data.deposit) ? true : false
          that.deposit = parseFloat(res.data.deposit);
          that.balance = parseFloat(res.data.balance);
          that.openid = res.data.openid;
          callback && callback(res.data)

          //  that.getUserInfo()
          if (!that.ispos) {
            that.getPos()
          }


          // that.UserToLoginTwo()
        }
        if (parseInt(res.errcode) == 404) {
          //触发事件
          that.login.Emit(that.isSign);
          wx.removeStorage({
            key: 'indexInfor',
            success: function (res) { },
          })
        }
        else if (parseInt(res.errcode) == 1) {
          wx.showToast({
            title: res.msg,
            icon: "none"
          })
        }
        else {
          if (that.token == '') {
            wx.showToast({
              title: '系统繁忙',
              icon: "none",
              mask: true
            })
          }

        }

      },
      loginFail(err) { //登录失败(必传)
        //  that.UserToLoginTwo()
        if (that.token == '') {
          wx.showToast({
            title: '登录失败',
            icon: "none",
            mask: true
          })
        }
        console.log(err)
        callback && callback(err)

      }
    })
  }
  //获取附近店铺列表
  getPos(callBack){


    Tool.getLocation({}).then(res=>{
      wx.hideLoading()
      this.Map.init('map')
      console.log(res)
     // this.savePos(res)
      this.location=res;
      callBack && callBack(this.location)
      //this.getLocalSucc.Emit(res)
    }).catch(err=>{
    
     // this.getLocalFail.Emit(false)
      wx.showToast({
        title: err.errMsg,
        icon:'none'
      })
      console.log(err)
     
    })
  }

  //调用充电接口
  doCharge(cid,callBack){
    
    var data = {
      cid: cid
    }
    var ajax = new Ajax({
      data,
      path: _interface.doCharge
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {

       
        callBack && callBack(true)
       
      }
      else if (res.errcode == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
      else {
        wx.showToast({
          title: '系统繁忙',
          icon: "none"
        })
      }
      console.log(res)
    })
    ajax.catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '系统繁忙',
        icon: "none"
      })
      console.log(err)
    })
  }
  
  //确认订单
  confirmOrder(id,callBack) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    var data = {
      token: this.token,
      id:id
    }
    var ajax = new Ajax({
      data,
      path: _interface.confirmOrder
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {

        callBack && callBack(res.data)


      }
      else if (res.errcode == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
      else {
        wx.showToast({
          title: '系统繁忙',
          icon: "none"
        })
      }
      console.log(res)
    })
    ajax.catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '系统繁忙',
        icon: "none"
      })
      console.log(err)
    })
  }
  //保存个人信息
  saveUserInfo(userInfo, callBack) {
    let data = {
      token: this.token,
      ...userInfo
    }
    var ajax = new Ajax({
      data,
      path: _interface.saveUserInfo
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        callBack(true)


      } else if (parseInt(res.errcode) == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })

      }
      else {
        wx.showToast({
          title: '系统繁忙',
          icon: "none",
          mask: true
        })


      }

      console.log(res)
    })
    ajax.catch(err => {

      wx.showToast({
        title: '系统繁忙',
        icon: "none",
        mask: true
      })
      console.log(err)
    })
  }
  //保存用户地理位置
  savePos(pos) {
    let data = {
      user_id: this.userId,
      ...pos
    }
    var ajax = new Ajax({
      data,
      path: _interface.set_pos
    })
    ajax.then(res => {
      wx.hideLoading()
      // setTimeout(()=>{
      //   this.getPos()
      // },this.time)
      this.ispos=true
      if (res.errcode == 0) {
       
        

      } else if (parseInt(res.errcode) == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })

      }
      else {
        wx.showToast({
          title: '系统繁忙',
          icon: "none",
          mask: true
        })
      }
    })
    ajax.catch(err => {
      setTimeout(() => {
        this.getPos()
      }, this.time)
      wx.showToast({
        title: '系统繁忙',
        icon: "none",
        mask: true
      })
      console.log(err)
    })
  }
  scanningCode(){
    wx.scanCode({
      success: res => {
        let { result } = res;
        console.log(res)
        if (this.isVip) {
          //余额不足，去充值
          if (this.balance == 0) {
            wx.showModal({
              title: '温馨提示',
              content: '您的余额不足，请充值',
              showCancel: false,
              success: res => {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../doRecharge/doRecharge?cid=3',
                  })
                }
              }
            })

          }
          else {
            this.doCharge(3, () => {
              wx.navigateTo({
                url: '../recharge/recharge?cid=3',
              })
            })

          }

        }
        else {
          wx.navigateTo({
            url: '../recharge/recharge?cid=3',
          })
        }

      }
    })
  }
  /**********************标准****************************/
  //注册
  register(data, callBack, path = _interface.register) {
    if(this.isSign) 
    {
      callBack()
      return
    }
    wx.showLoading({
      title: '注册中...',
      mask: true
    })
    let that = this;
    wx.login({
      success: res => {
        let sendData = {
          ...res,
          uid:this.userId
        }
        wx.getUserInfo({
          withCredentials:true,
          success:(result)=>{

         
            sendData = Object.assign(sendData, data, result);
            let ajax = new Ajax({
              data: sendData,
              path: path
            })
            ajax.then(res => {
              wx.hideLoading()
              if (res.errcode == 0) {
                //是否注册
                that.isSign = res.data.userphone == '' ? false : true;
                that.userInfo = res.data.userInfo;
                that.userId = res.data.id;
              
              // that.login.Emit(true);
                callBack()
               that.UserToLogin()
              }
              if (res.errcode == 1) {
                wx.showToast({
                  title: res.msg,
                  icon: 'none'
                })
              }
            })
            ajax.catch(err => {
              wx.hideLoading();
              console.log(err)
            })
          }
        })
      }
    })

  }
  //获取验证码
  getCode(mobile,callBack){
    wx.showLoading({
      title: '发送中...',
      mask:true
    })
    let data = {
      user_id:this.userId,
      userphone:mobile
    }
    var ajax = new Ajax({
      data,
      path: _interface.get_code
    })
    ajax.then(res => {
      wx.hideLoading()
  

      if (res.errcode == 0) {
        callBack && callBack()


      } 
      else {
        wx.showToast({
          title: '系统繁忙',
          icon: "none",
          mask: true
        })
      }
    })
    ajax.catch(err => {
      setTimeout(() => {
        this.getPos()
      }, this.time)
      wx.showToast({
        title: '系统繁忙',
        icon: "none",
        mask: true
      })
      console.log(err)
    })
  }
  //获取用户信息 
  getUserInfo(callBack) {
    let data = {
      token: this.token
    }
    var ajax = new Ajax({
      data,
      path: _interface.get_user_info
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        


      } else if (parseInt(res.errcode) == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })

      }
      else {
        wx.showToast({
          title: '系统繁忙',
          icon: "none",
          mask: true
        })


      }

      console.log(res)
    })
    ajax.catch(err => {

      wx.showToast({
        title: '系统繁忙',
        icon: "none",
        mask: true
      })
      console.log(err)
    })
  }
}
let user=new User();
export { user as User }
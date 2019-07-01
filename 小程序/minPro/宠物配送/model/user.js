let _interface=require("../utils/interface.js")
import Ajax from "../libs/Ajax.js";
import Tool from "../libs/Tool.js";
import Upload from "../libs/Upload.js";
import Login from "../libs/Login.js";
import { UIEvent } from "../libs/UIEvent.js";
// import { Index } from "./index.js";
// import { RestaurantDetail } from "./restaurantDetail.js";
// import { ConfirmOrder } from "./confirmOrder.js"
import UserPower from "../libs/getUserPower.js";


class User{
  constructor(){
    this.power = new UserPower();
  //  this.isPower()
    this.isSign=false;//默认未注册
    this.token='';//用户id
    this.userInfo=null;
    this._initEvent()
    this.UserToLogin()
    this.time = 10000

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
    console.log(arguments)
    var that = this;
    let login = new Login();
    login.userToLogin({
      data: arguments[1] || undefined,
      path: arguments[2] || _interface.login,//接口地址，默认为空(必传)
      loginSucc(res) { //登录成功(必传)
        if (parseInt(res.errcode) == 0) {
          that.CanClick=true;
          //用户id
          that.token = res.data.token||'';
          //是否注册
          that.isSign = res.data.mobile==''?false:true;
          that.userInfo = res.data.userInfo;
          //触发事件
          that.login.Emit(that.isSign);
          //初始化首页
         // Index._getPageInfo();
         // ConfirmOrder.getMarkList()
          callback && callback(that.token)
         that.getPos()
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
  //第一次登录
  UserToLoginTwo(callback) {
    
    var that = this;
    let login = new Login();
    login.userToLogin({
      data: arguments[1] || undefined,
      path: arguments[2] || _interface.login,//接口地址，默认为空(必传)
      loginSucc(res) { //登录成功(必传)
        if (parseInt(res.errcode) == 0) {
          that.CanClick = true;
          //用户id
          that.token = res.data.token || '';
          //是否注册
          that.isSign = res.data.mobile == '' ? false : true;
      
          //是否是vip
          that.is_vip = res.data.is_vip;
          //触发事件
          that.login.Emit(that.isSign);
          //初始化首页
        //  Index._getPageInfo();
          //ConfirmOrder.getMarkList()
          callback && callback(that.token)
        }
        // if (parseInt(res.errcode) == 404) {
        //   //触发事件
        //   that.login.Emit(that.isSign);
        // }
        // else if (parseInt(res.errcode) == 1) {
        //   wx.showToast({
        //     title: res.msg,
        //     icon: "none"
        //   })
        // }
        // else {
        //   if (that.token == '') {
        //     wx.showToast({
        //       title: '系统繁忙',
        //       icon: "none",
        //       mask: true
        //     })
        //   }

        // }

      },
      loginFail(err) { //登录失败(必传)
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
  getPos(){


    Tool.getLocation({}).then(res=>{
      wx.hideLoading()
      this.savePos(res)
    //  this.location=res;
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

  //获取订单列表
  getOrderList(show=true,callBack){
    if (show)
    {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
    }
  
    var data = {
      token: this.token
    }
    var ajax = new Ajax({
      data,
      path: _interface.orderList
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {

        this.getOrderEvent.Emit(res.data)

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
  //获取用户信息 getUserInfo1
  getUserInfo(callBack) {
    let data = {
      token: this.token
    }
    var ajax = new Ajax({
      data,
      path: _interface.getUserInfo
    })
    ajax.then(res => {
      wx.hideLoading()
      if (res.errcode == 0) {
        if (res.data.name) {
          callBack(res.data)
        }
        else {
          callBack(false)
        }


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
      token: this.token,
      ...pos
    }
    var ajax = new Ajax({
      data,
      path: _interface.savaPos
    })
    ajax.then(res => {
      wx.hideLoading()
      setTimeout(()=>{
        this.getPos()
      },this.time)
     
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
  //注册
  register(data, callBack, path = _interface.register) {
    wx.showLoading({
      title: '注册中...',
      mask: true
    })
    let that = this;
    wx.login({
      success: res => {
        let sendData = {
          ...res
        }
        sendData = Object.assign(sendData, data);
        let ajax = new Ajax({
          data: sendData,
          path: path
        })
        ajax.then(res => {
          wx.hideLoading()
          if (res.errcode == 0) {
            //是否注册
            that.isSign = res.data.mobile == '' ? false : true;
            that.userInfo = res.data.userInfo;
            that.login.Emit(true);
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
}
let user=new User();
export { user as User }
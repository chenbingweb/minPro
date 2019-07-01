// components/regiser/regiser.js
import Tool from "../../libs/Tool.js";
import Ajax from "../../libs/Ajax.js";
let _interface = require("../../utils/interface.js");
// import {User} from "../../model/user.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isClose:{
      type:Boolean,
      value:false
    },
    callBack:{
      type:Function,
      value:()=>{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    time:0
  },
  created:function(){
    this.mobile=''
    this.myEventOption = {
      bubbles: false,
      composed: false,
      capturePhase: false
    } // 触发事件的选项
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //关闭
    onClose(){
      this.setData({
        isClose:false
      })
    },
    //获取验证码
    onGetCode(){
      if(this.mobile=='')
      {
        wx.showToast({
          title: '手机号不能为空',
          icon:'none'
        })
        return
      }
      if (!/^1\d{10}/.test(this.mobile)) {
        wx.showToast({
          title: '您输入的手机号不正确',
          icon: 'none'
        })
        return
      }
      
      getCode(this.mobile,()=>{
        Tool.countDown(time => {
          this.setData({
            time
          })
        })()
      })
      // User.getCode(this.mobile, ()=>{
        
      // })
      
    },
    //注册会员
    onSubmit({detail:{value}}){

      if(value.mobile=='')
      {
        wx.showToast({
          title: '手机号不能为空',
          icon: 'none'
        })
        return
      }
      if (!/^1\d{10}/.test(value.mobile)) {
        wx.showToast({
          title: '您输入的手机号不正确',
          icon: 'none'
        })
        return
      }
      if (value.coding=='')
      {
        wx.showToast({
          title: '验证码不能为空',
          icon: 'none'
        })
        return
      }
      value.open_id = getApp().globalData.open_id
      let sendData={...value};
      sendData.userphone = sendData.mobile;
      sendData.phonecode = sendData.coding;
      Register(sendData, ()=>{
      
              wx.showToast({
                title: '注册成功',
                mask:true,
                success:()=>{
                  this.onClose();
                  //执行回调，触发关闭注册会员按钮
                  this.properties.callBack()
                  this.triggerEvent('isLogin', {}, this.myEventOption)
                }
              })
      })

      // User.register(sendData, ()=>{
      //     wx.showToast({
      //       title: '注册成功',
      //       mask:true,
      //       success:()=>{
      //         this.onClose();
      //         //执行回调，触发关闭注册会员按钮
      //         this.properties.callBack()
      //         this.triggerEvent('isLogin', {}, this.myEventOption)
      //       }
      //     })
      // })


    },
    //手机号输入
    onInput({detail:{value}}){
      this.mobile=value
    }

  }
})
//获取验证吗
function getCode(mobile,callBack) {
  wx.showLoading({
    title: '发送中...',
    mask: true
  })
  var data = {
    userphone: mobile
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
  })
  ajax.catch(err => {
    wx.hideLoading()
  })

}
//注册
function Register(data, callBack) {
  wx.showLoading({
    title: '发送中...',
    mask: true
  })

  var ajax = new Ajax({
    data,
    path: _interface.regiser
  })
  ajax.then(res => {
    wx.hideLoading()
    if (res.errcode == 0) {
      callBack && callBack()

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
  })

}
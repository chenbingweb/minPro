// pages/login/login.js
import Check from "../../libs/check.js";
import Tool from "../../libs/Tool.js";
import {User} from "../../model/user.js";
let _interface = require("../../utils/interface.js")
import Ajax from "../../libs/Ajax.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:'',
    count:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onSubmit({detail:{value}}){
    if(value.mobile=='')
    {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return 
    }
    if (!Check.checkPhoneNum(value.mobile)) {

      return
    }
    if (value.checkcode == '') {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
      return
    }
    //注册
    User.register(Object.assign(value, User.userDetail), () => {
      wx.navigateBack({
        delta:1
      })
    }, _interface.signByMobile)
  },
  //获取验证码
  onGetCode(){
    if (this.data.mobile == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return
    }
    if (!Check.checkPhoneNum(this.data.mobile)) {

      return
    }
    wx.showLoading({
      title: '获取验证码',
      mask:true
    })
    let that=this;
    let ajax=new Ajax({
      data: { mobile: this.data.mobile},
      path: _interface.getCode
    })
    ajax.then(res=>{
      
      if(res.errcode==0)
      {
        wx.showToast({
          title: '获取成功',
          success:()=>{
            Tool.countDown(res => {
              that.setData({
                count: res
              })
            })()
          }
        })
      }
      if (res.errcode==1)
      {
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      }
    }).catch(err=>{

    })

    
  },
  //绑定输入手机号事件
  onInput({ detail }) {
    let { value } = detail;
    if (value !== '') {
      this.setData({
        mobile: value
      })
    }
  

  }
  
})
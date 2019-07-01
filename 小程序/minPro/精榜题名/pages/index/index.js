import { AutoJump } from "../../dati_comm/modules/LoginJump" 

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false
  }, 
  onLoad: function (options) {
    this.NeedJump1v1PK=false;
    //wx.showLoading({
    //  title: '加载中...',
    //  mask:true
    //})
    this.options=options;
  }, 
  onHide(){
    wx.hideLoading()    
  },
  onShow(){
    
    if (AutoJump("index", this.options)) return
  }
})

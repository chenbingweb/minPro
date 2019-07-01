// pages/logininfo/logininfo.js

import { Player } from "../../../modules/Player"
import { AutoJump } from "../../../dati_comm/modules/LoginJump"  
import { wxAccount } from "../../../dati_comm/libs/network/wxAccount.js"  
import { ServerLogin } from "../../../modules/ServerLogin"
import * as AppColor from "../../../dati_comm/modules/AppColor.js"
import * as MsgBox from "../../../dati_comm/modules/MsgBox"
let datas = {
  wndname: "logininfo",//窗体名称
  display: false,//block none  
  wndAlpha: 1,
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.options = options

   // AppColor.headbg();
   // AppColor.title();
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
    // if (AutoJump("logininfo", this.options)) return
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
  logina(res) {
    console.log(res)
    if(
      !res.detail||
      !res.detail.errMsg||
      res.detail.errMsg!="getUserInfo:ok"
    )
    {
      //MsgBox.ShowOK("","")
      return
    }
    ServerLogin.login()
    //var data = res.detail
    //wxAccount.userInfo = data;
    //wxAccount.getUserInfoSucceededEvent.Emit(wxAccount.userInfo);

   

    //console.log("-----------------logina--------------")
    // setTimeout(() => wxAccount.login(), 1000)
   // getApp().globalData.wnds.Wnd_LonginInfo = new PageWrap("/dati_comm/pages/logininfo/logininfo")
    //ServerLogin._reLogin()
    
  }
})
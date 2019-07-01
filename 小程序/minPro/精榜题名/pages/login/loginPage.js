// pages/login/loginPage.js
import { Player } from "../../modules/Player" 
import { AutoJump } from "../../dati_comm/modules/LoginJump"  
let datas = {
  wndname: "login",//窗体名称
  display: false,//block none  
  wndAlpha: 1,
  wndPosX: 0,
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:datas,
    ShowLogin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // console.log("###loginPage####", options)
    this.options = options
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (AutoJump("login", this.options )) return
    /*
    this._ClearTimer()
    this.overtimer = setTimeout(
      ()=>{
        getApp().globalData.ServerLogin._showLoginBox()
      },
      1000*20
    )*/

  },
  /*
  _ClearTimer()
  {
    if (this.overtimer)
    {
      clearTimeout(this.overtimer)
      this.overtimer = null
    }
  },
*/
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //this._ClearTimer()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //this._ClearTimer()
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
  
  }
})
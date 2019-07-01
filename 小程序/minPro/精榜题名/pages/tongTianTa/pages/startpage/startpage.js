// pages/tongTianTa/pages/startpage/startpage.js
// pages/shopping/shoppingpage.js
import { SDataShop } from "../../../../dati_comm/sdata/SDataShop.js"
import { SDataCanshu } from "../../../../dati_comm/sdata/SDataCanshu.js"
import { FightRoom } from "../../../../dati_comm/modules/FightRoom"
import { CGRoom } from "../../../../dati_comm/modules/CGRoom"
import { SDataChongzhi } from "../../../../dati_comm/sdata/SDataChongzhi.js"
import { OOSyncClient } from "../../../../dati_comm/libs/oosync/OOSyncClient.js"
import { Player } from "../../../../modules/Player.js"
import * as AudioPool from "../../../../dati_comm/libs/core/AudioPool" 
import { AutoJump } from "../../../../dati_comm/modules/LoginJump.js"
import { share } from "../../../../dati_comm/modules/share.js";
import { buttonDisabler } from "../../../../dati_comm/modules/buttonDisabler.js";
import { GameConn, WorldConn } from "../../../../dati_comm/libs/network/Conns.js";
import { TimeAnimation } from "../../../../utils/timeAnimation.js";
import { MD5 } from "../../../../dati_comm/modules/md5.js"
import * as MsgBox from "../../../../dati_comm/modules/MsgBox.js"

import { txt } from "../../../../dati_comm/sdata/SDataID2.js"
import * as gcfg from "../../../../gamecfg.js"

import { SDataKeyMath } from "../../../../sdata/SDataKeyMath.js"
import upCoinPos from "../../../../dati_comm/modules/coinAnimation.js"
import * as OOSyncEvents from "../../../../dati_comm/modules/OOSyncEvents.js"
//门票发生变化
var tttMP = null
OOSyncEvents.OnTTTMPChanged.On(
  this,
  () => {
   
    if (tttMP) tttMP()
  }
)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    SavedGk: Player.SavedGk,
    TodayCGLeftCount: Player.TodayCGLeftCount,
    fhk:0,
    ddk:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //积分改变事件
    tttMP = () => {
      this.setData({ TodayCGLeftCount: Player.TodayCGLeftCount })
    }
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
    this.setData({
      SavedGk: Player.SavedGk,
      TodayCGLeftCount: Player.TodayCGLeftCount,
    })
    getApp().getMygoods.call(this, Player.Goods, res => {
      console.log(res)
      res.forEach(item => {
        if (item.id == '1') {
          this.setData({
            fhk: item.num,
            //ddkId: item.id,
          })
        }
        if (item.id == '2') {
          this.setData({
            ddk: item.num,
            //fhkId: item.id,
          })
        }
      })
    })
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
  onShareAppMessage: function (options) {
    if (options.from == 'button') 
    {
      return share.getTTTCISHUMessage(Player.InviteCode)
    }
    return share.getTTTMessage()
  },
  // 返回
  OnBack(){
    getApp().globalData.wnds.Wnd_TongTianTa.back()
  },
  OnFight(){
   // getApp().globalData.wnds.Wnd_FightTT.Show()
    //FightRoom.StartPK(6)
    GameConn.Request({ n: "cg" }, data => {
        if (data.r == 0) {
          getApp().globalData.wnds.Wnd_FightTT.Show()
        }
        //次数用光
        if(data.r==1)
        {
          wx.showModal({
            title: '提示',
            content: '闯关次数已经用完',
            showCancel: false
          })
        }
        //闯关已经完成
        if (data.r == 2) {
          wx.showModal({
            title: '提示',
            content: '您已闯关到最高层',
            showCancel:false
          })
        }

      })
   
  },
  OnRank(){
    getApp().globalData.wnds.Wnd_WorldRank.Show()
  },
  OnToShop(){
    getApp().globalData.wnds.Wnd_Shopping.Show()
  }
})
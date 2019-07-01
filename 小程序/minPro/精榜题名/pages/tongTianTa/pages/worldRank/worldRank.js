// pages/tongTianTa/pages/worldRank/worldRank.js
import { Player } from "../../../../modules/Player.js"
import { GameConn, WorldConn } from "../../../../dati_comm/libs/network/Conns.js";
import { share } from "../../../../dati_comm/modules/share.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankList:[],
    rank:0,
    userIcon: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //闯关排行
    GameConn.Request({n:'cgph'},res=>{
        console.log(res)
        if(res.r==0)
        {
        
          this.setData({
            rank:res.rank,
            rankList:res.list,
            userIcon: Player.Iconurl
          })
        }
        else
        {

        }
    })
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
    return share.getTTTMessage()
  },
  OnBack(){
    getApp().globalData.wnds.Wnd_WorldRank.back()
  }
})
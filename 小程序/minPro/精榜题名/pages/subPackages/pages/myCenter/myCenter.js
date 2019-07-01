// pages/subPackages/pages/myCenter/myCenter.js
import { SDataShop } from "../../../../dati_comm/sdata/SDataShop.js"
import { SDataCanshu } from "../../../../dati_comm/sdata/SDataCanshu.js"
import { FightRoom } from "../../../../dati_comm/modules/FightRoom"
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
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: Player.Name(),
    userIcon: Player.IconUrl(),
    corn: Player.Score,
    money:0,
    myGoods:[],
    chList: [],//切磋等级列表
    postList:[],//海报
    showHB:false,
    hb:{}
  },

  /**
   * 生命周期函数--监听页面加载hb:{
       bg_url: Player.ArticleServerUrl() + FightRoom.Chengji.new_dw_hb,
       qr_url: Player.ArticleServerUrl() + FightRoom.Chengji.qr_url,
       ad_url: Player.ArticleServerUrl() + FightRoom.Chengji.ad_url,
     }
   */
  onLoad: function (options) {
    getMygoods.call(this, Player.Goods);
    //切磋称号列表
  //  getMyCH.call(this)
    getLevelList.call(this)
    //获取海报列表
    getPostList.call(this)
   this.setData({
     userIcon: Player.IconUrl(),
     
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
    this.setData({
      userName: Player.Name(),
      corn: Player.Score,
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
  onShareAppMessage: function () {

  },
  OnBack(){
    getApp().globalData.wnds.Wnd_MyCenter.back()
  },
  OnToMyMoney(){
    getApp().globalData.wnds.Wnd_MyMoney.Show()
  },
  OnToMsg(){
    getApp().globalData.wnds.Wnd_TiXianTip.Show({src:'msg'})
  },
  OnBackData({detail}){
    let { showHB}=detail;
    this.setData({
      showHB: showHB,
    })
  },
  //查看海报
  OnShowHB({currentTarget}){
    let {img}=currentTarget.dataset;
    this.setData({
      showHB: true,
      hb: {
        bg_url: img,
        qr_url: Player.ArticleServerUrl() + Player.qrUrl,
        ad_url: Player.ArticleServerUrl() + Player.ad
        }
    })
  }
})
//我的切磋称号
function getMyCH(){
  let img=[]
  let cqLevel = Player.Level;
  for(let i = 1;i < cqLevel;i++){
    img.push(Player.ArticleServerUrl() +`/images/level/level_${i}.png`)
  }
  this.setData({
    chList:img
  })
  console.log(img)
}
//我的道具
function getMygoods(goods) {
  try {
    let Mygoods = JSON.parse(goods)
    Mygoods.forEach(item => {
      //let {id,type}=item;
      // let itemId=item.id
      getApp().globalData.Goods.forEach(child => {
        let { id, name, icon } = child;
        if (item.id == id) {
          item.name = name;
          item.icon = icon;
        }
      })
    })
    this.setData({
      ['myGoods']: Mygoods
    })
  } catch (e) {

  }
}
//海报列表
function getPostList(){
  let list=[]
  try{
    list = JSON.parse(Player.Duanweis );
  }catch(e){

  }
  list.forEach(item=>{
    item.img=Player.ArticleServerUrl()+item.img;
    item.time=item.time.replace(/-/g,'.')
  })
  this.setData({
    postList: list
  })

}
//获取切磋等级称号
function getLevelList() {
  let list = []
  try {
    list = JSON.parse(Player.Levels);
  } catch (e) {

  }
  list.forEach(item => {
    item.img = Player.ArticleServerUrl() + item.img;
  })
  this.setData({
    chList: list
  })

}
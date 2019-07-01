// pages/tongTianTa/pages/fightTT/fightTT.js
import { SDataShop } from "../../../../dati_comm/sdata/SDataShop.js"
import { SDataCanshu } from "../../../../dati_comm/sdata/SDataCanshu.js"
import { FightRoom } from "../../../../dati_comm/modules/FightRoom"
import { CGRoom, StopFight } from "../../../../dati_comm/modules/CGRoom"
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
let datas={
  play321 :  true,
  showLock:false,
  currlun:1,
  maxtime:10,
  wentiTxt:'',
  hmovertime: 10000,//毫秒超时时间
  showSucc:false,//成功提示
  userIcon: Player.IconUrl(),
  userName: Player.Name(),
  daanBtn: [
    {
      v: 0,//是否显示按钮
      txt: "",//按钮文本
      style: "",//风格  select_yes select_no
      licon: null,//按钮上左边图标
      ricon: null,//按钮上右边图标,
      select:'',
      outer: false,
      lp: false,
      rp: false,
      X:0
    },
    {
      v: true, select: '', txt: "", style: "", licon: null, ricon: null, outer: false, lp: false, rp: false,
      X: 0
    },
    {
      v: true, select: '', txt: "", style: "", licon: null, ricon: null, outer: false, lp: false, rp: false,
      X: 0
    },
    {
      v: true, select: '', txt: "", style: "", licon: null, ricon: null, outer: false, lp: false, rp: false,
      X: 0
    }
  ],//按钮显示状态
  overtime:10,
  score:0,//金币数量
  gk:0//关卡数量
}
let _timerHandle = null;
let _isshowDone = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:datas
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    CGRoom.WentiTxt = ''
    datas.daanBtn.forEach(item => {
      item.X = 0;

    })
    this.setData({
      ['data.userName']: Player.Name()
    })
    this._UpdateBtns()
    this._BindEvts()
  },
  _BindEvts() {
    console.log("绑定事件")
    this.offEvts()
    CGRoom.EvtEnterRoom.On(this, this.OnEnterRoom)
    CGRoom.EvtDoT.On(this, this.OnDoT)
    CGRoom.EvtDoLun.On(this, this.OnDoLun)
    CGRoom.EvtDoLun0.On(this, this.OnDoLun0)
    CGRoom.EvtDoKantiEnd.On(this, this.OnDoKantiEnd)
    CGRoom.EvtDoTexiao.On(this, this.OnDoTexiao)
    CGRoom.EvtDoHuidaJG.On(this, this.OnDoHuidaJG)
    CGRoom.EvtDoHuiheEnd.On(this, this.OnDoHuiheEnd)
    CGRoom.EvtLock.On(this,this.OnLock)
    CGRoom.EvtCGSucc.On(this, this.EvtCGSucc)
    _isshowDone = true
  //  CGRoom.EvtCJ.On(this, this.OnCJ)
    //CGRoom.EvtSpk.On(this, this.OnSpeek)
  },
  //清除所有相关事件
  offEvts: function () {

    CGRoom.EvtEnterRoom.Off(this.OnEnterRoom)
    CGRoom.EvtDoT.Off(this.OnDoT)
    CGRoom.EvtDoLun.Off(this.OnDoLun)
    CGRoom.EvtDoLun0.Off(this.OnDoLun0)
    CGRoom.EvtDoKantiEnd.Off(this.OnDoKantiEnd)
    CGRoom.EvtDoTexiao.Off(this.OnDoTexiao)
    CGRoom.EvtDoHuidaJG.Off(this.OnDoHuidaJG)
    CGRoom.EvtDoHuiheEnd.Off(this.OnDoHuiheEnd)
    CGRoom.EvtLock.Off(this.OnLock)
    CGRoom.EvtCGSucc.Off(this.EvtCGSucc)
   // CGRoom.EvtCJ.Off(this.OnCJ)
   // CGRoom.EvtSpk.Off(this.OnSpeek)
  },
  OnEnterRoom(){
    console.log('进入房间')
    datas.play321 = true
  },
  OnDoLun0(){
    datas.play321 = true
    //刷新剩余时间
    datas.hmovertime = CGRoom.DatiTime * 1000
    this._SetOvertime()
    this.setData({ ["data.currlun"]: CGRoom.Lun })
    if (FightRoom.Lun) {
      setTimeout(() => {
        //设置当前轮
        this.setData({ ["data.currlun"]: CGRoom.Lun })
        this.setData({
          ["data.maxtime"]: CGRoom.DatiTime,
          ["data.showLun"]: true,
          ["data.showQ"]: false
        })
      }, 500)

    }
  },
  OnDoLun(){
    console.log('OnDoLun')
    this._ClearTimer()
    this.setData({
      ["data.wentiTxt"]: CGRoom.WentiTxt,
    })

  },
  OnDoT(){
    this._ClearTimer()
    if (!_isshowDone) {
      return
    }
    this.OnTimer(datas.hmovertime)
    //刷新剩余时间
    this._SetOvertime()
  },
  OnDoKantiEnd(){
    
    
    console.log('OnDoKantiEnd')
    var len = Math.min(CGRoom.Daan.length, 4)

    this.setData({ ['data.len']: len })

    var i = 0

    for (; i < len; i++) {

      datas.daanBtn[i].v = 0
      datas.daanBtn[i].txt = CGRoom.Daan[i]
      datas.daanBtn[i].style = ""
      datas.daanBtn[i].licon = null
      datas.daanBtn[i].ricon = null
      datas.daanBtn[i].outer = false
      datas.daanBtn[i].X = 1;
      datas.daanBtn[i].select ='';
     
    }

    //隐藏
    for (var j = i; j < 4; j++) datas.daanBtn[j].v = 4
    this._UpdateBtns(datas.daanBtn)
  },
  OnDoTexiao(){
    console.log('OnDoTexiao')
  },
  OnDoHuidaJG(){
    console.log('OnDoHuidaJG')
    //获取回答结果
    var hdjg = CGRoom.HuidaJG
    console.log(hdjg)
   // return 
    var userSel = hdjg.x
    //if (userSel < 1 || userSel > 4) return//答案数超出范围
    var btnPre = datas.daanBtn[userSel]
    var isRight = this._IsRightS(hdjg.zq, userSel)
    //播放音效
    AudioPool.PlayAudio(isRight ? "/audios/right.mp3" : "/audios/error.mp3");

    //设置按钮颜色 
    btnPre.style = isRight ? "select_yes" : "select_no"
    btnPre.select = isRight ? "select_yes" : "select_no"
    this._UpdateBtns()
  },
  OnDoHuiheEnd(){
    console.log('OnDoHuiheEnd')
   
    this._ClearTimer()

    var hhjg = CGRoom.HuiHeJG;
    if (hhjg.cs != 1)//不是因为超时导致的结束
    {
      AudioPool.StopAudio("/audios/time321.mp3");
    } else {
      datas.hmovertime = 0
      this._SetOvertime()
    }
    //显示正确答案
    for (var i = 0; i < hhjg.zq.length; i++) {
      var btnPre = datas.daanBtn[hhjg.zq[i] - 1]
      btnPre.style = "select_yes"
      
    }
    this._UpdateBtns()
    setTimeout(() => {
      // 清除当前题目
      this.setData(
        {
          ["data.wentiTxt"]: ""
        }
      )
      datas.daanBtn.forEach(item => {
        item.X = 0;

      })
      this._UpdateBtns()
    }, 1500)
  },
  OnLock(){
    this._ClearTimer()
    this.setData({
      ['data.showLock']:true
    })
   
  },
  //成功提示
  EvtCGSucc(res){
    this._ClearTimer()
    if(res)
    {
      this.setData({
        ['data.showSucc']: true,
        ['data.score']: res.score,
        ['data.gk']: res.gk
      })
    }
    
  },
  OnCJ(){
    console.log('OnCJ')
  },
  _SetOvertime() {
    this.setData({ ["data.hmovertime"]: datas.hmovertime })

    if (datas.hmovertime <= 3000 && datas.hmovertime != 0) {
      this.setData({ ["data.anima"]: true })
    }
    else if (datas.hmovertime < 100) {
      this.setData({ ["data.anima"]: false })
    }
    else {
      this.setData({ ["data.anima"]: false })
    }
    this.setData({ ["data.overtime"]: Math.round(datas.hmovertime / 1000) })
  },
  OnButtonClick(event) {
    if (!buttonDisabler.canClick()) return;
    //返回下标
    var dataset = event.currentTarget.dataset;
    var x = Math.round(dataset.id)+1;
    var nm = {
      n: "hd",
      x: x,
      lun: parseInt(CGRoom.Lun)
    }
    GameConn.Request(nm, () => {

    })
  },
  OnTimer() {

    datas.hmovertime -= 50
    if (datas.hmovertime < 0) datas.hmovertime = 0


    if (datas.play321 && datas.hmovertime <= 3000) {
      datas.play321 = false
      AudioPool.PlayAudio("/audios/time321.mp3");
    }
    this._SetOvertime()
    _timerHandle = setTimeout(() => { this.OnTimer() }, 50)
  },
  _ClearTimer() {
    if (_timerHandle) {
      clearTimeout(_timerHandle);
      _timerHandle = null
    }
  },
  _UpdateBtns() {
    this.setData({ ["data.daanBtn"]: datas.daanBtn })

  },
  _IsRightS(zq, sel) {
    if (!zq) return false

    for (var i = 0; i < zq.length; i++) {
      if (zq[i] == sel+1) return true
    }
    return false
  },
  _IsRight(zq, sel) {
    if (!zq) return false

    for (var i = 0; i < zq.length; i++) {
      if (zq[i] == sel) return true
    }
    return false
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
    //更新数据
    var failTip = this.selectComponent('#fail');
    if (failTip) {
      failTip.setGoods()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    CGRoom.WentiTxt = ''
    AudioPool.StopAudio("/audios/time321.mp3");
    CGRoom.DoLeaveRoom()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    CGRoom.WentiTxt = ''
    AudioPool.StopAudio("/audios/time321.mp3");
    CGRoom.DoLeaveRoom()
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
      let obj = share.getTTTFuHuoMessage();
      obj.success = () => {
        GameConn.Request({ n: 'cgfx2' }, res => {
          if (res.r == 0) {
              this.setData({
                ['data.showLock']:false,
                ["data.wentiTxt"]:''
              })
            CGRoom.WentiTxt = ''
            datas.daanBtn.forEach(item => {
              item.X = 0;

            })
            this._UpdateBtns()
          }
          if (res.r == 1) {
            wx.showToast({
              title: '每局只能分享复活一次',
              icon: 'none'
            })
          }
        })
      }
      return obj
    }
    return share.getTTTMessage()
  },
  OnBack() {
    getApp().globalData.wnds.Wnd_FightTT.back()
    //StopFight()
  
    CGRoom.DoLeaveRoom()
  },
  //更新按钮
  OnUserEvent(){
    datas.daanBtn.forEach(item => {
      item.X = 0;

    })
    this._UpdateBtns()
  }
})
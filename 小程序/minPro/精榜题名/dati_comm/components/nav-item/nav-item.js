// dati_comm/components/nav-item/nav-item.js
import { Player } from "../../../modules/Player"
import { FightRoom, StopFight } from "../../modules/FightRoom"
import { NSLoginSys } from "../../libs/network/NSLoginSys"
import { ServerList } from "../../libs/network/NSServerList"
// import { TimeAnimation } from "../../utils/timeAnimation.js"
import { share } from "../../modules/share";
import { AutoJump } from "../../modules/LoginJump"
import { OOSyncClient } from "../../libs/oosync/OOSyncClient"
import { UIEvent } from "../../libs/network/UIEvent"
import { buttonDisabler } from "../../modules/buttonDisabler";
import { GameConn, WorldConn } from "../../libs/network/Conns";
// import { SDataHuanliang } from "../../sdata/SDataHuanliang"
import * as AppJumpMgr from "../../modules/AppJumpMgr"
import * as Debug from "../../modules/Debug"

import { txt } from "../../sdata/SDataID2"
let tastList = [ //
  { 'img': './img/gk.png', url:"Wnd_Classify", id:'gk', text:'参加赶考', flag: false,corn:0 },
  { 'img': './img/1v1.png', url: "1v1", id: '1v1', text: '1V1切磋', flag: false, corn: 0 },
  { 'img': './img/3v3.png', url: "3v3", id: '3v3', text: '3V3切磋', flag: false, corn: 0 },
  { 'img': './img/ttt.png', url:"ttt", id: 'ttt', text: '通天塔', flag: false ,corn:0}
     ]
let signList=[
  {
    isSign:false,//没有签到
    doSign:false,//当天是否完成签到
    corn:0,
    id:'qd1'
  },
  {
    isSign: false,//没有签到
    doSign: false,//当天是否完成签到
    corn: 0,
    id: 'qd2'
  },
  {
    isSign: false,//没有签到
    doSign: false,//当天是否完成签到
    corn: 0,
    id: 'qd3'
  },
  {
    isSign: false,//没有签到
    doSign: false,//当天是否完成签到
    corn: 0,
    id: 'qd4'
  },
  {
    isSign: false,//没有签到
    doSign: false,//当天是否完成签到
    corn: 0,
    id: 'qd5'
  },
  {
    isSign: false,//没有签到
    doSign: false,//当天是否完成签到
    corn: 0,
    id: 'qd6'
  },
  {
    isSign: false,//没有签到
    doSign: false,//当天是否完成签到
    corn: 0,
    id: 'qd6'
  }
]
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //连续签到次数
    LianxuQiandaoCount:{
      type:Number,
      value:0
    },
    //赶考
    TodayGankaoCount:{
      type:Number,
      value:0,
      observer:function(n,o){
        if(n)
        {
          this.setData({
            ['tastList[0].flag']:true
          })
        }
        else
        {
          this.setData({
            ['tastList[0].flag']: false
          })
        }
      }
    },
    //1v1
    TodayQiecuo1V1Count: {
      type: Number,
      value: 0,
      observer: function (n, o) {
        if (n) {
          this.setData({
            ['tastList[1].flag']: true
          })
        }
        else {
          this.setData({
            ['tastList[1].flag']: false
          })
        }
      }
    },
    //3v3
    TodayQiecuo3V3Count: {
      type: Number,
      value: 0,
      observer: function (n, o) {
        if (n) {
          this.setData({
            ['tastList[2].flag']: true
          })
        }
        else {
          this.setData({
            ['tastList[2].flag']: false
          })
        }
      }
    },
    //闯关
    TodayCGCount:{
      type: Number,
      value: 0,
      observer: function (n, o) {
        if (n) {
          this.setData({
            ['tastList[3].flag']: true
          })
        }
        else {
          this.setData({
            ['tastList[3].flag']: false
          })
        }
      }
    },
    //是否签到
    TodayIsQiandao:{
      type:String,
      value:''
    },
    //等级icon

    
  },

  /**
   * 组件的初始数据
   */
  data: {
    showBox:false,
    showShare:false,
    opacity:0,
    tastList: tastList,
    left_show_animation:'',
    right_show_animation:'',
    LianxuQiandaoCount:0,
    signList:[]
  },
  ready:function(){
    setTimeout(()=>{
      this.setData({
        left_show_animation: 'left_show_animation',
        right_show_animation: 'right_show_animation'
      })
    },500)
    let n = this.properties.LianxuQiandaoCount;
    signList.forEach((item, index) => {
      if (n >= (index + 1)) {
        item.isSign = true
      }
      else {
        item.isSign = false
      }
    })
    signList[n].doSign = this.properties.TodayIsQiandao =='False'?true:false
    
 
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onActive(){
      wx.showModal({
        title: '提示',
        content: '暂未开放，敬请期待',
        showCancel: false
      })
    },
    onClick(){
      console.log(2)
    },
    //跳转排行
    onRank(){
      if (!buttonDisabler.canClick()) return;
      getApp().globalData.wnds.Wnd_Ranking.Show();
    },
    //跳转商城
    onShopClick(event) {
      if (!buttonDisabler.canClick()) return;
      getApp().globalData.wnds.Wnd_Shopping.Show();
    },
    // 关闭任务
    OnClose({currentTarget}){
      //showBox:任务栏,
      //showShare: 公众号,
      let { close } = currentTarget.dataset;
      this.setData({
        opacity: 0
      })
      setTimeout(() => {
        this.setData({
          [close]: false,
        })
      }, 500)

    },
    //打开任务栏
    OnOpenTask({ currentTarget }){
     wx.showLoading({
       title: '加载中...',
       mask:true
     })
      let { open } = currentTarget.dataset;
      //获取任务列表
      GameConn.Request(
        { n: "rw" },
        (data) => {
          
          if(data.r==0)
          {
            for(let key in data){
              if(key!=='r')
              {
                signList.forEach(item=>{
                  if(item.id==key)
                  {
                    item.corn=data[key]
                  }
                })
                tastList.forEach(item=>{
                  if(item.id==key)
                  {
                    item.corn = data[key]
                  }
                })
              }
            }

          }
          if (this.properties.TodayGankaoCount)
          {
            tastList[0].flag=true
          }
          if (this.properties.TodayQiecuo1V1Count) {
            tastList[1].flag = true
          }
          if (this.properties.TodayQiecuo3V3Count) {
            tastList[2].flag = true
          }
          if (this.properties.TodayCGCount) {
            tastList[3].flag = true
          }
          console.log(data)
          this.setData({
            [open]: true,
            signList: signList,
            tastList: tastList
          })
          setTimeout(() => {
            this.setData({
              opacity: 1
            },()=>{
              wx.hideLoading()
            })
          }, 500)
        })
      
      
    },
    //完成任务
    OnNav({currentTarget}){
      let {url}=currentTarget.dataset;
      if (url =='Wnd_Classify')
      {
        getApp().globalData.wnds[url].Show()
      }
      if(url=='3v3')
      {
        FightRoom.StartPK(9)
      }
      if(url=='1v1')
      {
        FightRoom.StartPK(8)
      }
      if (url == 'ttt') {
        getApp().globalData.wnds.Wnd_TongTianTa.Show()
      }
    },
    //签到
    onSign({ currentTarget}){
      let { sign,index } = currentTarget.dataset
      //签到
      if(sign==true)
      {
        wx.showLoading({
          title: '签到中...',
          mask: true
        })
        GameConn.Request(
          { n: "qd" },
          (data) => {
            
            if(data.r==0)
            {
              wx.showToast({
                title: '签到成功',
                mask:true
              })
              this.setData({
                [`signList[${index}].doSign`]: false,
                [`signList[${index}].isSign`]: true
              })
              this.triggerEvent('score', {score:data.score})
            }
            else
            {
              wx.showToast({
                title: '获取失败',
                icon:'none'
              })
            }
            
            console.log(data)
          })
      }
    }
  }
})

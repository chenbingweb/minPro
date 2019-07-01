import { Player } from "../../modules/Player"
import { share } from "../../dati_comm/modules/share";
import { buttonDisabler } from "../../dati_comm/modules/buttonDisabler";
import { GameConn, WorldConn } from "../../dati_comm/libs/network/Conns";
import { FightRoom } from "../../dati_comm/modules/FightRoom"
import * as JSHelper from "../../dati_comm/modules/JSHelper"
import { txt } from "../../dati_comm/sdata/SDataID2"

// pages/matchJieSuan/matchJieSuan.js
var datas={
  myRankDB: { 
    w: 714, h: 168, split: [26, 26, 0], img: [
      "../../imgs/matchJS/My_1.png",
      "../../imgs/matchJS/My_2.png",
      "../../imgs/matchJS/My_3.png"
    ]
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:datas,
    jlboxv:false,//是否显示奖励框
    numtxt:"",//赛季序号文本
    jiesuanTitle:"",//结算标题
    list:[],//排行列表
    jlmoney:0,//奖励的金币
    jlxf: 0,//奖励的学分
    title:"",//标题
    gltxt:"",//鼓励相关的文本
    dwtxt:"",//段位文本

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showShareMenu({
      withShareTicket: true
    })
    this.setData({
      title: txt(2032),
      gltxt: txt(2034),
      breaktitle: txt(2042).replace(/\<br \/\>/g, "\n"),//赛季中断临时标题
      breakcontent: txt(2043).replace(/\<br \/\>/g, "\n")//赛季中断临时文案
    }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(() => {
      this.setData({
        ['data.opacity']: 1
      })
    }, 500)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var snum = Player.SeasonNum - 1
    if (snum < 1) snum = 12
    var numtxt = JSHelper.Num2Chinese(snum)

    var jiesuanTitle = txt(2029,numtxt)    //第{{numtxt}}赛季结算 
   
    

    var nm = FightRoom.SJPH
    if(!nm) return

    console.log(nm)

    var showme = true
    var list = nm.l
    for(var i=0;i<list.length;i++)
    {
      list[i].lm = JSHelper.LuoMa(list[i].ml2, list[i].l2)
      if (list[i].icon == Player.IconUrl())
      {
        showme = false
      }
      //list[i].vip = 1
    }

    //对列表进行排序
    list.sort((a, b) => { return a.pm - b.pm  })

    var self = nm.self
    self.icon = Player.IconUrl()
    self.name = Player.Name()
    self.vip = Player.IsVip 
    self.lm = JSHelper.LuoMa(self.ml2, self.l2)

    if (!showme) self.pm = -1

    console.log(nm)

    this.setData({ 
      numtxt: numtxt,
      jiesuanTitle:jiesuanTitle,
      self: self,
      list: list,
      jlst: Player.SeasonJLST,
      dwtxt: txt(2033).format(self.dwn + self.lm)
    })
    /*
    {
     icon:<string>,//头像
     name:<string>,//名称
     l1:<int>,//段位1
     l2:<int>,//段位2
     ml2:<当前段位2最大>
     l3:<int>,//段位3
     pm:<int>,//排名
   }
     */
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
  OnCloseClick(event){
    //返回
    //wx.navigateBack({ delta: 1 })
    FightRoom.JumpSeasonUI()
  },

  //黑色背景被点击
  OnNextClick2(event)
  {
    this.OnCloseClick(event)
  },
  OnNextClick(event) {
    if (!buttonDisabler.canClick()) return;
    if (Player.SeasonJLST==10)//领取奖励
    {
      GameConn.Request(
        { n: "SJJL" },
        (data) => {
            if(data.r!=0)  return
             
            this.setData(
              {
                jlboxv:true,
                jlmoney: data.jb,//奖励的金币
                jlxf: data.xf,//奖励的学分
              }
            )
        }
      )
    }else
    {
      //返回
      wx.navigateBack({ delta: 1 })
    }
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
   
    // if (options.target.dataset.id == 1){
    //   return share.getShareContent(options, 8)
    //   }

      if (options.from == 'button') 
            return share.getShareContent(options,8)
      else
            return share.getCommonShareContent(options); 

  }
})
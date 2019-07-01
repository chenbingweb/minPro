// pages/match/matchPage.js
import { Player } from "../../modules/Player" 
import { AutoJump } from "../../dati_comm/modules/LoginJump"
import {FightRoom, StopFight} from "../../dati_comm/modules/FightRoom"
import {share} from "../../dati_comm/modules/share";
import { buttonDisabler } from "../../dati_comm/modules/buttonDisabler";
import * as JSHelper from "../../dati_comm/modules/JSHelper"
import { GameConn, WorldConn } from "../../dati_comm/libs/network/Conns";

let datas = {
  wndname: "match",//窗体名称
  display: false,//block none 

  // plylevel1: null,
  // plylevel2: null,
  // plylevel3:null,
  wndAlpha: 1,
  wndPosX: 0,
  HeadFrame:null,//头像框图片
  IsVip:0,//是否为vip
  inter_bg: {
    w: 260, h: 56, split: [20, 25, 0], img: [
      "../../imgs/comm/d_b_1.png",
      "../../imgs/comm/d_b_2.png",
      "../../imgs/comm/d_b_3.png",
    ]
  },

  p_class_db: {
    w: 430, h: 512, split: [32, 32, 32, 32], img: [
      // "../../imgs/match/p_b_d_1.png",
      // "../../imgs/match/p_b_d_2.png",
      // "../../imgs/match/p_b_d_3.png",
      // "../../imgs/match/p_b_d_4.png",
      // "../../imgs/match/p_b_d_5.png",
      // "../../imgs/match/p_b_d_6.png",
      // "../../imgs/match/p_b_d_7.png",
      // "../../imgs/match/p_b_d_8.png",
      // "../../imgs/match/p_b_d_9.png"
    ]
  },
  p_title_db: {
    w: 330, h: 48, split: [26, 26, 0], img: [
      // "../../imgs/comm/dw_zd_1.png",
      // "../../imgs/comm/dw_zd_2.png",
      // "../../imgs/comm/dw_zd_3.png",
    ]
  },
  p_flah_db: {
    w: 560, h: 118, split: [78, 78, 0], img: [
      // "../../imgs/comm/flag_1.png"
      // "../../imgs/comm/flag_2.png",
      // "../../imgs/comm/flag_3.png",
    ]
  },
  plyIcon:"",//角色头像
  money:0,//金币
  xuefen:0,//学分
  dwItems:[],//段位相关信息
  seconds:100
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: datas,
    SeasonNum : -1,
    SeasonStart:0,
    SeasonEnd:0,
    SeasonBtn:0,//是否显示赛季按钮
  },
  

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (AutoJump("match", options)) return
    console.log(options)
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // datas.plylevel1 = Player.Level1
    // datas.plylevel2 = Player.Level2
    // datas.plylevel3 = Player.Level3

    // var plylevel4 = { level1: datas.plylevel1, level2: datas.plylevel2, level3: datas.plylevel3 };
    // module.exports.plylevel4 = plylevel4;

    // var ply = function () {
    //   this.data.plylevel3 = Player.Level3;
    // }
    // ply.prototype.func = function () {
    //   alert(this.data.plylevel3);
    //   }
    // console.log("PlayerPlayerPlayerPlayer", Player.Level3)
    // console.log("PlayerPlayerPlayerPlayer111", datas.plylevel3)
    if (AutoJump("match")) return

    //动画
    setTimeout(()=>{
      this.setData({
        ['data.user_animation']:'user_animation',
        ['data.dw_card']:'dw_card',
        ['data.dr']:'dr',
        ['data.mr']:'mr',
        ['data.ts']:'ts'
      })
    },500)
    //FightRoom.AutoShowBackTip()
    console.log("match关闭世界链接")
    StopFight()
    FightRoom.DoLeaveRoom()
    
    var numstr = Player.SeasonNum>0?JSHelper.Num2Chinese(Player.SeasonNum):""

    //20140901
    var sjdate = "\xa0\xa0\xa0第{0}赛季 ".format(numstr) + 
              "{0}年{1}月{2}日".format(parseInt( Player.SeasonStart/10000), parseInt(Player.SeasonStart/100)%100, Player.SeasonStart%100)+"~"+
              "{0}年{1}月{2}日".format(parseInt(Player.SeasonEnd/10000),  parseInt(Player.SeasonEnd/100)%100, Player.SeasonEnd%100)

    this.setData({ 
      season_open:Player.SeasonNum>0,
       ['data.IsVip']: Player.IsVip,
       ['data.HeadFrame']: Player.HeadFrame,
       ["data.plyIcon"]: Player.IconUrl(),
       ["data.money"]: Player.Money(),
       ["data.xuefen"]: Player.Xuefen(),
       SeasonNum: Player.SeasonNum,
       SeasonStart: Player.SeasonStart,
       SeasonEnd: Player.SeasonEnd,
       sjdate:sjdate,
       SeasonBtn:Player.SeasonBtn
    }) 


 
    

    var dwdata = getApp().globalData.wnds.Wnd_Match.dwdata//段位相关信息
    this.data.dwItems = []

    /*
    for(var i=0;i<dwdata.dw.length;i++)
    {
      var dwinfo = dwdata.dw[i]
      for(var ii=0;ii<dwinfo.l;ii++)
      {

      }
    }*/
    var xingcount = dwdata.dw[Player.Level1-1].x
    var level2count = dwdata.dw[Player.Level1 - 1].l
    var menpiao = dwdata.dw[Player.Level1 - 1].mp
    var xing=[]
    var kongxing=[]
    for (var i = 0; i < Player.Level3;i++) xing.push(1)
    for (var i = 0; i < xingcount - Player.Level3; i++) kongxing.push(1)
    this.data.dwItems.push(
      {
        Level1:Player.Level1,
        Level2: level2count - Player.Level2 + 1,
        xing: xing,
        kongxing: kongxing,
        menpiao: menpiao
      }
    )

    //xing
    //kongxing
    //Level1
    //Level2
    this.setData({ ["data.dwItems"]: this.data.dwItems  })

    /*
    var op = getApp().globalData.IndexPageOptions
    if (op.m9)
    { 
        FightRoom.LeaveRoom2(
            (r) => {
                //if(r!=1)
                //{ 
                    if (op.m9) {
                      console.log("onShow 发起挑战")
                      FightRoom.StartPK(9,0,0,0,op.m9)
                      op.m9 = null
                    }
                //}else
                //{
                    //当前正在战斗
                    //FightRoom.StartPK(0)
                //}
            }
        ); 
    } 
    //else
    { 
    //    FightRoom.LeaveRoom()
    }
    */

     if(this.NeedJump3v3PK)
      {
        this.NeedJump3v3PK = false 
        FightRoom.StartPK( 9 )
      }
 

     /*
     dw:[
{
 id:<int>,//段位id
 n:<string>,//段位名字
 icon:<string>,//段位图标
 x:<int>,//段位星数
 l:<int>,//段位等级数
 mp://门票
}
]
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
  //赛季排行榜
  OnPHClick: function (event)
  {
    if (!buttonDisabler.canClick()) return;
    
    FightRoom.RequestSJPH(
      () => {
        getApp().globalData.wnds.Wnd_MatchJieSuan.Show()
      }
    )
  },
  //随机PK
  OnSuijiPKClick:function(event)
  {      
    setTimeout(() => {
      FightRoom.StartPK( 4  )
    }, this.data.seconds)
  },
  OnFriendPKClick:function(event)
  {
     if (!buttonDisabler.canClick()) return;
      FightRoom.StartPK( 9 )
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  //单人动画
  OnSingleTouchStart(){
    this.setData({
      ['data.btnHtwScale']:0.98
    })
  },
  OntazClick(event){
    if (!buttonDisabler.canClick()) return;
    console.log(datas.Istz);
    setTimeout(() => {
      getApp().globalData.wnds.Wnd_Shopping.Show(null, "Istz=" + datas.Istz);
    }, this.data.data.seconds)
  },
  OnSingleTouchEnd(){
    setTimeout(()=>{
      this.setData({
        ['data.btnHtwScale']:1
      })
    }, this.data.seconds)
  },
  //多人
  OnMoreTouchStart(){
    this.setData({
      ['data.moreScale']: 0.98
    })
  },
  OnMoreTouchEnd(){
    setTimeout(() => {
      this.setData({
        ['data.moreScale']: 1
      })
    }, this.data.seconds)
  },
  inform_clack(){

    /*
    wx.showModal({
      title: '赛季通知',
      showCancel: false,
      content: "2018年最强答题第一赛季就要接近尾声了，本赛季将于2018年3月15日结束，你们的智慧将得到优厚的回馈，届时会看到你在世界的排名。\r\n关于第一赛季结算及开启第二赛季的规则：\r\n1、所有玩家的段位排名重置\r\n2、根据结算前最高段位发放对应的奖励\r\n3、第二赛季将于：2018年3月15日开启",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    */
     //请求获取赛季结算需要的信息
      GameConn.Request(
        { n: "SeasonJS" },
        (data) => {
            FightRoom.SeasonJS = data//保存赛季结算相关的信息
            
            //跳转到赛季结算通知界面
            getApp().globalData.wnds.Wnd_NoticeAccounts.Show()
        }
      )

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
      if (options.from == 'button') {
          if (options.target && options.target.dataset) 
          {
              if(options.target.dataset.id=="pk3v3")
              {
                  var sharemsg = share.getTeamShareMessage(Player.InviteCode)
                  sharemsg.success = ()=>{
                      this.NeedJump3v3PK = true

                     
                  }
                  return sharemsg
              }
          }
      }

      return share.getCommonShareContent(options);
  }
})

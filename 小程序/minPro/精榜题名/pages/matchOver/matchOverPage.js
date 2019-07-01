import { Player } from "../../modules/Player"
import { FightRoom, StopFight } from "../../dati_comm/modules/FightRoom"
import { GameConn, WorldConn } from "../../dati_comm/libs/network/Conns";
import { AutoJump } from "../../dati_comm/modules/LoginJump"
import { share } from "../../dati_comm/modules/share";
import { buttonDisabler } from "../../dati_comm/modules/buttonDisabler";
import { TimeAnimation } from "../../utils/timeAnimation.js"
import * as JSHelper from "../../dati_comm/modules/JSHelper"
import { txt } from "../../dati_comm/sdata/SDataID2"


import { SDataKeyMath } from "../../sdata/SDataKeyMath"
let AnimaData = [
  {
    ['data.Ani_Match_show']: 'Ani_Match_show',//总开关
    ['data.app_user_header_opacity_1v1']: 'app_user_header_opacity_1v1', //头像
    ['data.mvpanima']: true,//mvp
  },
  { ['data.app_tip_opacity_scale_1v1']: 'app_tip_opacity_scale_1v1' },//胜败提示 
  { ['data.app_user_score_opacity_1v1']: 'app_user_score_opacity_1v1' },//获得的积分
  { ['data.app_user_xf_1v1_an']: 'app_user_xf_1v1_an' },//获得的学分
  { ['data.app_user_coin_1v1_an']: 'app_user_coin_1v1_an' },//获得的金币
  { ['data.app_repeat_an']: 'app_repeat_an' },//再来一局
  { ['data.app_jx_an']: "app_jx_an" },//解析
  { ['data.app_share_btn_an']: "app_share_btn_an" },//分享
  { ['data.app_rank_An']: 'app_rank_An' }//段位
]

let qun = 0;
let geren = 0;

let datas = {
  wndname: "matchOver",//窗体名称
  display: false,//block none  
  wndAlpha: 1,
  wndPosX: 0,
  item: [0, 1, 2, 3, 4],
  use_bg: {
    w: 260, h: 55, split: [20, 20, 0], img: [
      "../../imgs/comm/d_b_1.png",
      "../../imgs/comm/d_b_2.png",
      "../../imgs/comm/d_b_3.png",
    ]
  },

  tipsa: {
    w: 222, h: 108, split: [22, 38, 12, 22], img: [
      "../../imgs/fightOver/qipao_1.png",
      "../../imgs/fightOver/qipao_2.png",
      "../../imgs/fightOver/qipao_3.png",
      "../../imgs/fightOver/qipao_4.png",
      "../../imgs/fightOver/qipao_5.png",
      "../../imgs/fightOver/qipao_6.png",
      "../../imgs/fightOver/qipao_7.png",
      "../../imgs/fightOver/qipao_8.png",
      "../../imgs/fightOver/qipao_9.png"
    ]

  },
  qpbg: {
    //300 1个好友
    //350 2个好友
    w: 350, h: 70, split: [20, 20, 20, 20], img: [
      "../../imgs/fightOver/qp1.png",
      "../../imgs/fightOver/qp2.png",
      "../../imgs/fightOver/qp3.png",
      "../../imgs/fightOver/qp4.png",
      "../../imgs/fightOver/qp5.png",
      "../../imgs/fightOver/qp6.png",
      "../../imgs/fightOver/qp7.png",
      "../../imgs/fightOver/qp8.png",
      "../../imgs/fightOver/qp9.png"
    ]
  },
  //等待中的角色 {icon:''}
  waitPlys: [
    //{icon:"../../imgs/home/home_bg.png"},
    //{icon:"../../imgs/home/home_bg.png"},
  ],
  winv: false,//是否显示胜利图标 
  leftfen: 0,//左分数
  xuefen: 0,//学分
  levelx: 2,
  rightfen: 0,//右分数
  leftliandui: 0,//左连对
  rightliandui: 0,//右连对
  money: 0,//获得的清风币 
  teamMoney: 0,//组队额外加成
  fjXuefen: 0,//附加学分
  addMoney: 0,//额外总和
  vipMoney: 0,//VIP加成
  FXMoney: 0,//分享可获得的金币数
  showShareReward: false, // 是否提示分享有奖励
  level1: 1,//段位
  levelName: "",//段位名字
  currxing: [],//当前星
  xing: [],//星

  qipaoStyle: '',//气泡风格

  //左边角色头像
  leftPly: [
    {
      icon: null,//图标 
      name: ""//名字
    },
    { v: false, icon: null, name: "" },
    { v: false, icon: null, name: "" }
  ],
  //右边角色头像
  rightPly: [
    { v: false, icon: null, name: "" },
    { v: false, icon: null, name: "" },
    { v: false, icon: null, name: "" }
  ],
  seconds: 100,
  LevelImg:'',//切磋等级
  level_icon:'',
  qc_count:0,
  level:false
}



// pages/matchOver/matchPage.js
Page({

  data: { data: datas },
  onLoad: function (options) {

    qun = Player.Backpack.ShareQunNum;
  
    this.fenxiang(qun)
    wx.showShareMenu({
      withShareTicket: true
    })
    // 页面初始化 options为页面跳转所带来的参数
    if (AutoJump("matchOver", options)) return;
  },
  onShow: function () {
    // var read = require("../ready/readyPage.js");
    // var c = require('../../pages/match/matchPage.js');
    // c.func();

    setTimeout(() => {
      this.fenxiang(qun)
    }, 500)

    if (AutoJump("matchOver")) return
    this.NeedExitFight = true
    // 切磋等级
    this.setData({
      ['data.LevelImg']: Player.LevelImg,
    })
    var cloneAnimaData = []
    for (var i = 0; i < AnimaData.length; i++) {
      var obj = {}
      for (var key in AnimaData[i]) obj[key] = AnimaData[i][key]
      cloneAnimaData.push(obj)
    }

    this.DoAnimation(cloneAnimaData)
    //等级升级
    this.setData({
      ['data.level_icon']: Player.ArticleServerUrl() + FightRoom.Chengji.level_icon,
      ['data.qc_count']: FightRoom.Chengji.qc_count,
      ['data.level']: FightRoom.Chengji.level ? true : false
    })
  },

  _BindEvts() {
    this.offEvts()
    console.log("========matchOverPage.BindEvt==========")
    FightRoom.EvtLeave.On(this, this.OnLeave)
    FightRoom.EvtUserReady.On(this, this.OnUserReady)
  },

  offEvts: function () {
    console.log("========matchOverPage.offEvts==========")
    FightRoom.EvtLeave.Off(this.OnLeave)
    FightRoom.EvtUserReady.Off(this.OnUserReady)
  },

  OnLeave() {
    this.OnUserReady()
  },
  OnUserReady() {
    console.log("OnUserReady", FightRoom.ReadyUsers)

    var oldQipaoW = this.QipaoWidth()

    //清理等待队列中已经被隐藏的
    for (var i = datas.waitPlys.length - 1; i >= 0; i--) {
      if (datas.waitPlys[i].style == "iconout")
        datas.waitPlys.splice(i, 1)
    }

    if (FightRoom.ReadyUsers.length == 0)//已经完全没有角色了，渐隐气泡
    {
      if (datas.waitPlys.length > 0)//当前面板中有显示角色
      {
        //清空
        datas.waitPlys = []

        //下移渐隐
        datas.qipaoStyle = 'qipao_hide'
        this.setData({ ["data.qipaoStyle"]: datas.qipaoStyle })
      }

      return
    }


    if (datas.waitPlys.length == 0)//当前没有任何显示的头像，一定是打开界面第一次显示
    {
      datas.waitPlys = []

      for (var j = 0; j < FightRoom.ReadyUsers.length; j++) {
        var ply = FightRoom.ReadyUsers[j]
        this.JoinWaitPly(ply, "")
      }

      //气泡宽度动画
      var qpbgw = this.QipaoWidth()
      console.log("qpbgw", qpbgw)
      this.WAnima.init(qpbgw, qpbgw);

      this.setData({ ["data.waitPlys"]: datas.waitPlys })

      //上移渐显
      datas.qipaoStyle = 'qipao_show'
      this.setData({ ["data.qipaoStyle"]: datas.qipaoStyle })

      return
    }


    //已经不存在的头像渐隐
    for (var i = datas.waitPlys.length - 1; i >= 0; i--) {
      var uid = datas.waitPlys[i].uid
      var isExsit = false
      for (var j = 0; j < FightRoom.ReadyUsers.length; j++) {
        if (FightRoom.ReadyUsers[j].uid == uid) {
          isExsit = true
          break
        }
      }
      if (!isExsit) {
        //datas.waitPlys[i].style="iconout"
        datas.waitPlys.splice(i, 1)
      }
    }


    //渐入的头像，风格变为正常
    for (var i = datas.waitPlys.length - 1; i >= 0; i--) {
      if (datas.waitPlys[i].style != "iconout")
        datas.waitPlys[i].style = ""
    }

    //新增头像加入
    for (var j = 0; j < FightRoom.ReadyUsers.length; j++) {
      var ply = FightRoom.ReadyUsers[j]
      this.JoinWaitPly(ply, "iconjoin")
    }

    //应用角色头像数据
    this.setData({ ["data.waitPlys"]: datas.waitPlys })

    //气泡宽度动画
    var currQipaoW = this.QipaoWidth()

    this.WAnima.init(oldQipaoW, currQipaoW);
  },
  JoinWaitPly(ply, iconstyle) {
    var plyuid = ply.uid
    var isExsit = false
    for (var i = datas.waitPlys.length - 1; i >= 0; i--) {
      if (datas.waitPlys[i].uid == plyuid) {
        isExsit = true
        break
      }
    }

    if (!isExsit) {
      datas.waitPlys.push(
        {
          style: iconstyle,
          uid: plyuid,
          icon: ply.iconurl,
          hf: ply.hf,
          name: ply.name
        }
      )
    }
  },
  //计算当前气泡宽度
  QipaoWidth() {
    var w = 250
    for (var i = datas.waitPlys.length - 1; i >= 0; i--) {
      if (datas.waitPlys[i].style != "iconout") w += 50
    }
    return w
  },
  DoAnimation(animData) {
    if (animData.length <= 0) {
      //切换到配对节点
      if (FightRoom.Chengji) FightRoom.ConnPair()

      //气泡宽度动画控制器初始化
      this.WAnima = new TimeAnimation();
      this.WAnima.steps = 10
      this.WAnima.time = 100
      this.WAnima.score = res => {
        this.setData({ ["data.qpbg.w"]: parseInt(res) })
      }


      //清理等待中的玩家
      datas.waitPlys = []
      this.setData({ ["data.waitPlys"]: datas.waitPlys })

      datas.qipaoStyle = ''
      this.setData({ ["data.qipaoStyle"]: datas.qipaoStyle })


      this._BindEvts()
      this.OnLeave()
      this.OnUserReady()


      return//已经没有动画可播放
    }
    var currA = animData[0]
    animData.splice(0, 1)
    this.setData(currA)
    setTimeout(() => { this.DoAnimation(animData) }, 25)
  },
  onReady() {
    this.OnShowDone()
  },
  onHide: function () {
    this.offEvts()

    // 页面隐藏 
    if (this.NeedExitFight) {
      console.log("===========3v3fightover onHide LeaveRoom===================")
      FightRoom.LeaveRoom()
    }

    //清理等待中的玩家
    datas.waitPlys = []
    this.setData({ ["data.waitPlys"]: datas.waitPlys })

    //设置气泡风格
    datas.qipaoStyle = ''
    this.setData({ ["data.qipaoStyle"]: datas.qipaoStyle })

  },
  onUnload: function () {
    // 页面关闭
    this.onHide()
  },
  _UpdatePlys() {

    this.setData({ ["data.rightPly"]: datas.rightPly })
    this.setData({ ["data.leftPly"]: datas.leftPly })
  },
  _parsePly(cjplys, plylist) {

    var maxRightCount = 0;
    var mvpuid = ""

    //统计mvp
    for (var uid in cjplys) {
      var pinfo = cjplys[uid]
      var rightCount = 0
      for (var i = 0; i < pinfo.fff.length; i++) {
        if (pinfo.fff[i] > 0) rightCount++
      }

      if (rightCount > maxRightCount) {
        maxRightCount = rightCount
        mvpuid = uid
      }

    }


    var i = 0
    for (var uid in cjplys) {
      var pinfo = cjplys[uid]

      var ply = plylist[i]
      ply.icon = FightRoom.IconUrl(pinfo.face)
      ply.k = FightRoom.HeadFrameUrl(pinfo.k)
      ply.name = pinfo.name
      ply.hf = pinfo.hf
      ply.v = true

      ply.mvp = (mvpuid == uid)
      // if(mvpuid==uid){ 
      //   ply.mvp = true
      //   console.log('============>mvp id', mvpuid, ply)
      // }

      i++
    }
  },
  viewshow() {
    var that = this;
    var tp = that.data.tipsb;
    if (tp) {
      this.setData({ ["data.tipsxs"]: true })

    } else {
      this.setData({ ["data.tipsxs"]: false })

    }

  },
  tipsmoney() {
    var than = this
    than.setData({ tipsb: (!than.data.tipsb) })
    this.viewshow()
  },
  fenxiang(qun) {

    if (isNaN(Player.Backpack.ShareQunNum)) {
      qun = 0;
    } else {
      if (qun != Player.Backpack.ShareQunNum + 1) { //无效的预增加
        qun = Math.max(qun, Player.Backpack.ShareQunNum)
      }
    }
    this.itemdata(qun)
  }

  ,
  itemdata(qun)//接收分享点击次数
  {
    var items = []
    SDataKeyMath.Foreach((id, row) => {
      var item = {
        QunMoney: row[SDataKeyMath.I_QunMoney]
      }
      items.push(item.QunMoney)
    })
    var len = items.length-1
    if (qun<len){
      this.setData({ ["data.FXMoney"]: items[qun] })
    }else{
      this.setData({ ["data.FXMoney"]: items[len] })
    }
  },

  OnShowDone() {
    var cj = FightRoom.Chengji
    if (!cj) return
    //分数动画
    //let left_XF_An = new TimeAnimation();
    //分数动画
    //let right_XF_An = new TimeAnimation();
    //连对动画
    //let left_LD_An = new TimeAnimation();
    //连对动画
    //let right_LD_An = new TimeAnimation();
    this.setData({ ['data.showShareReward']: share.hasShareReward() });

    //FightRoom.ClearBackTip()

    var lp = FightRoom.IsA ? cj.aply : cj.bply
    var rp = FightRoom.IsA ? cj.bply : cj.aply

    //处理头像
    this._parsePly(lp, datas.leftPly)
    this._parsePly(rp, datas.rightPly)
    this._UpdatePlys()

    //连对 
    this.setData({ ["data.leftliandui"]: this.TeamLiandui(lp) })
    this.setData({ ["data.rightliandui"]: this.TeamLiandui(rp) })
    // setTimeout(() => {
    //   left_LD_An.init(0, this.TeamLiandui(lp))
    //   left_LD_An.score = res => {
    //     this.setData({ ["data.leftliandui"]: parseInt(res) })
    //   };
    // }, 2000)
    // setTimeout(() => {
    //   right_LD_An.init(0, this.TeamLiandui(rp))
    //   right_LD_An.score = res => {
    //     this.setData({ ["data.rightliandui"]: parseInt(res) })
    //   };
    // }, 2000)
    // this.setData({ ["data.FXMoney"]: Player.FXMoney })


    //左方是否胜利
    var leftIsWin = FightRoom.IsA ? (cj.win == 1) : (cj.win != 1)
    this.setData({ ["data.winv"]: leftIsWin })


    // 判断输赢显示动画
    if (leftIsWin) {
      this.setData({ ["data.xs"]: "start_xs" })
      this.setData({ ["data.opa"]: 0 })
    } else {
      this.setData({ ["data.xs"]: "start_dx" })
      this.setData({ ["data.opa"]: 1 })
    }
    //计算左方玩家总分,和游戏币
    var leftFen = FightRoom.IsA ? cj.afen : cj.bfen
    this.setData({ ["data.leftfen"]: leftFen })
    // setTimeout(() => {
    //   left_XF_An.init(0, leftFen)
    //   left_XF_An.score = res => {
    //     this.setData({ ["data.leftfen"]: parseInt(res) })
    //   };
    // }, 2000)

    //计算右方玩家总分,和游戏币
    var rightFen = FightRoom.IsA ? cj.bfen : cj.afen
    this.setData({ ["data.rightfen"]: rightFen })
    // setTimeout(() => {
    //   right_XF_An.init(0, rightFen)
    //   right_XF_An.score = res => {
    //     this.setData({ ["data.rightfen"]: parseInt(res) })
    //   };
    // }, 2000)
    //获得的清风币
    var leftyxb = parseInt(cj.yxb)

    // 好友组队额外金币
    var teamAddMoney = parseInt(cj.zdm)

    // 自己VIP额外金币
    var zjAddMoney = this.addvipd(cj.vipm)

    // 队友VIP额外金币
    var vipAddMoney = this.addvipm(cj.vipm)


    // 额外总和
    // var addMoney = this.addvipm(vipAddMoney) + teamAddMoney 
    var addMoney = vipAddMoney + teamAddMoney + zjAddMoney
    this.setData({ ["data.addMoney"]: addMoney })
    let teams = [teamAddMoney, zjAddMoney, vipAddMoney];
    let real = []

    var teamAdd = txt(2048).format(teamAddMoney)
    var vipAdd = txt(2049).format(vipAddMoney)
    var zjAdd = txt(2050).format(zjAddMoney)
    // 额外金币大于0，则显示，否则不显示
    if (teamAddMoney > 0) {
      this.setData({ ["data.zuidui1"]: teamAdd })
      this.setData({ ["data.zd1"]: true })
    } else {
      this.setData({ ["data.zd1"]: false })
    }
    if (zjAddMoney > 0) {
      this.setData({ ["data.zuidui2"]: zjAdd })
      this.setData({ ["data.zd2"]: true })
    } else {
      this.setData({ ["data.zd2"]: false })
    }
    if (vipAddMoney > 0) {
      this.setData({ ["data.zuidui3"]: vipAdd })
      this.setData({ ["data.zd3"]: true })
    } else {
      this.setData({ ["data.zd3"]: false })
    }

    // 根据要显示的view数量。设置气泡高低
    for (let i = 0; i < teams.length; i++) {
      if (teams[i]) {
        real.push(teams[i])
      }
    }
    if (real.length == 3) {
      this.setData({
        ['data.tipsa.h']: 130,
        ['data.boxheight']: 100
      })
    }
    else if (real.length == 2) {
      this.setData({
        ['data.tipsa.h']: 110,
        ['data.boxheight']: 80
      })
    }
    else if (real.length == 1) {
      this.setData({
        ['data.tipsa.h']: 80,
        ['data.boxheight']: 50
      })

    } else {

    }
    // 金币总和
    var zhMoney = leftyxb + addMoney
    this.setData({ ["data.money"]: zhMoney })
    console.log("zhMoney:" + zhMoney)
    //获得的学分
    var leftXuefen = parseInt(cj.xf)
    // 额外学分
    var fjXuefen = parseInt(cj.fxf)

    this.setData({ ["data.xuefen"]: leftXuefen + fjXuefen })
    this.setData({ ["data.fjXuefen"]: fjXuefen })
    // this.UpdateDuanWei()

    setTimeout(() => {
    //  this.UpdateDuanWei()
    }, 1000)
    /*
    dw: [
      {
        id: <int>,//段位id
        n: <string>,//段位名字
        icon: <string>,//段位图标
        x: <int>,//段位星数
        l: <int>,//段位等级数
      }
    ]*/
    /*
  levelName:"",//段位名字 
     */
  },
  UpdateDuanWei() {
    // Player.Level1

    //默认不显示
    datas.levelx = parseInt(Player.Level1) + 1
    this.setData({ ["data.levelx"]: parseFloat(datas.levelx) })
    this.setData({ ["data.opax"]: 0 })
    //默认显示
    this.setData({ ["data.level1"]: Player.Level1 })
    this.setData({ ["data.opa"]: 1 })


    //默认隐藏这颗星
    this.setData({ ["data.sfxs5"]: false })

    var xingCount = 0
    //段位名字
    {
      //段位相关信息
      var dwdata = getApp().globalData.wnds.Wnd_Match.dwdata
      for (var i = 0; i < dwdata.dw.length; i++) {
        var dwinfo = dwdata.dw[i]
        // if (Player.Level1 == dwinfo.id && Player.Level2 == "5" && Player.Level3 == "5") {

        if (dwinfo.id == Player.Level1) {
          var level2count = dwinfo.l
          this.setData({ ["data.levelName"]: dwinfo.n + JSHelper.LuoMa(level2count, Player.Level2) })
          xingCount = dwinfo.x
          break
        }
      }
    }

    var cj = FightRoom.Chengji
    if (!cj) return
    //左方是否胜利
    var leftIsWin = FightRoom.IsA ? (cj.win == 1) : (cj.win != 1)
    this.data.xing = []
    this.data.currxing = []
    for (var i = 0; i < datas.item.length; i++) {
      this.setData({ ["data.sfxs" + i]: false })
    }


    var par = parseInt(Player.Level3) - 1
    // if (leftIsWin){
    // var par=parseInt(Player.Level3)-1
    // }else{
    //   var par = parseInt(Player.Level3)-1 
    // }
    for (var i = 0; i <= par; i++) //有多少星，循环多次
    {

      if (i == 0 || i == 1 || i == 2 || i == 3 || i == 4) {
        //显示星星
        this.setData({ ["data.sfxs" + parseFloat(i)]: true })
        this.setData({ ["data.xs" + parseFloat(i)]: "" })
        this.setData({ ["data.opa" + parseFloat(i)]: 1 })
        console.log("循环i的值:", i)
        console.log("leftIsWin:" + leftIsWin)
        console.log("par:" + par)

        //判断最后一颗心显示的位置
        if (par == parseInt(i) && leftIsWin == true) {
          this.setData({ ["data.opa" + parseFloat(i)]: 0 })

          console.log("胜利，进入动画方法的值", i)
          this.pd_shuying(i)
        } else if (par == parseInt(i) && leftIsWin != true) {
          //为五颗星的时候，隐藏最后一颗星
          if (par == 4) {
            this.setData({ ["data.opa" + parseFloat(i)]: 0 })
          }
          var a = i + 1

          console.log("失败，进入动画方法的值", a)
          this.pd_shuying(a)
        }
      }
    }
    this.setData({ ["data.xing"]: this.data.xing })
    this.setData({ ["data.currxing"]: this.data.currxing })

  },
  // 判断输赢显示动画
  pd_shuying(res) {

    var read = require("../ready/readyPage.js");

    console.log("Level3Level3Level3Level3Level3", read.plylevel4)

    console.log("Level3Level3Level3Level3Level3", read.plylevel4.level1)
    console.log("Level3Level3Level3Level3Level3", read.plylevel4.level2)
    console.log("Level3Level3Level3Level3Level3", read.plylevel4.level3)
    console.log("==================进入显示动画方法==========")

    var cj = FightRoom.Chengji
    if (!cj) return
    //左方是否胜利
    var leftIsWin = FightRoom.IsA ? (cj.win == 1) : (cj.win != 1)
    if (leftIsWin) {

      console.log("胜利，执行加星动画")
      //赢了执行缩小动画
      this.setData({ ["data.xs" + parseFloat(res)]: "start_xs" })//缩小动画
      this.setData({ ["data.opa" + parseFloat(res)]: 0 })

      // this.setData({ ["data.opa5"]: 0 })
    } else {
      //输了执行放大动画
      if (Player.Level3 == "1" && Player.Level2 == "1" && Player.Level1 == "1") {//如果段位是青铜5，则不显示扣星动画 
        if (read.plylevel4.level1 == "1" && read.plylevel4.level2 == "1" && read.plylevel4.level3 == "2") {

          console.log("输掉比赛，执行的消失动画")
          //输掉比赛后，执行的消失动画
          this.setData({ ["data.sfxs1"]: true })
          this.setData({ ["data.xs1"]: "start_dx" })//动画
          this.setData({ ["data.opa1"]: 1 })
        } else {
          console.log("青铜五，不扣分，不显示动画")
          this.setData({ ["data.sfxs0"]: 1 })
          this.setData({ ["data.opa0"]: 1 })
        }
      }
      //输了比赛后，如果小段位是五，并且是五颗星，则执行隐藏旧段位图标，显示新段位图标，渐显
      else if (Player.Level2 == "5" && Player.Level3 == "5") {

        console.log("比赛失败，进入降段动画")
        //显示上个段位的图标，透明度1-0，消失
        this.setData({ ["data.opax"]: 1 })
        this.setData({ ["data.levelx"]: datas.Levelx })//显示白银图标
        this.setData({ ["data.qbx"]: "start_qbxs" })
        //显示第一颗星星，透明度为1，并执行动画
        this.setData({ ["data.sfxs5"]: true })
        this.setData({ ["data.opa5"]: 1 })
        this.setData({ ["data.xs5"]: "start_dx" })
        //显示所有星星，透明度为0，1950m后并执行动画
        for (var a = 0; a < datas.item.length; a++) {
          this.setData({ ["data.sfxs" + parseFloat(a)]: true })
          this.setData({ ["data.xs" + parseFloat(a)]: "start_qbjx" })
          this.setData({ ["data.opa" + parseFloat(a)]: 0 })
        }
        //当前段位的图标，透明度0-1，渐显
        this.setData({ ["data.qb"]: "start_qbjx" })
        this.setData({ ["data.opa"]: 0 })
        this.setData({ ["data.level1"]: Player.Level1 })

      }

      //输了比赛后，如果是五颗星，则执行消失第一颗星，逐渐显示出五颗星
      else if (Player.Level3 == "5") {

        console.log("比赛失败，进入降星动画")
        //显示第一颗星星，透明度为1，并执行动画
        this.setData({ ["data.sfxs5"]: true })
        this.setData({ ["data.opa5"]: 1 })
        this.setData({ ["data.xs5"]: "start_dx" })
        //显示所有星星，透明度为0，1950m后并执行动画
        for (var a = 0; a < datas.item.length; a++) {
          this.setData({ ["data.sfxs" + parseFloat(a)]: true })
          this.setData({ ["data.xs" + parseFloat(a)]: "start_qbjx" })
          this.setData({ ["data.opa" + parseFloat(a)]: 0 })
        }
      }
      else {
        console.log("比赛失败，进入消失动画")
        //输掉比赛后，执行的消失动画
        this.setData({ ["data.sfxs" + parseFloat(res)]: true })
        this.setData({ ["data.xs" + parseFloat(res)]: "start_dx" })//动画
        this.setData({ ["data.opa" + parseFloat(res)]: 1 })
      }
    }
  },
  TeamLiandui(plys) {
    var liandui = 0
    var tmpliandui = 0
    for (var i = 0; i < FightRoom.MaxLun; i++) {
      var right = false
      for (var uid in plys) {

        if (plys[uid].fff[i] > 0) {
          right = true
          break
        }
      }
      if (right) {
        tmpliandui++
        if (tmpliandui > liandui) liandui = tmpliandui
      }
      else
        tmpliandui = 0
    }
    return liandui
  },
  // 自己vip增加的的金币
  addvipm(key) {

    var vipm = 0;
    for (var val in key) {
      if (val == FightRoom._WorldSessioncode) {
        vipm += key[val]
      }

    }

    return vipm

  },
  //队友VIP增加的金币
  addvipd(key) {
    var vipd = 0;
    for (var val in key) {
      if (val != FightRoom._WorldSessioncode) {
        vipd += key[val]
      }

    }
    return vipd

  },


  //再来一局动画
  OnReFightTouchStart() {
    this.setData({
      ['data.btnReFightScale']: 0.95
    })
  },
  OnReFightTouchEnd() {
    setTimeout(() => {
      this.setData({
        ['data.btnReFightScale']: 1
      })
    }, this.data.seconds)

  },
  //查看解析动画
  OnJiexiTouchStart() {
    this.setData({
      ['data.btnJiexiScale']: 0.95
    })
  },
  OnJiexiTouchEnd() {
    setTimeout(() => {
      this.setData({
        ['data.btnJiexiScale']: 1
      })
    }, this.data.seconds)
  },

  //再来一局
  OnReFightClick(event) {
    if (!buttonDisabler.canClick()) return;

    this.NeedExitFight = false
    console.log("ReFight关闭世界链接")
    StopFight()
    FightRoom.RePK()
  },
  /*
  //炫耀成绩
  OnXuanyaoClick(event) {
    if (!buttonDisabler.canClick()) return;
    wx.showShareMenu({
      withShareTicket: true
    })
  },*/
  OnBackClick(event) {
    if (!buttonDisabler.canClick()) return;
    getApp().globalData.wnds.Wnd_MatchOver.back()
    FightRoom.LeaveRoom()
  },
  OnJiexiClick(event) {
    if (!buttonDisabler.canClick()) return;
    setTimeout(() => {
      getApp().globalData.wnds.Wnd_Analysis.Show()
    }, this.data.seconds)
  },
  onShareAppMessage(options) {
    
    return share.getPTMessage();
  },
})
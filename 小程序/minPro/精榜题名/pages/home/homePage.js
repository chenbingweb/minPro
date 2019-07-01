
// pages/home/homePage.js
import { AutoJump } from "../../dati_comm/modules/LoginJump"
import { Player } from "../../modules/Player"
import { FightRoom, StopFight } from "../../dati_comm/modules/FightRoom"
import { NSLoginSys } from "../../dati_comm/libs/network/NSLoginSys"
import { ServerList } from "../../dati_comm/libs/network/NSServerList"
import { TimeAnimation } from "../../utils/timeAnimation.js"
import { share } from "../../dati_comm/modules/share";

import { OOSyncClient } from "../../dati_comm/libs/oosync/OOSyncClient"
import { UIEvent } from "../../dati_comm/libs/network/UIEvent"
import { buttonDisabler } from "../../dati_comm/modules/buttonDisabler";
import { GameConn, WorldConn } from "../../dati_comm/libs/network/Conns";
import { SDataHuanliang } from "../../sdata/SDataHuanliang"
import * as AppJumpMgr from "../../dati_comm/modules/AppJumpMgr"
import * as Debug from "../../dati_comm/modules/Debug"
import { Msg } from "../../dati_comm/libs/oosync/OOMsg.js"
import { txt } from "../../dati_comm/sdata/SDataID2"



let datas = {
  
  Score:0,
  authorize:false,//显示授权登录
  items: [],
  Istz: true,
  wndname: "home",//窗体名称
  IsVip: 0,//是否是vip
  HeadFrame:null,//头像框图片
  display: false,//block none
  FXMoney: 0,
  appid:'',
  path:'',
  inter_bg: {
    w: 260, h: 56, split: [20, 25, 0], img: [
      "../../imgs/comm/d_b_1.png",
      "../../imgs/comm/d_b_2.png",
      "../../imgs/comm/d_b_3.png",
    ]
  },
  share_bg: {
    w: 320, h: 132, split: [190, 0, 0, 132], img: [
      "../../imgs/home/share_d_1.png",
      "../../imgs/home/share_d_2.png"
    ]
  },
  UserName: "用户名",
  UserIcon: '',
  Money: 1002,
  Xuefen: 2002,
  ol: 0,//当前在线
  HT_Animation: null,//话题王
  showShareReward: false, // 是否提示分享有奖励
  showHome: true,
  btnOnClickScale: 0.98,
  btnHtwScale: 1,
  btnShopScale: 1,
  btnTeamScale: 1,
  btnPKScale: 1,
  btnRankScale: 1,
  seconds: 100,//按钮动画时间
  model: false, //是否是苹果X
  msg:'',//广播消息
  qcLevel:'',//切磋等级
  TodayIsQiandao:'',
  LianxuQiandaoCount:0,//签到次数
  TodayGankaoCount:0,
  TodayQiecuo1V1Count:0,
  TodayQiecuo3V3Count:0,
  TodayCGCount:0,
  LevelIcon:'',
  gankaoIcon:'',
  gkStar: 1,//赶考星
  showBtn:false,
  authorize:false,
  playing: false
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: datas,
   
  },

  counterMoney: {
    lastCount: 0,
    duration: 1, // 显示金币增加的计数时间，秒
    interval: 0.04, // 显示刷新的时间间隔，秒
  },

  buttonDownOffset: 2, // 按钮按下缩小的值 rpx


  onUnload: function () {
    this.onHide()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    getApp().Player(Player.ArticleServerUrl()+'/bg.mp3')
    getApp().innerAudioContext.onPlay(() => {
      console.log('开始播放')
      that.setData({
        ['data.playing']: true
      })
    })
    getApp().innerAudioContext.onPause(() => {
      console.log('开始播放')
      that.setData({
        ['data.playing']: false
      })
    })
    this.options=options;
    
    // 设置当前页面
    getApp().globalData.wnds.Wnd_Home.SetCurrPage=this
    this.NeedJump1v1PK=false;
    //广播功能测试
    let msg = ['世界四大文明古国之一', '1949年（己丑年）', '10月1日成立 [3-4]  ，以五星红旗为国旗', '新中国成立后，随即开展经', '中华人民共和国陆', '地面积约960万平方公里', '大陆海岸线1.8万多千米']
    // setInterval(() => {
    //   this.setData({
    //     ['data.msg']: msg[randomRange(0, msg.length - 1)]
    //   })
    // }, 2000)
    function randomRange(min, max) {
      let c = max - min + 1;
      return Math.floor(Math.random() * c + min);
    }




    this.setData({
      ['data.model']: getApp().globalData.model,
     
    })
    //广告
    // this.qmcg();
    
    //添加六边形动画
    setTimeout(() => {
      this.setData({
        ['data.grs']: 'grs',
        ['data.sc']: 'sc',
        ['data.zd']: 'zd',
        ['data.dz']: 'dz',
        ['data.ph']: 'ph',
        ['data.cmx']:'cmx',
        ['data.share_animation']: 'share_animation',
        ['data.share_animationa']: 'share_animationa'
      })
    }, 500)
    console.log("#########homePage#########", options)
 //   if (AutoJump("home", options)) return;
    this.counterMoney.lastCount = Player.Money();


   // AppJumpMgr.OnJumpAppSuccess.On(this, this.OnJumpAppSuccess)
  },
  Msg(res){
    console.log("Msg",res)
  },
  //App跳转成功
  OnJumpAppSuccess(){ 
    this.RandomAppJump()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

   // if (AutoJump("home")) return
    console.log("#########homeReady#########")

  },

  //随机选择一个App跳转
  RandomAppJump()  { 
    console.log("随机一个App跳转", AppJumpMgr)
   // AppJumpMgr.Random(2)//随机一个App跳转
    this.setData({ ['data.appjump']: AppJumpMgr.Curr(2) })//设置app跳转信息
    this.setData({ ['data.share_animation']: '' })
    this.setData({ ['data.share_animation']: 'share_animation' })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //this.ServerListv()
    //this.onimg()
    //获取道具列表
    GameConn.Request(
      { n: "goods" }, data => {
        if (data.r == 0) {
          let goods = data.goods;
          goods.forEach(item => {
            item.icon = Player.ArticleServerUrl() + item.icon//gcfg.imgUrl + item.icon
          })
          getApp().globalData.Goods=goods;  
        }
        
 
      })
    this.setData({ ["data.nickName"]: Player.Name() })
    this.setData({ 
      ["data.avatarUrl"]: Player.IconUrl(),
      ['data.Score']: Player.Score ,//金币

      ['data.qcLevel']: Player.Level,
      ['data.LianxuQiandaoCount']: parseInt(Player.LianxuQiandaoCount),
      ['data.TodayGankaoCount']: parseInt(Player.TodayGankaoCount),
      ['data.TodayQiecuo1V1Count']: parseInt(Player.TodayQiecuo1V1Count),
      ['data.TodayQiecuo3V3Count']: parseInt(Player.TodayQiecuo3V3Count),
      ['data.TodayCGCount']: parseInt(Player.TodayCGCount),
      ['data.TodayIsQiandao']: Player.TodayIsQiandao,
      ['data.LevelIcon']: Player.LevelIcon,
      ['data.gkStar']: Player.Level2, //赶考星级
      ['data.gankaoIcon']: Player.GanKaoIcon
      })

    console.log("aaaaadaddddddddddddddddd", Player.IconUrl())
    console.log("aaaaadaddddddddddddddddd", Player.Name())
    
    this.setData({ ['data.datigl']: txt(2051) })

    //this.RandomAppJump()


    //播放客服跳转进入动画
    this.setData({ ['data.share_animationa']: '' })
    this.setData({ ['data.count']: '0' })

    
    this.setData({ ['data.share_animationa']: 'share_animationa' })
  
    // this.options.callBack=()=>{
    //   console.log('=====callback=====')
    //   setTimeout(()=>{
    //     inner.call(this)
    //   },1000)
     
    // }
   if (AutoJump("home", this.options)) return
    // AutoJump("home", this.options)

    this.setData({ ['data.IsVip']:  Player.IsVip})

    this.setData({ ['data.HeadFrame']: Player.HeadFrame }) 
    

    this.OnShowDone()

    setTimeout(() => { this.setData({ ['data.showHome']: false }) })
   
    var op = getApp().globalData.IndexPageOptions
    console.log('op',op)
    if (op.m8) {
      FightRoom.LeaveRoom2(
        (r) => {
          //if(r!=1)
          {
            if (op.m8) {
              console.log("onShow 发起挑战m8")
              FightRoom.StartPK(8, 0, 0, 0, op.m8)
              op.m8 = null
            }
          }
          //else
          {
            //当前正在战斗
            //FightRoom.StartPK(0)
          }
        }
      );
    } else if (op.m9) {
      /*
      setTimeout(()=>{
          FightRoom.Jump3V3()
      },
      1000
      )*/
      FightRoom.LeaveRoom2(
        (r) => {
          //if(r!=1)
          //{ 
          if (op.m9) {
            console.log("onShow 发起挑战m9")
            FightRoom.StartPK(9, 0, 0, 0, op.m9)
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
    else {
      if (FightRoom.LoginFighting) //登录检查到当前正在战斗
      {

        FightRoom.LoginFighting = false

        FightRoom.Fighting = true
        //FightRoom.StartPK(0)
        //FightRoom.LeaveRoom()
        FightRoom.LeaveRoom2(() => { })
      }
      else
        FightRoom.LeaveRoom3(() => { })//自动退出进行中的战斗
    }

    //this._updateHasShareReward();

    setTimeout(() => {
      this._countMoney();
    }, 2000)

    if (this.NeetJump23v3PK) {
      this.NeetJump23v3PK = false
      FightRoom.StartPK(9)
    }
  
    // var animationCloudData = wx.createAnimation({
    //   duration: 1000, // 默认为400     动画持续时间，单位ms
    //   timingFunction: 'linear',
    //   delay: 2000,
    // });
    // animationCloudData.rotate(200).step()
    // this.setData({["data.anim"]: animationCloudData.export()})
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
   *     if (options.target && options.target.dataset)
          {
              if(options.target.dataset.id=="pk1v1")
              {
                  var sharemsg = share.getPKShareMessage(Player.InviteCode)
                  sharemsg.success = ()=>{
                    this.NeedJump1v1PK = true

                  }
                  return sharemsg
              }
          }
   */
  onShareAppMessage: function (options) {
    if (options.from == 'button') {
      if (options.target && options.target.dataset) {
        if (options.target.dataset.id == "pk3v3") {
          var sharemsg = share.getTeamShareMessage(Player.InviteCode)
          sharemsg.success = () => {
            this.NeetJump23v3PK = true
          }
          return sharemsg
        } else if (options.target.dataset.id == "btnShare") {
          return share.getShareContent(options, 2)
        }else if (options.target.dataset.id == "pk1v1") {
          console.log('pk1v1')
          var sharemsg = share.getPKShareMessage(Player.InviteCode)
          sharemsg.success = () => {
            this.NeedJump1v1PK = true

          }
          return sharemsg
        }
      }
      else
      {
        return share.getPTMessage()
      }
    }
    let obj = share.getPTMessage();
    return obj
  },
  onHide() {
    this._isVisible = false
    AppJumpMgr.OnJumpAppSuccess.Off(this.OnJumpAppSuccess)
  },

  // 跳转猜明星
  // OncmxClick(){
  //   console.log("aaaaaaaaaaaaaaaaaaaaa");
  //   AppJumpMgr.Jump() 

  // },
  OnShowDone() {
    this._isVisible = true
    console.log("home关闭世界链接")
    StopFight()
    FightRoom.DoLeaveRoom()

    // an.init(res=>{
    //   console.log(res)
    // })
    //- var indexpage = getApp().globalData.IndexPage
    setTimeout(() => {
      //判断是否有数据
      this.setData({ ['data.show']: Player.IconUrl() != null })
    }, 50)

    this.setData({ ["data.Money"]: Player.Money() })
    this.setData({ ["data.Xuefen"]: Player.Xuefen() })
    this.setData({ ["data.UserName"]: Player.Name() })
    this.setData({ ["data.UserIcon"]: Player.IconUrl() })



    var ol

    //if (NSLoginSys.Online && NSLoginSys.XOnline)
    //{
    //console.log(parseInt(NSLoginSys.XOnline), parseInt(NSLoginSys.Online), Player.Online())
    var tol = Math.max(1, parseInt(Player.Online()))
    ol = tol//parseInt(NSLoginSys.Online) * tol / (tol + parseInt(NSLoginSys.XOnline)) + tol
    //}
    //else
    //  ol = "???"


    this.setData({ ["data.ol"]: ol })
    // indexpage.setData({ [this.wndname + ".ol"]:  parseInt(NSLoginSys.Online) +  parseInt(Player.Online()) })
    if (NSLoginSys.Online) {
      //实例动画
      let timeShow = new TimeAnimation(0, ol)
      //在线人数统计动画显示
      timeShow.init(res => {
        this.setData({ ["data.ol"]: parseInt(res) })
      });
    }

    //分享金币可获得的游戏币
    // this.setData({ ["data.FXMoney"]: Player.FXMoney });
  },
  //猜明星被点击
  OnCmxTouchStart(event) {
    this.setData({ ["data.btncmxScale"]: this.data.data.btnOnClickScale });
  },
  OnCmxTouchEnd(event) {
    setTimeout(() => {
      this.setData({ ["data.btncmxScale"]: 1 });
    }, this.data.data.seconds)
  },
  OnCmxTouchCancel() {
    this.setData({ ["data.btncmxScale"]: 1 });
  },
  OncmxClick(event) {
    console.log("进入单击事件")
    // if (!buttonDisabler.canClick()) return;
    // setTimeout(() => {
      AppJumpMgr.Jumpdati()
      // getApp().globalData.wnds.Wnd_Classify.Show();

    // }, this.data.data.seconds)
  }
  ,
  //话题王被点击
  OnHuatiwangTouchStart(event) {
    this.setData({ ["data.btnHtwScale"]: this.data.data.btnOnClickScale });
  },
  OnHuatiwangTouchEnd(event) {
    setTimeout(() => {
      this.setData({ ["data.btnHtwScale"]: 1 });
    }, this.data.data.seconds)
  },
  OnHuatiwangTouchCancel() {
    this.setData({ ["data.btnHtwScale"]: 1 });
  },
  OnHuatiwangClick(event) {
    if (!buttonDisabler.canClick()) return;
    setTimeout(() => {
      
          getApp().globalData.wnds.Wnd_Classify.Show();
        
    }, this.data.data.seconds)
  },
  //商城点击
  OnShopTouchStart(event) {
    this.setData({ ["data.btnShopScale"]: this.data.data.btnOnClickScale });
  },
  OnShopTouchEnd(event) {
    setTimeout(() => {
      this.setData({ ["data.btnShopScale"]: 1 });
    }, this.data.data.seconds)
  },
  OnShopTouchCancel() {
    this.setData({ ["data.btnShopScale"]: 1 });
  },
  OnShopClick(event) {
    if (!buttonDisabler.canClick()) return;
    console.log(datas.Istz);
    setTimeout(() => {
      Debug.ShowMenu(
        () => {
          getApp().globalData.wnds.Wnd_Shopping.Show();
        }
      )
      
    }, this.data.data.seconds)
  },
  OntzClick(event) {
    if (!buttonDisabler.canClick()) return;
    console.log(datas.Istz);
    setTimeout(() => {
      getApp().globalData.wnds.Wnd_Shopping.Show(null, "Istz=" + datas.Istz);
    }, this.data.data.seconds)
  },
  //组队比赛点击
  OnTeamTouchStart(event) {
    this.setData({ ["data.btnTeamScale"]: this.data.data.btnOnClickScale });
  },
  OnTeamTouchEnd(event) {
    setTimeout(() => {
      this.setData({ ["data.btnTeamScale"]: 1 });
    }, this.data.data.seconds)

  },
  OnTeamTouchCancel() {
    this.setData({ ["data.btnTeamScale"]: 1 });
  },

  OnTeamClick(event) {
    if (!buttonDisabler.canClick()) return
    setTimeout(() => {
      FightRoom.Jump3V3()
    }, this.data.data.seconds)



    /*
    wx.showModal(
        {
            title: "消息",
            content: "敬请期待...",
            showCancel: "false",
            cancelText: "",
            confirmText: "确定",
            confirmColor: "#3cc51f",
            complete: (res) => {
            }
        }
    );*/

  },


  OnPKTouchStart(event) {
    this.setData({ ["data.btnPKScale"]: this.data.data.btnOnClickScale });
  },

  //好友PK点击
  OnPKClick(event) {
    if (!buttonDisabler.canClick()) return;
    
    FightRoom.StartPK(9)
  },
  OnPKTouchEnd(event) {
    setTimeout(() => {
      this.setData({ ["data.btnPKScale"]: 1 });
    }, this.data.data.seconds)
  },
  OnPKTouchCancel() {
    this.setData({ ["data.btnPKScale"]: 1 });
  },

  /*
  onimg() {

    // let imga = Player.ArticleServerUrl() + "/public/uploads/ProblemImg/NetTurn/yuebao/caige.png"
    // this.setData({ ["data.imga"]: imga });

    // let imgb = Player.ArticleServerUrl() + "/public/uploads/ProblemImg/NetTurn/yuebao/ceshi.png"
    // this.setData({ ["data.imgb"]: imgb });

    if (ServerList.JumpQMCG.v) {
      this.setData({ ["data.caixs"]: true });
     this.setData({ ["data.caigexs"]: true });
     this.setData({ ["data.opac"]: 1 });
     
    } else {
      this.setData({ ["data.caixs"]: false });
      this.setData({ ["data.caigexs"]: false });
      this.setData({ ["data.opac"]: 0 });
    }

  },
  */
  morenxs(){

    // if (ServerList.JumpQMCG.v) {
    // for (var a in ServerList.Func) {
    //   console.log("进入猜歌默认方法")
    //   console.log("进入方法")
    //   // let imga = Player.ArticleServerUrl() + "/public/uploads/ProblemImg" + ServerList.Func[a].attributes[4].nodeValue;
    //   this.setData({ ["data.caigexs"]: true });
    //   // this.setData({ ["data.imga"]: imga });
    //   this.setData({ ["data.caixs"]: true })
    //   this.setData({ ["data.opac"]: 1 });
    // }
    }
  // }
  ,
  /*
  ServerListv(){
    if (ServerList.JumpQMCG.v){

      console.log("进入方法")
      var qw0 = []//name数组
      var qw1 = []//appid数组
      var qw2 = []//path数组
      var qw3 = []//quanzhong数组
      var qw4 = []//img数组
      var zqw = 0 //权重总和
      for (var a in ServerList.Func) {
        qw0.push(ServerList.Func[a].attributes[0].nodeValue)
        qw1.push(ServerList.Func[a].attributes[1].nodeValue)
        qw2.push(ServerList.Func[a].attributes[2].nodeValue)
        qw3.push(ServerList.Func[a].attributes[3].nodeValue)
        qw4.push(ServerList.Func[a].attributes[4].nodeValue)

      }
      for (var i = 0; i < qw3.length; i++) {
        zqw += parseInt(qw3[i])

        console.log("zqwzqwzqwzqw:" + qw3[i])
      }
      console.log("zqwzqwzqwzqw:" + zqw)
      //获取随机数
      let mat = Math.floor(Math.random() * zqw) + 1

      for (var i = 1; i < qw3.length; i++) {
        qw3[i] = parseInt(qw3[i - 1]) + parseInt(qw3[i])
        qw3[i] = parseInt(qw3[i])

      }
      console.log("总长度：" + qw3.length)
      //根据获取的随机数判断是哪个广告
      for (var i = 1; i <= qw3.length; i++) {
        if (qw3[i - 1] > mat && mat > 0) {
          console.log("qw3[i-1]：" + qw3[i - 1] + "========0:")
          console.log("随机数：" + mat)
          console.log(i - 1);
          console.log("iiiiiiii:" + (i - 1));
          console.log(qw4[i - 1]);
          console.log(qw1[i - 1]);
          console.log(qw2[i - 1]);
          let imga = Player.ArticleServerUrl() + "/public/uploads/ProblemImg" + qw4[i - 1];
          this.setData({ ["data.imga"]: imga });
          datas.appid = qw1[i - 1]
          datas.path = qw2[i - 1]
          return
        }
        // qw3[i] = qw3[i - 1] + qw3[i]
        if (qw3[i - 1] < mat && mat < qw3[i]) {

          console.log("qw3[i-1]：" + qw3[i - 1] + "========qw3[i]:" + qw3[i])
          console.log("随机数：" + mat)
          console.log(i);

          console.log("iiiiiiii:" + i);
          console.log(qw4[i]);

          console.log(qw1[i]);
          console.log(qw2[i]);
          let imga = Player.ArticleServerUrl() + "/public/uploads/ProblemImg" + qw4[i];

          this.setData({ ["data.imga"]: imga });
          datas.appid = qw1[i]
          datas.path = qw2[i]
          return
        }

      }
    }

  }
 
  , */
  //切换广告方法
  qmcg() {
    AppJumpMgr.Jump(2)
  },

  //排行点击

  OnRankTouchStart(event) {
    this.setData({ ["data.btnRankScale"]: this.data.data.btnOnClickScale });
  },
  OnRankTouchEnd(event) {
    setTimeout(() => {
      this.setData({ ["data.btnRankScale"]: 1 });
    }, this.data.data.seconds)
  },
  OnRankTouchCancel() {
    this.setData({ ["data.btnRankScale"]: 1 });
  },
  OnRankClick(event) {
    if (!buttonDisabler.canClick()) return;
    setTimeout(() => {
      getApp().globalData.wnds.Wnd_Ranking.Show();
    }, this.data.data.seconds)
  },
  //红包赛
  onHongBao(){
    wx.showModal({
      title: '提示',
      content: '暂未开放，敬请期待',
      showCancel:false
    })
    return 
    getApp().globalData.wnds.Wnd_Money.Show()
  },
  _updateHasShareReward() {
    this.setData({ ['data.showShareReward']: share.hasShareReward() });
  },
  //通天塔
  OnTongTianTa(){
    getApp().globalData.wnds.Wnd_TongTianTa.Show()
  },
  //跳转1v1页面
  OnTo1V1(){
    FightRoom.StartPK(8)//1v1好友
   // getApp().globalData.wnds.Wnd_Ready.Show({src:"1v1"})
  },
  _countMoney() {
    let newCount = Player.Money();
    // let newCount = this.counterMoney.lastCount+108;
    let deltaCount = newCount - this.counterMoney.lastCount;

    if (deltaCount === 0) {
      return;
    }

    let countStep = deltaCount * this.counterMoney.interval / this.counterMoney.duration;

    let loop = setInterval(() => {
      this.counterMoney.lastCount += countStep;
      this.counterMoney.lastCount = Math.round(this.counterMoney.lastCount);

      if (this.counterMoney.lastCount < newCount) {
        this.setData({ ["data.Money"]: this.counterMoney.lastCount });
      }
      else {
        this.counterMoney.lastCount = newCount;

        this.setData({ ["data.Money"]: this.counterMoney.lastCount });
        clearInterval(loop);
      }
    }, this.counterMoney.interval * 1000);

  },
  OnShowBtn(){
    if (this.data.data.showBtn)
    {
      this.setData({
        ['data.showBtn']: false
      })
    }
    else
    {
      this.setData({
        ['data.showBtn']: true
      })
    }
    
  },
  //更新签到金币
  OnScore({detail}){
    let {score}=detail;
    this.setData({
      ['data.Score']:score
    })
  },
  OnPlay(){
    if(this.data.data.playing)
    {
      getApp().innerAudioContext.pause()
    }
    else
    {
      getApp().innerAudioContext.play()
    }
    
  }
})

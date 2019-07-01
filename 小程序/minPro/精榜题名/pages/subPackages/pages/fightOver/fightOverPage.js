import { Player } from "../../../../modules/Player.js"
import { FightRoom, StopFight } from "../../../../dati_comm/modules/FightRoom"
import { GameConn, WorldConn } from "../../../../dati_comm/libs/network/Conns.js";
import { AutoJump } from "../../../../dati_comm/modules/LoginJump.js"
import { share } from "../../../../dati_comm/modules/share.js";
import { buttonDisabler } from "../../../../dati_comm/modules/buttonDisabler.js";
import { TimeAnimation } from "../../../../utils/timeAnimation.js";
import { SDataKeyMath } from "../../../../sdata/SDataKeyMath.js"

let qun = 0;
let geren = 0;

let datas = {
  is1v1:true,
  wndname: "fightOver",//窗体名称
  display: false,//block none  
  wndAlpha:1,
  wndPosX:0,
  winv:false,//是否显示胜利图标 
  leftfen:0,//左分数
  rightfen:0,//右分数
  leftliandui:0,//左连对
  rightliandui:0,//右连对
  money:0,//获得的清风币
  xuefen:0,//获得的学分
  FXMoney:1,//分享可获得的金币数
  showShareReward: true, // 是否提示分享有奖励
  mode:1,//比赛模式
  Level2:1,
  //左边角色头像
  leftPly:[
    {
      v:false,//是否显示
      icon:null,//图标 
      name:""//名字
    }, 
    {v:false,icon:null,name:""},
    {v:false,icon:null,name:""}
  ],
  //右边角色头像
  rightPly:[
    {v:false,icon:null,name:""},
    {v:false,icon:null,name:""},
    {v:false,icon:null,name:""}
  ],
  use_bg: {
    w: 260, h: 55, split: [20, 20, 0], img: [
      "../../imgs/comm/d_b_1.png",
      "../../imgs/comm/d_b_2.png",
      "../../imgs/comm/d_b_3.png",
    ]
  },
  seconds:100,
  gradeImg:'',
  is1v1:false,
  level_icon:'',
  qc_count:0,
  level:false,//是否升级
  showHB:false,
  hb:{}
}




Page({
  data:{data:datas},
  onLoad: function (options) {
    this.src = options.src
    qun = Player.Backpack.ShareQunNum;
    // this.setData({
    //   ['data.hb']: {
    //     bg_url: Player.IconUrl(),
    //     qr_url: Player.IconUrl(),
    //     ad_url: Player.IconUrl(),
    //   }
    // })
    this.fenxiang(qun)
    //判断是否是1v1
    wx.showShareMenu({
      withShareTicket: true
    })
    this.setData({
      ['data.is1v1']:options.src=='1v1',
     
    })
    // 页面初始化 options为页面跳转所带来的参数
      if (AutoJump("fightOver", options)) return;
      
  }, 
  onShow:function(){
    if (AutoJump("fightOver")) return
    this.NeedExitFight = true
    console.log("===========NeedExitFight true===================")
    setTimeout(()=>{
      this.setData({
        ['data.Ani_Fight_show']:'Ani_Fight_show',
        ['data.app_user_header_opacity_1v1']:'app_user_header_opacity_1v1',
        ['data.app_tip_opacity_scale_1v1']:'app_tip_opacity_scale_1v1',
        ['data.app_user_score_opacity_1v1']:'app_user_score_opacity_1v1',
        ['data.app_user_xf_1v1_an']:'app_user_xf_1v1_an',
        ['data.app_user_coin_1v1_an']:'app_user_coin_1v1_an',
        ['data.app_repeat_an']:'app_repeat_an',
        ['data.app_jx_an']:'app_jx_an',
        ['data.app_share_btn_an']:'app_share_btn_an'
      })
    },500)
    this.setData({
      ['data.showShareReward']: share.hasShareReward(),
      ['data.Level2']: FightRoom.Chengji.dw_star||1,
      ['data.LevelImg']: Player.LevelImg, // 切磋等级
      ['data.gradeImg']: Player.ArticleServerUrl()+ FightRoom.Chengji.dw_icon //升级图片
      });
   
 
    this.OnShowDone()
  },

   
  onHide:function(){
    // 页面隐藏
    if(this.NeedExitFight)
    {
      console.log("===========fightover onHide LeaveRoom===================")
      FightRoom.LeaveRoom()
    }
  },
  onUnload:function(){
    // 页面关闭
    this.onHide()
  },
  _UpdatePlys()
  { 
   
    this.setData({ ["data.rightPly"]: datas.rightPly  }) 
    this.setData({ ["data.leftPly"] : datas.leftPly  })  
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
    var len = items.length - 1
    if (qun < len) {
      this.setData({ ["data.FXMoney"]: items[qun] })
    } else {
      this.setData({ ["data.FXMoney"]: items[len] })
    }
  },
  _parsePly(cjplys,plylist)
  {
    var i = 0
    for(var uid in cjplys)
    {
      var pinfo = cjplys[uid]
      
      var ply = plylist[i]
      ply.icon = FightRoom.IconUrl(pinfo.face)
      ply.name = pinfo.name
      ply.hf = pinfo.hf
      ply.k = FightRoom.HeadFrameUrl(pinfo.k)
    }
  }, 
  OnShowDone() {
    var cj = FightRoom.Chengji 
    if(!cj) return
    //分数动画
    let left_XF_An = new TimeAnimation();
    //分数动画
    let right_XF_An = new TimeAnimation();
    //连对动画
    let left_LD_An = new TimeAnimation();
    //连对动画
    let right_LD_An = new TimeAnimation();
     //FightRoom.ClearBackTip()
     
    var lp = FightRoom.IsA?cj.aply:cj.bply
    var rp = FightRoom.IsA?cj.bply:cj.aply

    //hf
    //处理头像
    this._parsePly(lp, datas.leftPly)
    this._parsePly(rp, datas.rightPly)
    this._UpdatePlys() 

    this.setData({ ["data.mode"]: FightRoom.CurrMode })
    

    //连对 
     this.setData({ ["data.leftliandui"] :this.TeamLiandui(lp)   })
    // setTimeout(() => {
    //   left_LD_An.init(0, this.TeamLiandui(lp) )
    //   left_LD_An.score = res => {
    //     this.setData({ ["data.leftliandui"]: parseInt(res) })
    //   };
    // }, 2000)
     this.setData({ ["data.rightliandui"] :this.TeamLiandui(rp)   }) 
    // setTimeout(() => {
    //   right_LD_An.init(0, this.TeamLiandui(rp) )
    //   right_LD_An.score = res => {
    //     this.setData({ ["data.rightliandui"]: parseInt(res) })
    //   };
    // }, 2000)
    // this.setData({ ["data.FXMoney"] :Player.FXMoney   })
     

    //左方是否胜利
    var leftIsWin = FightRoom.IsA ? (cj.win == 1) : (cj.win!=1)
    this.setData({ ["data.winv"]:leftIsWin  })
 
    //计算左方玩家总分,和游戏币
    var leftFen = FightRoom.IsA ? cj.afen : cj.bfen 
    this.setData({ ["data.leftfen"]: leftFen })
    
    // setTimeout(()=>{
    //   left_XF_An.init(0, leftFen)
    //   left_XF_An.score = res => {
    //     this.setData({ ["data.leftfen"]: parseInt(res) })
    //   };
    // },2000)
   

    
    //计算右方玩家总分,和游戏币
    var rightFen = FightRoom.IsA ? cj.bfen : cj.afen 
    this.setData({ ["data.rightfen"] :rightFen  })
  
   
    // setTimeout(() => {
    //   right_XF_An.init(0, rightFen)
    //   right_XF_An.score = res => {
    //     this.setData({ ["data.rightfen"]: parseInt(res) })
    //   };
    // }, 2000)
    //获得的清风币 this.setData({ ["data.money"]: parseInt(cj.score)  })
   // var leftyxb = parseInt( cj.yxb )

    this.setData({ ["data.money"]: parseInt(cj.score)})
    //获得的学分
    var leftXuefen = cj.xf||0
    this.setData({ ["data.xuefen"]:leftXuefen  }) 
    //提示升级 Chengji  level_icon:'',qc_count: 0
    console.log(FightRoom.Chengji)
    this.setData({
      ['data.level_icon']: Player.ArticleServerUrl()+ FightRoom.Chengji.level_icon,
      ['data.qc_count']: FightRoom.Chengji.qc_count||0,
      ['data.level']: FightRoom.Chengji.level?true:false,
      ['data.showHB']: FightRoom.Chengji.new_dw ? true : false,
      ['data.hb']: {
        bg_url: Player.ArticleServerUrl() + FightRoom.Chengji.new_dw_hb,
        qr_url: Player.ArticleServerUrl() + FightRoom.Chengji.qr_url,
        ad_url: Player.ArticleServerUrl() + FightRoom.Chengji.ad_url,
      }//Player.ArticleServerUrl()+ FightRoom.Chengji.hb n.bg_url, n.qr_url, n.ad_url
      })


  },
  TeamLiandui(plys)
  {
    var liandui = 0
    var tmpliandui = 0
    for (var i = 0; i < FightRoom.MaxLun; i++) {
        var right = false
        for(var uid in plys)
        {
          if(plys[uid].fff[i]>0)
          {
            right = true
            break
          }
        }
        if (right) 
        { 
          tmpliandui++
          if (tmpliandui > liandui) liandui = tmpliandui
        }  
        else 
          tmpliandui = 0 
    }
    return liandui
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
    setTimeout(()=>{
      this.setData({
        ['data.btnJiexiScale']: 1
      })
    },this.data.seconds)
    
  },
  //再来一局
  OnReFightClick(event)
  {
      if (!buttonDisabler.canClick()) return;

      console.log("===========NeedExitFight false===================")
      this.NeedExitFight = false
      setTimeout(() => {
        FightRoom.RePK()
      }, this.data.seconds)
  },
  //分享按钮动画
  OnShareTouchStart() {

    this.setData({
      ['data.Share']: 0.95
    })
  },
  OnShareTouchEnd() {
    setTimeout(() => {
      this.setData({
        ['data.Share']: 1
      })
    }, this.data.seconds)
  },
  OnBackTouchStart() {

    this.setData({
      ['data.Back']: 0.95
    })
  },
  OnBackTouchEnd() {
    setTimeout(() => {
      this.setData({
        ['data.Back']: 1
      })
    }, this.data.seconds)
  },
  //返回
  OnBack(){
    getApp().globalData.wnds.Wnd_FightOver.back()
    StopFight()
  },
  //炫耀成绩
  OnXuanyaoClick(event)
  {
      if (!buttonDisabler.canClick()) return;
      wx.showShareMenu({
        withShareTicket: true
    })
  },
  OnBackClick(event)
  {  
  },
  OnJiexiClick(event)
  {
      if (!buttonDisabler.canClick()) return;
      setTimeout(() => {
        getApp().globalData.wnds.Wnd_Analysis.Show()
       }, this.data.seconds)
  },
  onShareAppMessage(options) {
      
      // if (options.from == 'button') 
      //   return share.getShareContent(
      //     res => {
      //       var shareTickets = res.shareTickets
      //       if (!shareTickets) {
      //         wx.showModal({
      //           title: '分享提醒',
      //           content: '需要分享到群',
      //           showCancel: false,
      //           confirmText: '确定',
      //           success: function (res) {
      //             GameConn.Request({ n: 'ssc' }, data => {
      //               if (data.r == 0) {
      //               } else {
      //                 wx.showModal({
      //                   title: '分享失败',
      //                   content: '未知错误',
      //                   showCancel: false,
      //                   confirmText: '确定',
      //                   success: function (res) {
      //                   }
      //                 })
      //               }
      //             })
      //           }

      //         })
      //       } else {

      //         wx.getShareInfo({
      //           shareTicket: shareTickets[0],
      //           success: (res) => {
      //             var ediv = {}
      //             ediv.ed = res.encryptedData
      //             ediv.iv = res.iv;
      //             console.log("获取到ediv", ediv)

      //             GameConn.Request({ n: 'sqsc', m: 1, wxg: ediv }, data => {
      //               if (data.r == 0) {
      //                 qun = qun + 1
      //                 this.fenxiang(qun)

      //               } else if (data.r == 1) {

      //                 wx.showModal({
      //                   title: '分享提醒',
      //                   content: '这个群已经分享，请换个群分享',
      //                   showCancel: false,
      //                   confirmText: '确定',
      //                   success: function (res) {
      //                   }
      //                 })
      //               } else {
      //                 wx.showModal({
      //                   title: '分享失败',
      //                   content: '未知错误',
      //                   showCancel: false,
      //                   confirmText: '确定',
      //                   success: function (res) {
      //                   }
      //                 })
      //               }
      //             })
      //           }
      //         })

      //       }

      //     },5)
      // else
    // if (this.src=='1v1')
    // {

    // }
    // else
    // {
      
    // }
    return share.getCommonShareContent(options); 
       

  },
})

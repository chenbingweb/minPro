// pages/classify/classifyPage.js
import { Player } from "../../modules/Player" 
import { SDataQuestion } from "../../dati_comm/sdata/SDataQuestion"
import { SDataBisai } from "../../dati_comm/sdata/SDataBisai"
import { FightRoom, StopFight } from "../../dati_comm/modules/FightRoom"
import { GameConn, WorldConn } from "../../dati_comm/libs/network/Conns";
import { AutoJump } from "../../dati_comm/modules/LoginJump" 
import {share} from "../../dati_comm/modules/share";
import {buttonDisabler} from "../../dati_comm/modules/buttonDisabler";
import { SDataKeyMath } from "../../sdata/SDataKeyMath.js"
import * as gcfg from "../../gamecfg"
let Wnd_Classify
let datas = {
  dwItems:[],//段位等级
  wndname: "classify",//窗体名称
  IsVip:0,//头像框id
  display: false,//block none
  scrollTop:100, 
  wndAlpha: 1,
  wndPosX: 0,
  items: [],//分类条目
  zhqfb: 0,//综合话题需要的清风币
  xuefen: 0,//学分
  qfb: 0,//清风币
  plyIcon: "",//角色图标
  plyName: "",//角色名
  inter_bg: {
    w: 260, h: 56, split: [20, 25, 0], img: [
      "../../imgs/comm/d_b_1.png",
      "../../imgs/comm/d_b_2.png",
      "../../imgs/comm/d_b_3.png",
    ]
  },
  showHome:true,
  back_btn_active:'',
  currentLevel:{},
  st:0,
  Score:0,
  gkStar:1,
  UserName:'',
  qcLevel:'',
  LianxuQiandaoCount: 0,//签到次数
  TodayGankaoCount: 0,
  TodayQiecuo1V1Count: 0,
  TodayQiecuo3V3Count: 0,
  TodayCGCount: 0,
  TodayIsQiandao:'',
  gankaoIcon:''
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: datas
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // if (AutoJump("classify", options)) return
    Wnd_Classify = getApp().globalData.wnds.Wnd_Classify
    this.OnNewInstance()
    setTimeout(()=>{
      this.setData({
        ['data.back_btn_active']:'back_btn_active',
        ['data.classify_page_An']:'classify_page_An',
      })
    },500)
    console.log(Player.Level1, Player.Level2)
   
  
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (AutoJump("classify")) return
    this.setData({
      ['data.dwItems']:[],
      ['data.Score']:Player.Score,
      ['data.gkStar']: Player.Level2,
      ['data.UserName']:Player.Name(),
      ['data.qcLevel']: Player.Level,
      ['data.LianxuQiandaoCount']: parseInt(Player.LianxuQiandaoCount),
      ['data.TodayGankaoCount']: parseInt(Player.TodayGankaoCount),
      ['data.TodayQiecuo1V1Count']: parseInt(Player.TodayQiecuo1V1Count),
      ['data.TodayQiecuo3V3Count']: parseInt(Player.TodayQiecuo3V3Count),
      ['data.TodayCGCount']: parseInt(Player.TodayCGCount),
      ['data.TodayIsQiandao']: Player.TodayIsQiandao,
      ['data.LevelIcon']: Player.LevelIcon,
      ['data.gankaoIcon']: Player.GanKaoIcon
    })
    GameConn.Request(
      { n: "gk" },
      (data) => {
        console.log(data)
        let dwItems = [];
        data.dw.forEach(item=>{
          console.log(item)
            if(item.n!=='0')
            {
              dwItems.push({
                mp: item.mp,
                id: item.id,
                img: gcfg.imgUrl + item.img,
                Level1: Player.Level1,
                Level2: Player.Level2 //当前星级数
              })
              if (parseInt(Player.Level1)==item.id)
              {
                this.setData({
                  ['data.currentLevel']: {
                    win:item.win,
                    mp: item.mp,
                    id: item.id,
                    star: item.star,
                    img: gcfg.imgUrl + item.img,
                    Level1: Player.Level1,
                    Level2: Player.Level2 //当前星级数
                  }
                })
              }
            }
            
        })
        console.log('段位：',dwItems)
        let me=this;
         this.setData({
           ['data.dwItems']: dwItems.reverse()
         },()=>{
           const query = wx.createSelectorQuery()
           query.select('.scroll_box_1').boundingClientRect()

           query.exec(res=> {
             console.log(res)
             me.setData({
               ['data.st']: res[0].height
             })
           })
         })
      }
    )

    this.setData({ ['data.IsVip']: Player.IsVip })
    this.setData({ ['data.HeadFrame']: Player.HeadFrame }) 
    

    //FightRoom.AutoShowBackTip()

    console.log("关闭世界链接")
   
    this.setData({ ["data.qfb"]: Player.Money() })
    this.setData({ ["data.Xuefen"]: Player.Xuefen() })

    var zhimg = Player.ArticleServerUrl().MergePath(  "/public/uploads/ProblemImg/").MergePath(  "Icon/Huatiwangfree/zonghe1.png" )
    this.setData({ ["data.zongheimg"]: zhimg})
 

    StopFight()
    FightRoom.DoLeaveRoom()
    /***/

    // var dwdata = getApp().globalData.wnds.Wnd_Match.dwdata//段位相关信息
    // this.data.dwItems = []

    // /*
    // for(var i=0;i<dwdata.dw.length;i++)
    // {
    //   var dwinfo = dwdata.dw[i]
    //   for(var ii=0;ii<dwinfo.l;ii++)
    //   {

    //   }
    // }*/
    // var xingcount = dwdata.dw[Player.Level1 - 1].x
    // var level2count = dwdata.dw[Player.Level1 - 1].l
    // var menpiao = dwdata.dw[Player.Level1 - 1].mp
    // var xing = []
    // var kongxing = []
    // for (var i = 0; i < Player.Level3; i++) xing.push(1)
    // for (var i = 0; i < xingcount - Player.Level3; i++) kongxing.push(1)
    // this.data.dwItems.push(
    //   {
    //     Level1: Player.Level1,
    //     Level2: level2count - Player.Level2 + 1,
    //     xing: xing,
    //     kongxing: kongxing,
    //     menpiao: menpiao
    //   }
    // )
    // console.log(this.data.dwItems)
    // //xing
    // //kongxing
    // //Level1
    // //Level2
    // this.setData({ ["data.dwItems"]: this.data.dwItems })
    /***/

     if( this.NeedJump1v1PK)
      {
          this.NeedJump1v1PK = false 
          FightRoom.StartPK( 8 )//1v1好友
      }  
  },
  onReady: function () {
    this.setData({
      ['data.showHome']: false
    }) 

   
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.hideLoading()
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

      if (options.from == 'button') {
          if (options.target && options.target.dataset) 
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
      }

      return share.getCommonShareContent(options);
  },
  OnNewInstance() {

    var rootQuest = SDataQuestion.RootQuest
    for (var i = 0; i < rootQuest.length; i++) {
      var row = rootQuest[i]

      //if(row[SDataQuestion.I_IsBisai]==2) continue

      var item = {
        title: row[SDataQuestion.I_IsBisai] == 2 ? "" : row[SDataQuestion.I_Tag],
        id: row[SDataQuestion.I_ID],
        icon: Player.ArticleServerUrl().MergePath(  "/public/uploads/ProblemImg/").MergePath(  row[SDataQuestion.I_Icon]),
        qfb: SDataBisai.Fenlei1v1[SDataBisai.I_Menpiao]
      }
      this.data.data.items.push(item)
    }
    console.log(this.data.data.items)
    //更新分类数据
    this.setData({ ["data.items"]: this.data.data.items })
    this.setData({ ["data.zhqfb"]: SDataBisai.Zonghe1v1[SDataBisai.I_Menpiao] })

    this.setData({ ["data.xuefen"]: Player.Xuefen() })
    this.setData({ ["data.qfb"]: Player.Money() })

    this.setData({ ["data.plyIcon"]: Player.IconUrl() })
    this.setData({ ["data.plyName"]: Player.Name() })
  },
  OntazClick(){
    if (!buttonDisabler.canClick()) return;
    console.log(datas.Istz);
    setTimeout(() => {
      getApp().globalData.wnds.Wnd_Shopping.Show(null, "Istz=" + datas.Istz);
    }, this.data.data.seconds)
  },
  //分类被点击
  OnItemClick(event) {
    //this.setData({ ['data.scrollTop']: 500 })  return

    if (!buttonDisabler.canClick()) return;
    var dataset = event.currentTarget.dataset;
    var id = dataset.id
    var row = SDataQuestion.GetRow(id)

    if (row[SDataQuestion.I_IsBisai] == 2) return

    // wx.showLoading({
    //   title: '跳转中...',
    //   mask: true
    // })
    FightRoom.StartPK(7)

    //FightRoom.StartPK(7,0,Math.round(id))
  },
  //综合被点击

  OnZongheClick(event) {
      if (!buttonDisabler.canClick()) return;
    //   wx.showLoading({
    //   title: '跳转中...',
    // })

    FightRoom.StartPK(6)

  },
  //返回按钮
  OnCloseClick(event) {
      if (!buttonDisabler.canClick()) return;

      //var indexpage = getApp().globalData.IndexPage
    Wnd_Classify.back()
  //  Wnd_Classify.Hide(1, WndAnimManager.upperSlideOut)
   // indexpage.wnds.Wnd_Home.Show(WndAnimManager.lowerSlideIn)
  },
  //更新签到金币
  OnScore({ detail }) {
    let { score } = detail;
    this.setData({
      ['data.Score']: score
    })
  }
})

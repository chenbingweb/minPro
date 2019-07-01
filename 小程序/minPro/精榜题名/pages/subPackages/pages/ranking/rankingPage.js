// pages/ranking/rankingPage.js
import { Player } from "../../../../modules/Player.js"  
import { GameConn, WorldConn } from "../../../../dati_comm/libs/network/Conns.js";
import { AutoJump } from "../../../../dati_comm/modules/LoginJump.js"
import { share } from "../../../../dati_comm/modules/share.js";
import * as JSHelper from "../../../../dati_comm/modules/JSHelper"
import { FightRoom } from "../../../../dati_comm/modules/FightRoom"
import { buttonDisabler } from "../../../../dati_comm/modules/buttonDisabler.js";

let datas = {
  wndname: "ranking",//窗体名称
  display: false,//block none  
  wndAlpha: 1,
  wndPosX: 0,
  show_shadow: false,//滚动条阴影
  items: [],
  selfIdx:-1,
  line_bg: {
    w: 750, h: 1212, split: [13, 11, 12, 12], img: [
      "../../imgs/ranking/r_d_1.png",
      "../../imgs/ranking/r_d_2.png",
      "../../imgs/ranking/r_d_3.png",
      "../../imgs/ranking/r_d_4.png",
      "../../imgs/ranking/r_d_5.png",
      "../../imgs/ranking/r_d_6.png",
      "../../imgs/ranking/r_d_7.png",
      "../../imgs/ranking/r_d_8.png",
      "../../imgs/ranking/r_d_9.png",
    ]
  },
  time_bg: {
    w: 430, h: 34, split: [28, 34, 28], img: [
      "../../imgs/ranking/t_d_1.png",
      "../../imgs/ranking/t_d_2.png",
      "../../imgs/ranking/t_d_3.png"
    ]
  },
  y_d_bg: {
    w: 270, h: 36, split: [72, 72, 0], img: [
      "../../imgs/ranking/y_d_1.png",
      "../../imgs/ranking/y_d_2.png",
      "../../imgs/ranking/y_d_3.png"
    ]
  },
  y_d_bg_1: {
    w: 176, h: 36, split: [72, 72, 0], img: [
      "../../imgs/ranking/y_d_1.png",
      "../../imgs/ranking/y_d_2.png",
      "../../imgs/ranking/y_d_3.png"
    ]
  },
  lable_bg: {
    w: 200, h: 43, split: [17, 17, 0], img: [
      "../../imgs/ranking/la_db_1.png",
      "../../imgs/ranking/la_db_2.png",
      "../../imgs/ranking/la_db_3.png"
    ]
  },
  coin_bg: {
    w: 180, h: 32, split: [0, 30, 0], img: [
      "../../imgs/ranking/ch_db_1.png",
      "../../imgs/ranking/ch_db_2.png"
    ]
  },
  lable_bg_2: {
    w: 138, h: 32, split: [17, 17, 0], img: [
      "../../imgs/ranking/la_db_1.png",
      "../../imgs/ranking/la_db_2.png",
      "../../imgs/ranking/la_db_3.png"
    ]
  },
  list_bg: {
    w: 138, h: 32, split: [32, 21, 0], img: [
      "../../imgs/ranking/c_db_1.png",
      "../../imgs/ranking/c_db_1.png",
      "../../imgs/ranking/c_db_2.png",
    ]
  },
  scroll_bg: {
    width: 702, h: 34, split: [26, 36, 0], img: [
      "../../imgs/ranking/scroll_yy.png",
      "../../imgs/ranking/scroll_yy.png",
      "../../imgs/ranking/scroll_yy.png"
    ],

  },
  worldRank:[],
  friendRank:[],
  isWorldFlag:true,
  isFriendFlag:false,
  ranks:0,
  list:[],
  rankf:0,
  rank:0,
  userIcon: Player.Iconurl
}

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
    if (AutoJump("ranking", options)) return
    setTimeout(()=>{
      this.setData({
        ['data.Ani_show']:'Ani_show',
        ['data.userIcon']: Player.Iconurl
      })
    },500)
    //世界排行
    GameConn.Request({ n: 'slist' }, res => {
      if(res.r==0){
        datas.worldRank= res.list;
        datas.ranks = res.rank;
        res.list.forEach(item=>{
          item.dw_icon = Player.ArticleServerUrl() + item.dw_icon,
            item.arr = new Array(item.dw_star);
          item.noArr = new Array(8 - item.dw_star)
        })
        this.setData({
          ['data.rank']:res.rank,
          ['data.list']:res.list,
          ['data.userIcon']: Player.Iconurl
        })
      }
    })
    //好友排行
    GameConn.Request({ n: 'flist' }, res => {
      if (res.r == 0) {
        res.list.forEach(item => {
          item.dw_icon = Player.ArticleServerUrl() + item.dw_icon;
          item.arr = new Array(item.dw_star);
          item.noArr = new Array(8 - item.dw_star)
        })
        datas.friendRank = res.list;
        datas.rankf = res.rank;
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (AutoJump("ranking")) return
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //this.OnShowDone()
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
  onShareAppMessage: function (options) {
      return share.getCommonShareContent(options,true);
  },
  OnNewInstance() {
  //  var indexpage = getApp().globalData.IndexPage
    //绑定关闭事件
   // indexpage.BindClick(this.wndname, "OnCloseClick", this.OnCloseClick)
  },
  OnCloseClick(event) {
    //var indexpage = getApp().globalData.IndexPage
    //indexpage.wnds.Wnd_Home.Show()
    //indexpage.wnds.Wnd_Ranking.Hide()
  },
  OnShowDone() {
    var indexpage = getApp().globalData.IndexPage

    GameConn.Request({ n: "flist" },
      (data) => {
        this.Parseflist(data)
      }
    )

  },

  Parseflist(data) {
    console.log("",data)
    if (data.r != 0) return

    datas.items = []
    // var fen = 100
    var list = data.l;
    //for(var x=0;x<3;x++)
    for (var i = 0; i < list.length; i++) {
      var curData = list[i]
      // fen = parseInt(   Math.random() * 9999) 
      //curData.hf = 1
      var phitem = {
          title: curData.dwn,//段位名
          city: "北京",
          name: curData.n,
          lv1: curData.lv1,
          lm: JSHelper.LuoMa(curData.mlv2, curData.lv2 ) ,
          lv3: curData.lv3,
          lv3star: new Array(curData.lv3),
          icon: curData.icon, 
          vip: curData.hf,
          win: curData.win,//胜场总数
          lose:curData.lose,//败场总数 
          cwin:curData.cwin,//最大连胜总数
          k:FightRoom.HeadFrameUrl(curData.k),//头像框
        }

      //段位对排名的影响
      var dw = curData.lv1 * 100 + curData.lv2 * 10 + curData.lv3

      //胜率对排名的影响
      var sl =  curData.win+curData.lose==0?0:(curData.win/(curData.win+curData.lose))
      var shenglv = parseInt(  sl*100000 )//胜率转换为整数形式

      //段位和胜率综合影响
      phitem.dw_sl = dw*1000000+sl

      //胜利次数和连胜次数综合影响
      phitem.win_cwin =  curData.win * 100000 + curData.cwin

      datas.items.push(phitem)

 

       // console.log(curData.n,curData.lv1 ,curData.lv2 ,curData.lv3,phitem.dw)
    }
    //this.items 按照money排序
    
    //datas.items.sort((a, b) => { return  b.dw - a.dw  })
    var items = datas.items
    var len = items.length
    for(var i=0;i<len-1;i++) 
    {
      var aidx = i
      for(var i2=i+1;i2<len;i2++) 
      {
        var a = items[aidx]
        var b = items[i2]
        if(b.dw_sl>a.dw_sl)//B 段位_胜率 综合影响比A大
        {
         aidx = i2//需要交换
        }else if(b.dw_sl==a.dw_sl) //A B 段位_胜率 一样
        {
          if(b.win_cwin>a.win_cwin)//B 胜场_连胜 综合影响比A大
           aidx = i2//需要交换
        }
      }

      if(aidx!=i)//产生了交换
      {
          //执行交换
          var z = items[i]
          items[i] = items[aidx]
          items[aidx] = z
      }
    }


    for (var i = 0; i < datas.items.length; i++) {
      if (datas.items[i].name == Player.Name()) {
        datas.selfIdx = i
        break
      }
    }

 //   var indexpage = getApp().globalData.IndexPage
    this.setData({ ["data.items"]:datas.items })
    this.setData({ ["data.selfIdx"]: datas.selfIdx }) 
  },
  //返回
  OnBack() {
    if (!buttonDisabler.canClick()) return;
    getApp().globalData.wnds.Wnd_Ranking.back()
  },
  OnRank({currentTarget}){
    /*
     worldRank:[],
    friendRank:[]
    */

    let { rank, isworld}=currentTarget.dataset;
 
   
    if (rank =='slist')
    {
      this.setData({
        ['data.rank']: datas.ranks,
        ['data.list']: datas.worldRank,
        ['data.isWorldFlag']: true,
        ['data.isFriendFlag']: false
      })
    }
    else
    {
      this.setData({
        ['data.rank']: datas.rankf,
        ['data.list']: datas.friendRank,
        ['data.isWorldFlag']: false,
        ['data.isFriendFlag']: true
      })
    }
  }
})
import {Player} from "../../modules/Player"
import {FightRoom} from "../../dati_comm/modules/FightRoom"
import {GameConn, WorldConn} from "../../dati_comm/libs/network/Conns";
import {share} from "../../dati_comm/modules/share";
import { AutoJump } from "../../dati_comm/modules/LoginJump"
import {buttonDisabler} from "../../dati_comm/modules/buttonDisabler";

import { SDTips } from "../../sdata/SDTips";
let datas = {
    wndname: "ready",//窗体名称
    display: false,//block none 
    wndAlpha: 1,
    wndPosX: 0,
    items:[],

    plylevel1: null,
    plylevel2: null,
    plylevel3: null,
    waittxtv: false,//准备挑战
    fangqiv: false,//放弃data
    startv: false,//挑战开始
    yqhaoyou: false,//邀请好友
    showStart: false,//是否显示开战
    readytxtv: false,//准备挑战
    PlyCount:1,//单边角色总数

    //绑定数据
    leftPly: [
        {
            v: true,
            icon: null,//图标
            name: "",//名字
            
        },
        {
          v: true,
            icon: null,//图标
            name: "",//名字
        },
        {
          v: true,
            icon: null,//图标
            name: "",//名字
        },
    ],
    rightPly: [
      { v: true, icon: null, name: ""},
      { v: true, icon: null, name: ""},
      { v: true, icon: null, name: ""},
    ],

    //绑定数据end

    q_type: {
        w: 314, h: 78, split: [52, 52, 0], img: [
            "../../imgs/fight/q_d_3.png",
            "../../imgs/fight/q_d_2.png",
            "../../imgs/fight/q_d_1.png",
        ]
    },
    //图片地址
    srcArr: ['../../imgs/fight/wait_1.png', '../../imgs/fight/wait_2.png', '../../imgs/fight/wait_3.png', '../../imgs/fight/wait_4.png'],
    waiteHeater: [
        '../../imgs/fight/h_1.png',
        '../../imgs/fight/h_2.png',
        '../../imgs/fight/h_3.png',
        '../../imgs/fight/h_4.png',
        '../../imgs/fight/h_5.png',
        '../../imgs/fight/h_6.png',
    ],
    an_1: null,
    play_1:false,
    is_1V1:false,//是否是1v1
    mp:0,
    Level1:1,//等级
    Level2: 1, //当前星级数,
    show3v3Page:false,
    countdown:'10:00',
    gankaoIcon: '',
    gkStar:new Array(1),//赶考星
  gkStarNum: new Array(1).length,
    noStarNum:[],//空星
    LevelName:'',//切磋等级
   LevelIcon:'',//切磋icon
   pding:false,
   pdsucc:false
};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        data: datas
    },



    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    //onReady: function () {
    //    if (AutoJump("ready")) return

    //},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      var plylevel1 = Player.Level1
      var plylevel2 = Player.Level2
      var plylevel3 = Player.Level3
      console.log("plylevel1plylevel1plylevel1plylevel1", plylevel1)
      console.log("plylevel1plylevel1plylevel1plylevel1", plylevel2)
      console.log("plylevel1plylevel1plylevel1plylevel1", plylevel3)
      var plylevel4 = { level1: plylevel1, level2: plylevel2, level3: plylevel3 };
      module.exports.plylevel4 = plylevel4;
        //if (AutoJump("ready")) return
        //动画
        setTimeout(()=>{
          this.setData({
            ['data.top_VS']:'top_VS',
            ['data.play_1']: true,
            
          })
        },500)
      
       AutoJump("ready")

        this.NeedExitFight = true

        this._BindEvts()
        this.OnShowDone()
        this.OnJoin()
        this.OnLeave()
        this.OnStart()
        this.OnFightReady()
        this.OnEnterRoom()

    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    let {src}=options;
    this.src=src||'';
   // if (AutoJump("ready", options)) return
    AutoJump("ready", options)
    if (this.src=='1v1')
    {
      this.setData({
        ['data.is_1V1']:true,
        ['data.gkStar']: new Array(Player.Level2), //赶考星级
        ['data.LevelName']: Player.LevelName,
        ['data.LevelIcon']: Player.LevelIcon,
        ['data.mp']: getApp().globalData.wnds.Wnd_Ready.info.mp || 0
        
      })
      getApp().globalData.wnds.Wnd_Ready.SetCurrPage = this;
      getApp().globalData.wnds.Wnd_Ready.stopCountDown()
      getApp().globalData.wnds.Wnd_Ready.CountDown()
      
    }
    else if(this.src=='3v3')
    {
      this.setData({
        show3v3Page:true,
        ['data.mp']: getApp().globalData.wnds.Wnd_Ready.info.mp || 0
      })
      getApp().globalData.wnds.Wnd_Ready.SetCurrPage = this;
      getApp().globalData.wnds.Wnd_Ready.stopCountDown()
      getApp().globalData.wnds.Wnd_Ready.CountDown()
    }
    else
    {
      try{
        //获取赶考信息
        let dw = getApp().globalData.wnds.Wnd_Ready.info.dwItems;
        this.setData({
          ['data.mp']: getApp().globalData.wnds.Wnd_Ready.info.mp || '',
          ['data.noStarNum']: new Array(dw.star - Player.Level2),
          ['data.gkStarNum']: new Array(Player.Level2).length
        })
      }catch(e){

      }
      console.log(getApp().globalData.wnds.Wnd_Ready.info)
      this.setData({
        ['data.gkStar']: new Array(Player.Level2), //赶考星级
        ['data.gankaoIcon']: Player.GanKaoIcon
      })
    }
    console.log(' Player.Level2', Player.Level2)
    console.log('Player.GanKaoIcon', Player.GanKaoIcon)
    
    
   


    for (var i = 0; i < 3; i++) {
      datas.leftPly[i].v = false
      datas.rightPly[i].v = false
    }
    this._UpdatePlys()
    this.ontips()
  },
  offEvts: function () { 
    FightRoom.EvtReady.Off(this.OnFightReady)
    FightRoom.EvtStart.Off(this.OnStart)
    FightRoom.EvtAJoin.Off(this.OnAJoin)
    
    FightRoom.EvtJoin.Off(this.OnJoin)
    FightRoom.EvtLeave.Off(this.OnLeave) 
    FightRoom.EvtEnterRoom.Off(this.OnEnterRoom) 
  },
  onUnload: function () {
    //this.offEvts()
    this.onHide()
  },
   onHide()
   { 
    
     this.offEvts()
     for (var i = 0; i < 3; i++) {
       datas.leftPly[i].v = false
       datas.rightPly[i].v = false
     }
     this._UpdatePlys();

     if(this.NeedExitFight)
     { 
       //关闭计时器
       getApp().globalData.wnds.Wnd_Ready.stopCountDown()
       FightRoom.LeaveRoom()
     }


     //重置
     datas = {
       wndname: "ready",//窗体名称
       display: false,//block none 
       wndAlpha: 1,
       wndPosX: 0,

       waittxtv: false,//准备挑战
       fangqiv: false,//放弃data
       startv: false,//挑战开始
       yqhaoyou: false,//邀请好友
       readytxtv: false,//准备挑战
       PlyCount: 1,//单边角色总数

       //绑定数据
       leftPly: [
         {
           v: true,
           icon: null,//图标
           name: "",//名字
         },
         {
           v: true,
           icon: null,//图标
           name: "",//名字
         },
         {
           v: true,
           icon: null,//图标
           name: "",//名字
         },
       ],
       rightPly: [
         { v: true, icon: null, name: "" },
         { v: true, icon: null, name: "" },
         { v: true, icon: null, name: "" },
       ],

       //绑定数据end

       q_type: {
         w: 314, h: 78, split: [52, 52, 0], img: [
           "../../imgs/fight/q_d_3.png",
           "../../imgs/fight/q_d_2.png",
           "../../imgs/fight/q_d_1.png",
         ]
       },
       //图片地址
       srcArr: ['../../imgs/fight/wait_1.png', '../../imgs/fight/wait_2.png', '../../imgs/fight/wait_3.png', '../../imgs/fight/wait_4.png'],
       waiteHeater: [
         '../../imgs/fight/h_1.png',
         '../../imgs/fight/h_2.png',
         '../../imgs/fight/h_3.png',
         '../../imgs/fight/h_4.png',
         '../../imgs/fight/h_5.png',
         '../../imgs/fight/h_6.png',
       ],
       an_1: null
     };
   },

    /**
     * 用户点击右上角分享
    */
  onShareAppMessage: function (options) {
        this.NeedExitFight = false
    
        // if(FightRoom.CurrMode==9)//3v3模式
        //     return share.getTeamShareMessage(FightRoom.InviteCode)
        // else//1v1模式
        //     return share.getPKShareMessage(FightRoom.InviteCode);
      let me=this
      if (options.from == 'button') {
        if (options.target && options.target.dataset) {
          if (options.target.dataset.id == "pk1v1") {
            var sharemsg = share.getPKShareMessage(Player.InviteCode)
           
           
            sharemsg.success = () => {
              // FightRoom.StartPK(8)//1v1好友
              //this.NeedJump1v1PK = true
              // this.setData({
              //   info: 'share=true&m8=' + Player.InviteCode
              // })
            }
            return sharemsg
          }
        }
        if (FightRoom.CurrMode == 9)//3v3模式
        {
          this.setData({
            info: 'share=true&m9=' + FightRoom.InviteCode
          })
          return share.getTeamShareMessage(FightRoom.InviteCode)
        }
      }

      return share.getCommonShareContent(options);
    },

  _SetEmptyPly(ply)
  {
    ply.v = true
    ply.icon = null
    ply.name = "..."
    ply.uid = ""
  },
  OnShowDone() {
    
    FightRoom.CurrPairWnd = this;

    //var pagetitle =   getApp().globalData.FightTitle
 
    var pagetitle = ""
    switch(FightRoom.CurrMode)
    {
      case 4:
        pagetitle = "组队赛-个人"
        break
      case 6:
        pagetitle = "综合题"
        break
      case 7:
        pagetitle = ""//row[SDataQuestion.I_Tag]
        break
      case 8:
        pagetitle = "好友对战"
        break
      case 9:
        pagetitle = "组队赛-好友"
        break
    }
    wx.setNavigationBarTitle({ title: pagetitle })

    //显示我方图标
    /*
    Level1: Player.Level1,//等级
    Level2: Player.Level2 //当前星级数
    */
    datas.leftPly[0].v = true
    datas.leftPly[0].icon = Player.IconUrl()
    datas.leftPly[0].name = Player.Name()
    datas.leftPly[0].hf = Player.IsVip 
    datas.leftPly[0].k = Player.HeadFrame
    datas.leftPly[0].Level1 = Player.Level1;
    datas.leftPly[0].Level2 = new Array(Player.Level2) 

    //显示对方图标
    this._SetEmptyPly(datas.rightPly[0])
    this.setData({ ["data.PlyCount"]: FightRoom.Is3V3?3:1 })
    // this.setData({ ["data.PlyCount"]: 3 })

    if(FightRoom.Is3V3)
    { 
      for(var i=1;i<3;i++)
      {
        this._SetEmptyPly(datas.leftPly[i])
        this._SetEmptyPly(datas.rightPly[i])
      }
    }else
    { 
      for (var i = 1; i < 3; i++) {
         datas.leftPly[i].v = false
         datas.rightPly[i].v = false
      }
    }

    for (var i = 0; i < 3; i++) {
      datas.leftPly[i].gifwait = !FightRoom.IsYaoQing
      datas.rightPly[i].gifwait= true
    }

    this._UpdatePlys()

    this._HideAllST()
    setTimeout(()=>{
      this.setData({ ["data.waittxtv"]: true })
    },500)
   
    this.setData({["data.fangqiv"]: true})

    //根据模式确定需要显示的界面
    this.setData({["data.yqhaoyou"]:FightRoom.IsYaoQing })  //邀请好友

    this.setData({["data.showStart"]:false }) //隐藏开始战斗按钮
    
  }, 
  _UpdatePlys() {
      this.setData({["data.rightPly"]: datas.rightPly})
      this.setData({["data.leftPly"]: datas.leftPly})
      // this._UpdateRightPlys()
  },



  _HideAllST() {
      this.setData({["data.waittxtv"]: false})
      this.setData({["data.fangqiv"]: false})
      this.setData({["data.startv"]: false})
      this.setData({["data.readytxtv"]: false})
  },   
  _BindEvts() {
    this.offEvts() 
    FightRoom.EvtReady.On(this, this.OnFightReady)
    FightRoom.EvtStart.On(this, this.OnStart) 
    FightRoom.EvtAJoin.On(this,this.OnAJoin)
    FightRoom.EvtJoin.On(this, this.OnJoin)
    FightRoom.EvtLeave.On(this,this.OnLeave) 
    FightRoom.EvtEnterRoom.On(this,this.OnEnterRoom) 
  },
  _JoinPly(plyList,ply,isLeft){
    var uid = ply.uid
    var name = ply.name
    for (var i = 0; i < plyList.length; i++) {
      if (
        plyList[i].uid==uid||
        plyList[i].name==name
      )  return//重复添加
    }

    for (var i = 0; i < plyList.length; i++)
    {
      if (plyList[i].icon == null)
      {
        plyList[i].name = ply.name
        plyList[i].icon = ply.icon
        plyList[i].uid = ply.uid
        plyList[i].hf = ply.hf
        plyList[i].k = ply.k
        return
      }
    }
  },
  OnFightReady() {
      if (FightRoom.Step < FightRoom.RoomStep.Ready) return

      //设置双方头像
      for (var i = 0; i < FightRoom.LeftPlys.length; i++) {
          var ply = FightRoom.LeftPlys[i]
          this._JoinPly(datas.leftPly, {uid:ply.uid, name: ply.name,icon: ply.iconurl,hf:ply.hf,k:ply.k},true)
      }
 
      this._UpdateRightPlys()
      this._HideAllST()
      this.setData({["data.readytxtv"]: true})
  }, 

  _UpdateRightPlys() {
    let index = 0
    let arr = []
    let len = FightRoom.RightPlys.length
    setTimeout(_ =>{
      var ply = FightRoom.RightPlys[index]
      this._JoinPly(datas.rightPly, { uid: ply.uid, name: ply.name, icon: ply.iconurl, hf: ply.hf,k:ply.k },false)
      this._UpdatePlys()
      var plyAnim1 = wx.createAnimation({
        duration: 300,
        timingFunction: 'linear',
        // delay: 100,
      });
      plyAnim1.translateX(-50).step()
      this.setData({["data.ra1"]: plyAnim1.export()})
       ++index
       if (index >= len) {
        return
       }
      setTimeout(_ =>{
        var ply = FightRoom.RightPlys[index]
        this._JoinPly(datas.rightPly, { uid: ply.uid, name: ply.name, icon: ply.iconurl, hf: ply.hf,k:ply.k},false)
        this._UpdatePlys()
        var plyAnim2 = wx.createAnimation({
          duration: 300,
          timingFunction: 'linear',
          delay: 100,
        });
        plyAnim2.translateX(-50).step()
        this.setData({["data.ra2"]: plyAnim2.export()})
        ++index
        if (index >= len) {
          return
        }
        setTimeout(_ =>{
          var ply = FightRoom.RightPlys[index]
          this._JoinPly(datas.rightPly, { uid: ply.uid, name: ply.name, icon: ply.iconurl, hf: ply.hf ,k:ply.k},false)
          this._UpdatePlys()
          var plyAnim3 = wx.createAnimation({
            duration: 300,
            timingFunction: 'linear',
            delay: 100,
          });
          plyAnim3.translateX(-50).step()
          this.setData({["data.ra3"]: plyAnim3.export()})
          // this.setData({["data.readytxtv"]: true})
          setTimeout(_ =>{
            this.setData({["data.startv"]: true})
          }, 500)
        }, 200)
      }, 200)
    }, 200)
  },
  OnJoin(){ 
    var leftJoin = FightRoom.LeftJoin
    var rightJoin = FightRoom.RightJoin
    console.log(rightJoin)
    for (var i = 0; i < leftJoin.length;i++)
    {  
      this._JoinPly(datas.leftPly, leftJoin[i],true)
    }
  
    for (var i = 0; i < rightJoin.length; i++)
    {  
      this._JoinPly(datas.rightPly, rightJoin[i],false) 
    }

    var count = 0
    for(var i=0;i<datas.leftPly.length;i++)
    {
      var ply = datas.leftPly[i]
      if(ply.v&&ply.icon) count++
    }
    this.setData({["data.showStart"]:(count==2&&FightRoom.CurrMode==9)})
    this.setData({["data.yqhaoyou"]:FightRoom.IsYaoQing&&count<3 })  //邀请好友
    this._UpdatePlys()
  },
  OnEnterRoom()
  {
    //停止倒计时

    if(FightRoom.Step< FightRoom.RoomStep.EnterRoom) return
    getApp().globalData.wnds.Wnd_Ready.stopCountDown()
     this.NeedExitFight = false
    
    //显示战斗界面
    if (FightRoom.Is3V3) {
      setTimeout(_ =>{
        getApp().globalData.wnds.Wnd_Fight.Show({src: '3v3'})
      }, 800)
    }else{
      //赶考
      if (this.src=='')
      {
        getApp().globalData.wnds.Wnd_Fight.Show()
      }
      //1v1
      else 
      {
        getApp().globalData.wnds.Wnd_Fight.Show({ src: '1v1' })
      }
      
    }
  },
  OnLeave(){ 

    var leftJoin = FightRoom.LeftJoin
    var rightJoin = FightRoom.RightJoin


    for(var i=1;i<datas.leftPly.length;i++)
    { 
      if(datas.leftPly[i].v)  
      { 
        var isfind = false
        var uid = datas.leftPly[i].uid
        for(var k=0;k<leftJoin.length;k++)
         {
           if(leftJoin[k].uid==uid){ 
             isfind = true
             break
          }
         }

         if(!isfind) this._SetEmptyPly(datas.leftPly[i])
      }
    }

    for(var i=0;i<datas.rightPly.length;i++)
    {
       if(datas.rightPly[i].v)  
      {
        var isfind = false
        var uid = datas.rightPly[i].uid
        for(var k=0;k<rightJoin.length;k++)
         {
           if(rightJoin[k].uid==uid){ 
             isfind = true
             break
          }
         }

         if(!isfind) this._SetEmptyPly(datas.rightPly[i])
      }
    }
    this.OnJoin()
  },
  OnStart() {
      if (FightRoom.Step < FightRoom.RoomStep.Start) return
      this._HideAllST()
      // this.setData({["data.startv"]: true})
  },
  //提供给FightRoom调用的返回接口
  Back() {
      WorldConn.Close()//关闭世界链接
      wx.navigateBack({ delta: 1})
  },

  OnAJoin(){
      //配对已经完成，全部用户进入房间
  },
  OnStartClick(){

      if (!buttonDisabler.canClick()) return;
      this.setData({["data.showStart"]:false})
      WorldConn.Request(
              {n:"start"},
              (data) => {
                this.ParseStartResult(data)
              }
            )
      //getApp().globalData.wnds.Wnd_Shopping.Show();
  },
  ParseStartResult(data)
  {
    var r = data.r

    this.setData({["data.showStart"]:(r==2)})

  },
    ontips() {
      var items = []
      let dw=Player.Level1;
      dw=parseInt(dw)+1+'' 
      SDTips.Foreach((id, row) => {
        // console.log(row)
        var item = {
          Id: row[SDTips.I_ID]//ID
        }
        var a= item.Id.toString()
        if (a[0]=="1" ){
        item={
          Notes: row[SDTips.I_Notes]//名称
          }
        items.push(item)
        } else if (a[0] == dw){
          item = {
            Notes: row[SDTips.I_Notes]//名称
          }
          items.push(item)
      }}) 
      //this.setData({ ["data.items"]:items[0] })
    let r=Math.floor(Math.random()*items.length)
    this.setData({ ["data.items"]: items[r] })

    },

    //SetMode(mode) //8好友对战
    //{
    //   this.mode = mode
    //},
    //放弃被点击
    OnFangqiClick(evt) {
        if (!buttonDisabler.canClick()) return;
        this.Back()
    },
    OnStartFight(){
      
    },
    // 动画结束
  OnTransEnd({currentTarget}){
    let {t}=currentTarget.dataset;
    console.log(t)
    if (t =='play')
    {
      this.setData({
        ['data.showPDTip']: true
      })
    }
    if (t == 'ani') {
      this.setData({
        ['data.pding']: true
      })
    }
    
  },
  OnBack() {
    if (!buttonDisabler.canClick()) return;
    this.onHide()
    //var indexpage = getApp().globalData.IndexPage
    getApp().globalData.wnds.Wnd_Ready.back()
    getApp().globalData.wnds.Wnd_Ready.stopCountDown()
  }
})

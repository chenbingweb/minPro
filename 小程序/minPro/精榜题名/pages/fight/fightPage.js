 // pages/fight/fightPage.js
import { Player } from "../../modules/Player"  
import { FightRoom } from "../../dati_comm/modules/FightRoom"
import { GameConn, WorldConn } from "../../dati_comm/libs/network/Conns"; 
import * as AudioPool from "../../dati_comm/libs/core/AudioPool" 
import { AutoJump } from "../../dati_comm/modules/LoginJump"
import { share } from "../../dati_comm/modules/share";
import { buttonDisabler } from "../../dati_comm/modules/buttonDisabler";
import { TimeAnimation } from "../../utils/timeAnimation.js"
import { SDatadzface } from "../../sdata/SDatadzface"
import { SDatadztalk } from "../../sdata/SDatadztalk"
let _timerHandle = null

let _isshowDone
let datas = {
  wndname: "fight",//窗体名称
  display: true,//block none
  items:[],//表情
  itema:[],//文字
  leftld:{
    style:null,//leftld_in leftld_out 
    num:0
  }, 
  scrollTop:0,
  showicon:false,
  rightld:{
    style:null,//rightld_in rightld_out 
    num:0
  },
  //Tween 属性
  showView: false,//show聊天框
  showViewone:false,//show文字、表情
  wndAlpha: 1,
  wndPosX: 0,
  daanBtnLeft: 134, // 中间变量，不绑定 wxml 数据
  //绑定数据
  overtime: 10,//超时时间
  hmovertime: 10000,//毫秒超时时间
  currlun: 1,//当前轮
  maxlun: 9,//最大轮
  tx2txt: "文科",//题目类型文本
  tx2: false,//题目类型是否显示
  txtwt: false,//文本类型的问题是否显示
  tx1: false,//特效1是否显示
  imgwt: false,//图片类型的问题是否显示
  wentiTxt: "",//问题文本 
  wentiimg: "",//问题图片
  rightfen: 0,//右分
  leftfen: 0,//右分
  maxtime: 10,//本轮回答时间
  play321: true,//是否播放倒计时音效
  btnShopScale_1: 1,
  btnShopScale_2: 1,
  btnShopScale_3: 1,
  btnShopScale_4: 1,
  btnst: [
    'enter_4',
    'outer_4',
    'UnClickd',
    'Clickd',
    'Hide',
  ],
  daanBtn: [
    {
      v: 0,//是否显示按钮
      txt: "",//按钮文本
      style: "",//风格  select_yes select_no
      licon: null,//按钮上左边图标
      ricon: null,//按钮上右边图标,
      outer:false,
      lp:false,
      rp:false
    },
    {
      v: true, txt: "", style: "", licon: null, ricon: null, outer: false, lp: false,rp: false },
    {
      v: true, txt: "", style: "", licon: null, ricon: null, outer: false, lp: false,rp: false },
    {
      v: true, txt: "", style: "", licon: null, ricon: null, outer: false, lp: false,rp: false }
  ],//按钮显示状态

  //左边角色头像
  leftPly: [
    {
      v: true,//是否显示
      icon: null,//图标 
      name: "",//名字
      rightv: false,//是否显示正确图标
      errorv: false,//是否显示错误图标
    },
    { v: false, icon: null, name: "", rightv: false, errorv: false },
    { v: false, icon: null, name: "", rightv: false, errorv: false }
  ],
  //右边角色头像
  rightPly: [
    { v: true, icon: null, name: "", rightv: false, errorv: false },
    { v: false, icon: null, name: "", rightv: false, errorv: false },
    { v: false, icon: null, name: "", rightv: false, errorv: false }
  ],

  //绑定数据end

  q_type: {
    w: 314, h: 78, split: [52, 52, 0], img: [
      "../../imgs/fight/q_d_3.png",
      "../../imgs/fight/q_d_2.png",
      "../../imgs/fight/q_d_1.png",
    ]
  },
  //题目跳动
  jump_img: ["../../imgs/fight/t_1.png", "../../imgs/fight/t_2.png", "../../imgs/fight/t_3.png", "../../imgs/fight/t_4.png"],
  wh: getApp().globalData.wh,
  ShowBox: null,
  len: 0,
  speekItems:[],
  showLun:true,
  showQ:false,
  is3v3:false
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
    FightRoom.WentiTxt=''
   
    this.src=options.src
    if (AutoJump("fight", options))
    {  
      return
    }
    if (this.src=='3v3')
    {
      this.setData({
        is3v3:true
      })
    }
    /*
    setTimeout(() => {
      this.setData({
        ["data.an"]: true
      })
    }, 3000)
    */
    //实例左进度动画
    this.Left_Pro = new TimeAnimation()
    //实例右进度动画
    this.Right_Pro = new TimeAnimation() 
    this.onface(); 
    this.ontalk();  
    this.setData({
      ["data.wentiTxt"]: ''
    })
    //if (!getApp().globalData.fightPageInitd)
    //{ 
    //  getApp().globalData.fightPageInitd = true

    //}
    // this.setData({
    //   ['data.showView']: false
    // })
    // showView: (options.showView == "true" ? true : false)
  },

  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { 

    if (AutoJump("fight"))
    {  
     return
    } 
    this.NeedExitFight = true


    // 动画
    setTimeout(() => {
      this.setData({
        ['data.left_animation']: 'left_animation',
        ['data.right_animation']: 'right_animation',
        ['data.left_process']: 'left_process',
        ['data.right_process']: 'right_process',
        ['data.question_animation']: 'question_animation'
      })
    }, 500)
    this._BindEvts() 
    this.OnShowDone() 
    
    //this.Ongradual()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this._ClearTimer()

    _isshowDone = false
    datas.play321 = false
    AudioPool.StopAudio("/audios/time321.mp3");
 
    this.offEvts()
    //重置答案
    datas.daanBtn = [
      {
        v: 0,//是否显示按钮
        txt: "",//按钮文本
        style: "",//风格  select_yes select_no
        licon: null,//按钮上左边图标
        ricon: null//按钮上右边图标
      },
      { v: true, txt: "", style: "", licon: null, ricon: null },
      { v: true, txt: "", style: "", licon: null, ricon: null },
      { v: true, txt: "", style: "", licon: null, ricon: null }
    ]//按钮显示状态
    for(let i=0;i<datas.daanBtn.length;i++){
      datas.daanBtn[i].v = 0
      datas.daanBtn[i].txt = FightRoom.Daan[i]
      datas.daanBtn[i].style = ""
      datas.daanBtn[i].licon = null
      datas.daanBtn[i].ricon = null
      datas.daanBtn[i].outer = false
      datas.daanBtn[i].X = -800;
    }
    this.setData({
      ['data.daanBtn']: datas.daanBtn,
      ["data.wentiTxt"]:''
    })
    this.AutoLeaveFight()
    FightRoom.WentiTxt = ''

  },

  AutoLeaveFight: function () {

    if (this.NeedExitFight) { 
      FightRoom.LeaveRoom()
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.onHide()
    this.setData({
      ["data.wentiTxt"]: ''
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return share.getCommonShareContent(options);
  },
  OnShopTouchStart(e) {
    let id = e.currentTarget.id 
    //this.setData({
    //  ['data.btnShopScale_'+id]:0.95
    //})

    if (datas.daanBtn[id].v == 0 || datas.daanBtn[id].v == 2)
      datas.daanBtn[id].v = 3

    this._UpdateBtns()
    // this.setData({ ["data.currlun"]: FightRoom.Lun })
  },
  OnShopTouchEnd(e) {
    let id = e.currentTarget.id

    if (datas.daanBtn[id].v == 3)
      datas.daanBtn[id].v = 2

    this._UpdateBtns()
    //this.setData({
    //  ['data.btnShopScale_' + id]: 1
    //})
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
  OnDoT() {
    if (!_isshowDone || !FightRoom.SYDatiTime) return

    datas.hmovertime = FightRoom.SYDatiTime

    this._ClearTimer()

    this.OnTimer(datas.hmovertime)
    console.log()
    //刷新剩余时间
    this._SetOvertime()
  },
  OnDoLun0() {
    console.log('OnDoLun0')
    if (!_isshowDone) return
    datas.play321 = true
    this._HideBtns()
    this._HideAllTexiao()

    //刷新剩余时间
    datas.hmovertime = FightRoom.DatiTime * 1000
    this._SetOvertime()

    if (FightRoom.Lun) {
      //setTimeout(()=>{
        //设置当前轮
        this.setData({ ["data.currlun"]: FightRoom.Lun })
        this.setData({
          ["data.maxtime"]: FightRoom.DatiTime,
          ["data.showLun"]: true,
          ["data.showQ"]: false
        })
     // }, 500)
      
    }
    
    this._ClearPlyST()
  },
  OnDoLun() {
    if (!_isshowDone  ) return
    this._HideAllTexiao()
 
    this.setData({
      ["data.showLun"]: false,
    }) //问题文本

    //设置题目
   // setTimeout(() => {
    this.setData({ 
      ["data.wentiTxt"]: FightRoom.WentiTxt,
      ["data.showQ"]: true
      }) //问题文本
    //}, 500)
    // if (FightRoom.WentiImg) {
    //    this.setData({ ["data.wentiimg"]: FightRoom.WentiImg })
    //    this.setData({ ["data.imgwt"]: true}) //图片类型的问题是否显示
    //    this.setData({ ["data.txtwt"]: false }) //文本类型的问题是否显示
    // }else{
    //   this.setData({ ["data.imgwt"]: false}) //图片类型的问题是否显示
    //   this.setData({ ["data.txtwt"]: true }) //文本类型的问题是否显示
    // }

  },

  OnDoKantiEnd() {
   
    if (!_isshowDone || !FightRoom.Daan) return 
    //let anims = getApp().globalData.anims.fight;
   // datas.daanBtn=[]
    var len = Math.min(FightRoom.Daan.length, 4)
    console.log('lenlenlenlenlen',len)
    // for(let h=0;h<len;h++)
    // {
    //   datas.daanBtn.push({ v: true, txt: "", style: "", licon: null, ricon: null, outer: false })
    // }
    this.setData({ ['data.len']: len })
    //this._addDaanBtnTween();
    var i = 0
    //显示答案 
    // FightRoom.Daan.forEach((item,i)=>{
    //   datas.daanBtn[i].v = 0
    //   datas.daanBtn[i].txt = item
    //   datas.daanBtn[i].style = ""
    //   datas.daanBtn[i].licon = null
    //   datas.daanBtn[i].ricon = null
    //   datas.daanBtn[i].outer = false
    //   datas.daanBtn[i].X=0;
    // })
    for (; i < len; i++) {
    
      datas.daanBtn[i].v = 0
      datas.daanBtn[i].txt =FightRoom.Daan[i]
      datas.daanBtn[i].style = ""
      datas.daanBtn[i].licon = null
      datas.daanBtn[i].ricon = null
      datas.daanBtn[i].outer = false
      datas.daanBtn[i].X=0;
      //anims.daanBtnLefts[i].left = datas.daanBtnLeft;
      //anims.daanBtnInTweens[i].from({ left: anims.leftPosX }, anims.duration * 1000).start();
      //anims.daanBtnTweenedIn = true;
    }

    //隐藏
    for (var j = i; j < 4; j++) datas.daanBtn[j].v = 4
    this._UpdateBtns(datas.daanBtn)
  },
  /*
_addDaanBtnTween() {
  let g = getApp().globalData; 
  let anims = g.anims.fight;
  if (anims.daanBtnTweenedIn.length > 0) {
    return;
  }
  let len = 4;
  let interval = anims.interval; // 不同按钮动画间隔时间 毫秒
  let i = 0;
 
  for (; i < len; i++) {
    let index = i;
    anims.daanBtnLefts.push({ left: 0 });
    // 进入
    let tw = new TWEEN.Tween(anims.daanBtnLefts[i]);
    tw.onUpdate((obj) => {
      if (datas.daanBtn[index].v === false) {
        datas.daanBtn[index].v = true;
        this._UpdateBtns();
      }
      this.setData({ [`data.daanBtn[${index}].left`]: obj.left });
    });
    tw.onStart((obj) => {
      datas.daanBtn[index].v = false;
      this._UpdateBtns();
      this.setData({ [`data.daanBtn[${index}].left`]: obj.left });
    });
    tw.delay(i * interval * 1000);
    anims.daanBtnInTweens.push(tw);
    // 离开
    tw = new TWEEN.Tween(anims.daanBtnLefts[i]);
    tw.onUpdate((obj) => {
      this.setData({ [`data.daanBtn[${index}].left`]: obj.left });
    });
    tw.onStart((obj) => {
      this.setData({ [`data.daanBtn[${index}].left`]: obj.left });
    });
    tw.delay(i * interval * 1000);
    anims.daanBtnOutTweens.push(tw);
  }
},*/
  OnDoTexiao() {

    if (!_isshowDone || !FightRoom.Texiao) return

    this._HideBtns()

    //this._FadeOutBtns();

    this._HideAllTexiao()
    this._ClearPlyST()

    //隐藏问题显示
    this.setData({ ["data.txtwt"]: false }) //文本类型的问题是否显示
    this.setData({ ["data.imgwt"]: false }) //图片类型的问题是否显示

    //显示特效
    switch (FightRoom.Texiao) {
      case 1://最后一轮双倍
        {

          this.setData({ ["data.tx1"]: true })

        }
        break
      case 2://分类提示
        {

          this.setData({ ["data.tx2"]: true })
          this.setData({ ["data.tx2txt"]: FightRoom.Texiaotxt })
        }
        break
    }
  },
  //回答结果
  OnDoHuidaJG() {
   
    console.log('+++++++++++回答结果+++++++++++++++')
    if (!_isshowDone || !FightRoom.HuidaJG) return
    //获取回答结果
    var hdjg = FightRoom.HuidaJG
    var userSel = hdjg.x
    if (userSel < 1 || userSel > 4) return//答案数超出范围
    var btnPre = datas.daanBtn[userSel - 1]
    //左边玩家
    var leftPly = FightRoom.LeftPly(hdjg.uid)

    if (leftPly) {
      var lb = this.selectComponent('#left');
      //设置进度分数
      if (lb) lb.setProgress(hdjg.f / FightRoom.MaxFen);
      console.log("********leftPly_1********", hdjg.f / FightRoom.MaxFen)
      //设置显示分数
    //  this.setData({ ["data.leftfen"]: parseInt(hdjg.f) })
      //左分数变化动画
      // this.Left_Pro['score'] = res => {
      //   this.setData({ ["data.leftfen"]: parseInt(res) })
      // }
      // this.Left_Pro.init(this.data.data.leftfen, parseInt(hdjg.f));
      //放大
      if (parseInt(hdjg.f) > this.data.data.leftfen) {
        this.setData({ ['data.leftScaleAni']: 1.3 })
        setTimeout(() => {
          this.setData({ ['data.leftScaleAni']: 1 })
        }, 500)
      }
      //if (hdjg.zq)
      {
        var isRight = this._IsRight(hdjg.zq, userSel)


        //播放音效
        AudioPool.PlayAudio(isRight ? "/audios/right.mp3" : "/audios/error.mp3");

        //设置按钮颜色 
        btnPre.style = isRight ? "select_yes" : "select_no"
        btnPre.lp = true;
        //头像上显示标记 
        //this._SetPlyST(datas.leftPly[leftPly.idx], isRight)
      }

      if(isRight) //回答正确
      {
        this.AddLeftLiandui()
      }

      //按钮上显示答题者头像   
      btnPre.licon = leftPly.iconurl
    } else {

      //var rightPly = FightRoom.RightPly(hdjg.uid)
      //if (rightPly != null)
      //  btnPre.ricon = rightPly.iconurl
      //else
      //  console.log("##############rightPly is null ", hdjg.ply)
      var rb = this.selectComponent('#right');
      console.log("********rightPly_1********", hdjg.f / FightRoom.MaxFen)
      if (rb) rb.setProgress(hdjg.f / FightRoom.MaxFen);
      this.setData({ ["data.rightfen"]: parseInt(hdjg.f) })
      //右分数变化动画
      // this.Right_Pro['score'] = res=>{
      //   this.setData({ ["data.rightfen"]: parseInt(res) })
      // }
      // this.Right_Pro.init(this.data.data.rightfen, parseInt(hdjg.f));
      //放大
      if (parseInt(hdjg.f) > this.data.data.rightfen) {
        this.setData({ ['data.rightScaleAni']: 1.3 })
        setTimeout(() => {
          this.setData({ ['data.rightScaleAni']: 1 })
        }, 500)
      }

    }


    if (FightRoom.LunZQ)//已经知道了本轮的正确答案
    {
      for (var i = 0; i < FightRoom.RightSel.length; i++) {
        var selinfo = FightRoom.RightSel[i]


        var isRight = this._IsRight(FightRoom.LunZQ, selinfo.x)
        var btnPre = datas.daanBtn[selinfo.x - 1]

        //设置按钮颜色 
        btnPre.style = isRight ? "select_yes" : "select_no"
        btnPre.rp=true;
        //按钮右侧头像
        btnPre.ricon = selinfo.ply.iconurl
      }

      FightRoom.RightSel = []
    }
    this._UpdateBtns()
    
   
  },
  OnDoHuiheEnd() {
    
    console.log('+++++++++++回答结束+++++++++++++++')
    if (!_isshowDone || !FightRoom.HuiHeJG) return
    this._ClearTimer()

    var hhjg = FightRoom.HuiHeJG


    if (hhjg.cs != 1)//不是因为超时导致的结束
    {
      AudioPool.StopAudio("/audios/time321.mp3");
    } else {
      datas.hmovertime = 0
      this._SetOvertime()
      this.setData({ ["data.wentiimg"]: ''})
    }
    //刷新分数
    var leftfen = FightRoom.IsA ? hhjg.af : hhjg.bf
    var rightfen = FightRoom.IsA ? hhjg.bf : hhjg.af

    this.setData({ ["data.leftfen"]: parseInt(leftfen) })
    this.setData({ ["data.rightfen"]: parseInt(rightfen) }) 
    
    var lb = this.selectComponent('#left');
    //var lb = this.selectComponent('#leftProgressBar');
    console.log("********leftPly_2********", leftfen / FightRoom.MaxFen)
    if (lb) lb.setProgress(leftfen / FightRoom.MaxFen);
    var rb = this.selectComponent('#right');
   // var rb = this.selectComponent('#rightProgressBar');
    if (rb) rb.setProgress(rightfen / FightRoom.MaxFen);
    console.log("********rightPly_2********", rightfen / FightRoom.MaxFen)
    var leftRight = false
    var rightRight = false



    //设置分数文本 
    for (var uid in hhjg.xs) {
      var sel = hhjg.xs[uid]
      if (sel < 1 || sel > 4) continue
      var isRight = this._IsRight(hhjg.zq, sel)

      var btnPre = datas.daanBtn[sel - 1]
      //设置按钮颜色
      btnPre.style = isRight ? "select_yes" : "select_no"

      //按钮上显示答题者头像
      var leftPly = FightRoom.LeftPly(uid)
      if (leftPly) {
        btnPre.licon = leftPly.iconurl

        //头像上显示标记 
        //this._SetPlyST(datas.leftPly[leftPly.idx], isRight)
        if(isRight) leftRight=true
        btnPre.lp=true;
        btnPre.lpRight = isRight
      } else {

        var rightPly = FightRoom.RightPly(uid)
        btnPre.ricon = rightPly.iconurl
        btnPre.rp = true
        btnPre.rpRight = isRight
        //头像上显示标记 
        //this._SetPlyST(datas.rightPly[rightPly.idx], isRight)


        if(isRight) {this.AddRightLiandui();rightRight=true }
      }

    
    
    
      
    }
    //显示正确答案
    for (var i = 0; i < hhjg.zq.length; i++) {
      var btnPre = datas.daanBtn[hhjg.zq[i] - 1]
      btnPre.style = "select_yes"

    }
    if(!leftRight) this.HideLeftLiandui()
    if(!rightRight) this.HideRightLiandui()
    
    this._UpdateBtns()
    setTimeout(()=>{
      // 清除当前题目
      this.setData(
        {
          ["data.wentiTxt"]:""
        }
      )
      datas.daanBtn.forEach(item => {
        item.X = 800;
        
      })
      this._UpdateBtns()
    },1500)
   
  },
  //动画结束
  onAniEnd({currentTarget}){
    let {x}=currentTarget.dataset;
    if(x!==800) return 
    datas.daanBtn.forEach(item => {
      item.X = -800;
      item.lp = false;
      item.rp = false
      // item.v = 0
      // item.txt = FightRoom.Daan[i]
      // item.style = ""
      // item.licon = null
      // item.ricon = null
    })
    this._UpdateBtns()
  },
  UpdateSpeek(){
    this.setData({  ["data.speekItems"]: FightRoom.SpeekList})
    this.setData({  ["data.scrollTop"]: "199999999" })
  },
  OnShowDone() {
 
    datas.leftld.num = 0
    datas.leftld.style = null

    datas.rightld.num = 0
    datas.rightld.style = null
    this.setData({ ["data.rightld"]:  datas.rightld })
    this.setData({ ["data.leftld"]:  datas.leftld }) 
 
   
   

    this._HideBtns(true)
    this._HideAllTexiao()
  
  
    this.OnDoLun0()
    this.OnDoTexiao()
    this.OnDoLun()
    this.OnDoKantiEnd()
    this.OnDoT()
    this.OnDoHuidaJG()
    this.OnDoHuiheEnd()
    this.OnSpeek()
    this.OnCJ()
    _isshowDone = true
    this.OnEnterRoom() 
  },
  OnEnterRoom() {
    if (!_isshowDone) return
    //console.log("FightRoom.LeftPlys", FightRoom.LeftPlys)
    //console.log("FightRoom.RightPlys", FightRoom.RightPlys)

    //清双方分数进度条

    //设置最大轮
    this.setData({ ["data.maxlun"]: FightRoom.MaxLun })

    for (var i = 0; i < 3; i++) {
      datas.rightPly[i].v = datas.leftPly[i].v = false
    }

    //设置双方头像
    for (var i = 0; i < FightRoom.LeftPlys.length; i++) {
      var ply = FightRoom.LeftPlys[i]
      datas.leftPly[i].icon = ply.iconurl
      datas.leftPly[i].name = ply.name
      datas.leftPly[i].rightv = false
      datas.leftPly[i].errorv = false
      datas.leftPly[i].v = true
      datas.leftPly[i].uid = ply.uid
      datas.leftPly[i].hf = ply.hf
      datas.leftPly[i].k = ply.k
      //console.log("lplyk",ply.name,ply.k)
    }


    for (var i = 0; i < FightRoom.RightPlys.length; i++) {
      var ply = FightRoom.RightPlys[i]
      datas.rightPly[i].icon = ply.iconurl
      datas.rightPly[i].name = ply.name
      datas.rightPly[i].rightv = false
      datas.rightPly[i].errorv = false
      datas.rightPly[i].v = true
      datas.rightPly[i].uid = ply.uid
      datas.rightPly[i].hf = ply.hf
      datas.rightPly[i].k = ply.k
      //console.log("rplyk",ply.name,ply.k)
    }

    if (FightRoom.LFen) {
      this.setData({ ["data.leftfen"]: FightRoom.LFen })
      var lb = this.selectComponent('#left');
     // if (lb) lb.setProgress(FightRoom.LFen);
    }

    

    if (FightRoom.RFen) {
      this.setData({ ["data.rightfen"]: FightRoom.RFen })
      var rb = this.selectComponent('#right');
     // if (rb) rb.setProgress(FightRoom.RFen);
    }

    this._UpdatePlys()

    //this.setData({ ["data.showicon"]: false})
    //this.setData({ ["data.showicon"]: true })
    /*
      for (var i = 0; i < datas.leftPly.length; i++) {
        var ply = datas.leftPly[i]
        if (ply.v && ply.icon) {
          var cmicon = this.selectComponent('#licon_' + i);
          cmicon.Load()
        }
      }

      for (var i = 0; i < datas.rightPly.length; i++) {
        var ply = datas.rightPly[i]
        if (ply.v && ply.icon) {
          var cmicon = this.selectComponent('#ricon_' + i);
          cmicon.Load()
        }
      }  
    */
  },
  // 掉线动效
  offb() {
      this.setData({ ['data.offlinebj']: 0 })
      this.setData({ ['data.offline']: 0 })
    setTimeout(() => {
      this.setData({ ['data.offlinebj']: 0.1 })
    }, 50)
    setTimeout(() => {
      this.setData({ ['data.offlinebj']: 0.5 })
    }, 100)
    setTimeout(() => {
      this.setData({ ['data.offlinebj']: 1 })
    }, 150)
    setTimeout(() => {
      this.setData({ ['data.offline']: 0 })
    }, 200)
    setTimeout(() => {
      this.setData({ ['data.offline']: 0.5 })
    }, 300)
    setTimeout(() => {
      this.setData({ ['data.offline']: 1 })
    }, 400)
    setTimeout(() => {
      this.setData({ ['data.offline']: 0.5 })
    }, 500)
    setTimeout(() => {
      this.setData({ ['data.offline']: 1 })
    }, 600)
  },
  OnSpeek(){
    if (!_isshowDone) return
    this.UpdateSpeek()
  },
  OnCJ() {  
    if (!_isshowDone || !FightRoom.Chengji) return

    this.NeedExitFight = false

    if (FightRoom.Is3V3)
      getApp().globalData.wnds.Wnd_MatchOver.Show()
    else
      getApp().globalData.wnds.Wnd_FightOver.Show({src: this.src})
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

  AddLeftLiandui()
  {
    datas.leftld.num++
    if(datas.leftld.num>1)
    { 

      datas.leftld.style = ""
      this.setData({ ["data.leftld"]:  datas.leftld }) 

      datas.leftld.style = "leftld_in"
      this.setData({ ["data.leftld"]:  datas.leftld }) 
    }
  },
  AddRightLiandui()
  {
    datas.rightld.num++
    if(datas.rightld.num>1)
    { 

      datas.rightld.style = ""
      this.setData({ ["data.rightld"]:  datas.rightld })

      datas.rightld.style = "rightld_in"
      this.setData({ ["data.rightld"]:  datas.rightld })
    }
  },
  HideLeftLiandui()
  {
    datas.leftld.num = 0
    datas.leftld.style = "leftld_out"
    //this.setData({ ["data.leftld"]:  datas.leftld })
  },
  HideRightLiandui()
  {
    datas.rightld.num = 0
    datas.rightld.style = "rightld_out"
    //this.setData({ ["data.rightld"]:  datas.rightld })
  },
  _ClearTimer() {
    if (_timerHandle) {
      clearTimeout(_timerHandle);
      _timerHandle = null
    }
  },
  _IsRight(zq, sel) {
    if (!zq) return false

    for (var i = 0; i < zq.length; i++) {
      if (zq[i] == sel) return true
    }
    return false
  },
  //清除所有相关事件
  offEvts: function () {
    
    FightRoom.EvtEnterRoom.Off(this.OnEnterRoom)
    FightRoom.EvtDoT.Off(this.OnDoT)
    FightRoom.EvtDoLun.Off(this.OnDoLun)
    FightRoom.EvtDoLun0.Off(this.OnDoLun0)
    FightRoom.EvtDoKantiEnd.Off(this.OnDoKantiEnd)
    FightRoom.EvtDoTexiao.Off(this.OnDoTexiao)
    FightRoom.EvtDoHuidaJG.Off(this.OnDoHuidaJG)
    FightRoom.EvtDoHuiheEnd.Off(this.OnDoHuiheEnd)
    FightRoom.EvtCJ.Off(this.OnCJ) 
    FightRoom.EvtSpk.Off(this.OnSpeek)
  },

  _BindEvts() {
    console.log("绑定事件")
    this.offEvts()
    FightRoom.EvtEnterRoom.On(this, this.OnEnterRoom)
    FightRoom.EvtDoT.On(this, this.OnDoT)
    FightRoom.EvtDoLun.On(this, this.OnDoLun)
    FightRoom.EvtDoLun0.On(this, this.OnDoLun0)
    FightRoom.EvtDoKantiEnd.On(this, this.OnDoKantiEnd)
    FightRoom.EvtDoTexiao.On(this, this.OnDoTexiao)
    FightRoom.EvtDoHuidaJG.On(this, this.OnDoHuidaJG)
    FightRoom.EvtDoHuiheEnd.On(this, this.OnDoHuiheEnd)
    FightRoom.EvtCJ.On(this, this.OnCJ)
    FightRoom.EvtSpk.On(this,this.OnSpeek)
  },
  _HideBtns(immediately = false) {
    for (var j = 0; j < 4; j++) {
      if (datas.daanBtn[j].v == 4) continue
      datas.daanBtn[j].v = immediately ? 4 : 1
    }
    this._UpdateBtns()


  },
  /*
  _FadeOutBtns() {
    let anims = getApp().globalData.anims.fight;
    if (!anims.daanBtnTweenedIn) {
      return;
    }
    for (let j = 0; j < 4; j++) {
      anims.daanBtnLefts[j].left = datas.daanBtnLeft;
      anims.daanBtnOutTweens[j].to({ left: anims.rightPosX }, anims.duration * 1000).start();
      anims.daanBtnTweenedIn = false;
    }
  },*/
  _HideAllTexiao() {
    this.setData({ ["data.tx2"]: false })
    this.setData({ ["data.tx1"]: false })

  },
  _UpdateBtns() {
    this.setData({ ["data.daanBtn"]: datas.daanBtn })

  },
  _UpdatePlys() {
    this.setData({ ["data.rightPly"]: datas.rightPly })
    //console.log("leftPly",datas.leftPly )
    this.setData({ ["data.leftPly"]: datas.leftPly })


   
  },
  /*
  _SetPlyST(uiply, right) {
    if (right)
      uiply.rightv = true
    else
      uiply.errorv = true

    this._UpdatePlys()
  },*/
  _ClearPlyST() {
    //清头像上的各种效果
    for (var i = 0; i < datas.leftPly.length; i++) {
      datas.leftPly[i].rightv = false
      datas.leftPly[i].errorv = false
    }

    for (var i = 0; i < datas.rightPly.length; i++) {
      datas.rightPly[i].rightv = false
      datas.rightPly[i].errorv = false
    }
    this._UpdatePlys()
  },
  OnButtonClick(event) {
    if (!buttonDisabler.canClick()) return;
    //返回下标
    var dataset = event.currentTarget.dataset;
    var x = Math.round(dataset.id) + 1
    var nm = {
      n: "hd",
      x: x,
      lun: parseInt(FightRoom.Lun)
    }
    WorldConn.Request(nm, () => {

    })
  },
  // 获取hei的id节点然后屏幕焦点调转到这个节点  
  bottom: function () {
    /*
    var query = wx.createSelectorQuery()
    query.select('#hei').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      
      //wx.pageScrollTo({
      //  scrollTop: -100 // #the-id节点的下边界坐标  
      //})
      // res[1].scrollTop // 显示区域的竖直滚动位置  
      console.log(res[0].bottom)
    })*/
  
    //scrollTop
  },
  onChangeShowState_gb:function(){

    //关闭弹窗
    this.CloseTalkPopup()
  },
  //刷新聊天弹框状态
  UpdateTalkPopup()
  {
    var that = this;
    var sf = that.data.showView;
    if (sf){
      this.setData({
        ['data.showView']: true
      })
    } else if (!sf) {
      this.setData({
        ['data.showView']: false
      })
    } 
  },
  //关闭聊天弹框
  CloseTalkPopup()
  {
    this.setData({ showView: false})
    this.UpdateTalkPopup()
  },
  //显示隐藏聊天框
  onChangeShowState:function () {

    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
    this.UpdateTalkPopup()
  },
  //点击文字发言
  onTxtClick(event)
  {
    if (!buttonDisabler.canClick()) return;
    var dataset = event.currentTarget.dataset;
    var id = dataset.id
    console.log("textclick",id)
    //发言 
    WorldConn.Request(
       {
        n: "speek",
        tp: 2,
        id:id
      }, 
      () => {}
    ) 

    //关闭弹窗
    this. CloseTalkPopup()
  },
  //点击表情发言
  onBQClick(event)
  {
    if (!buttonDisabler.canClick()) return;
    var dataset = event.currentTarget.dataset;
    var id = dataset.id
    console.log("bqclick",id)

    //发言 
    WorldConn.Request(
       {
        n: "speek",
        tp: 1,
        id:id
      }, 
      () => {}
    ) 

    //关闭弹窗
    this. CloseTalkPopup()
  },
  onface(){

    var items = []
    SDatadzface.Foreach((id, row) => {
      var item = {
        PictureName:  row[SDatadzface.I_PictureName],//表情
        Picture: Player.ArticleServerUrl().MergePath(  "/public/uploads/ProblemImg/").MergePath(  row[SDatadzface.I_Picture]),//表情
        id:id
      }
      items.push(item)
    })
    this.setData({ ["data.items"]: items })

  },
  ontalk() {

    var itema = []
    SDatadztalk.Foreach((id, row) => {
      var item = {
        TextPre: row[SDatadztalk.I_TextPre],//名称
        id:id
      }
      itema.push(item)

    })

    this.setData({ ["data.itema"]: itema })

  },

  //盒子伸展动画结束事件
  Transitionend() {
    console.log('AnimationEnd')
  },
  textBtn(){
      this.setData({
        ['data.showViewone']: false
    })
        
              
  },
    faceBtn() {
          this.setData({
            ['data.showViewone']: true
          })
  } ,
  OnBack(){
    if (!buttonDisabler.canClick()) return;
    this.onHide()
    //var indexpage = getApp().globalData.IndexPage
    getApp().globalData.wnds.Wnd_Fight.back()
  }
})


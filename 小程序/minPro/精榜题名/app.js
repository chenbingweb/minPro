//ald
//var aldstat = require("./utils/ald-stat.js");
//app.js
import PageWrap from './dati_comm/modules/PageWrap';
import {Ticker} from "./dati_comm/libs/core/Ticker";
//import TWEEN from "./libs/core/Tween";
import {FightRoom, StopFight} from './dati_comm/modules/FightRoom';
import { BindAppUpdateEvt } from "./dati_comm/modules/AppUpgrade"
import "./dati_comm/libs/StringEX"

Ticker.start(30);
Ticker.register(null, _mainLoop);

function _mainLoop(deltaTime) {
    //TWEEN.update(); // 注意 TWEEN.update 接受总时间，因此不能直接注册到 Ticker（deltaTime）
}

require('./dati_comm/libs/network/checkLogin');

let _util = require('./utils/util.js');

//引入工具包

let animParams = {
    wnd: {
        duration: 0.3, //tween 时长
        outerPosX: 1000, //窗口在屏幕外的位置
        //alphaEaseType: TWEEN.Easing.Linear.None,
        //posXEaseType: TWEEN.Easing.Linear.None,

        upperOutPosX: 750, // 上层页面滑出屏幕的位置
        lowerOutPosX: -200, // 下层页面被挤出的位置
        slideSeqDuration: 0.5,
    },
    /*
    fight: {
        daanBtnLefts: [], // tween 用中间变量
        daanBtnInTweens: [],//tween 列表
        daanBtnOutTweens: [],//tween 列表
        duration: 0.2,//tween 时长
        interval: 0.1,//不同按钮启动时间间隔
        leftPosX: -800,//左侧的 css left 值
        rightPosX: 800,//右侧的 css left 值
        daanBtnTweenedIn: false, // 答案按钮是否处于 tween in 后的状态，用于强行绕开 tween out 会多调用一次的问题 
    },*/
};

App({
    onLaunch: function (options) {
        console.log(options);
       // BindAppUpdateEvt()
        this.globalData.isFromShare = options.query.share === 'true';
        this.globalData.scene=options.scene
       this.globalData.query = options.query
      wx.getSystemInfo({
        success: res=>{
          let reg =/iPhone X/ig;
          let m = reg.test(res.model)
          this.globalData.model = m?true:false
        }
      })
       
    },
    onShow: function (options) {
        console.log(options);
        this.globalData.query = options.query
        this.globalData.scene = options.scene
        this.globalData.isFromShare = options.query.share === 'true';
       
    },
    onHide:function()
    {
        console.log("==============App Hide================");
        FightRoom.CancelLeaveRoom()
    },
    //我的道具
    getMygoods(goods,callback) {
      try {
        let Mygoods = JSON.parse(goods)
      Mygoods.forEach(item => {
          //let {id,type}=item;
          // let itemId=item.id
          getApp().globalData.Goods.forEach(child => {
            let { id, name, icon } = child;
            if (item.id == id) {
              item.name = name;
              item.icon = icon;
            }
          })
        })
        callback && callback(Mygoods)
      this.setData({
          ['myGoods']: Mygoods
        })
      
      } catch(e) {

      }
    },
    Player(src){
      this.innerAudioContext = wx.createInnerAudioContext()
      this.innerAudioContext.loop = true;
      this.innerAudioContext.autoplay = true;
      this.innerAudioContext.src =src;
      
      this.innerAudioContext.onError((res) => {
        
      })
    },
    globalData: {
        model:false,
        userInfo: null,
        wh: _util.getPhoneInfor().windowHeight,//窗口高度
        ww: _util.getPhoneInfor().windowWidth,//窗口宽度
        anims: animParams,
        wnds: {},//全部窗体
        isFromShare: false, // 是否从别人的分享或邀请启动
        scene:'1001',
      Goods:[],
        //页面定义
        pages: {
            Ready: "pages/ready/readyPage",//战斗准备
            Shopping: "pages/shopping/shoppingpage",//商城
            Ranking: "pages/ranking/rankingPage",//排行
            Classify: "pages/classify/classifyPage",//话题王分类
            FightOver: "pages/fightOver/fightOverPage",//战斗结算
            Home: "pages/home/homePage",//主页
            Login: "pages/login/loginPage",//登录
            Analysis: "dati_comm/pages/analysis/analysisPage",//解析
            LonginInfo: "dati_comm/pages/longininfo/longininfo"
        }
    }
})

//登录
getApp().globalData.wnds.Wnd_LonginInfo = new PageWrap("/dati_comm/pages/logininfo/logininfo")

//getApp().globalData.wnds.Wnd_Login = new PageWrap("/pages/login/loginPage", 2)


//首页
getApp().globalData.wnds.Wnd_Home = new PageWrap("/pages/home/homePage", 2)

//战斗结算
//getApp().globalData.wnds.Wnd_FightOver = new PageWrap("/pages/fightOver/fightOverPage", 3)
getApp().globalData.wnds.Wnd_FightOver = new PageWrap("/pages/subPackages/pages/fightOver/fightOverPage", 3)
//商城
getApp().globalData.wnds.Wnd_Shopping = new PageWrap("/pages/subPackages/pages/shopping/shoppingpage")
//getApp().globalData.wnds.Wnd_Shopping = new PageWrap("/dati_comm/pages/shopping/shoppingpage")

//排行榜
//getApp().globalData.wnds.Wnd_Ranking = new PageWrap("/pages/ranking/rankingPage")
getApp().globalData.wnds.Wnd_Ranking = new PageWrap("/pages/subPackages/pages/ranking/rankingPage")
//赶考
getApp().globalData.wnds.Wnd_Classify = new PageWrap("/pages/classify/classifyPage")

//准备对战
getApp().globalData.wnds.Wnd_Ready = new PageWrap("/pages/ready/readyPage")

//解析
getApp().globalData.wnds.Wnd_Analysis = new PageWrap("/dati_comm/pages/analysis/analysisPage")

//战斗
getApp().globalData.wnds.Wnd_Fight = new PageWrap("/pages/fight/fightPage", 3)

//组队，段位界面
getApp().globalData.wnds.Wnd_Match = new PageWrap("/pages/match/matchPage")

//多人组队结算
getApp().globalData.wnds.Wnd_MatchOver = new PageWrap("/pages/matchOver/matchOverPage", 3)

//赛季结算通知界面
getApp().globalData.wnds.Wnd_NoticeAccounts = new PageWrap("/pages/noticeAccounts/noticeAccounts")

//新赛季开始界面
getApp().globalData.wnds.Wnd_StartMatch = new PageWrap("/pages/startMatch/startMatch")

//红包赛
getApp().globalData.wnds.Wnd_Money = new PageWrap("/pages/money/money")
//新赛季结算界面
getApp().globalData.wnds.Wnd_MatchJieSuan = new PageWrap("/pages/matchJieSuan/matchJieSuan")

//通天塔 ,
getApp().globalData.wnds.Wnd_TongTianTa = new PageWrap("/pages/tongTianTa/pages/startpage/startpage")

//通天塔挑战 ,
getApp().globalData.wnds.Wnd_FightTT = new PageWrap("/pages/tongTianTa/pages/fightTT/fightTT")
//世界排行 ,
getApp().globalData.wnds.Wnd_WorldRank = new PageWrap("/pages/tongTianTa/pages/worldRank/worldRank")
//个人中心 ,
getApp().globalData.wnds.Wnd_MyCenter = new PageWrap("/pages/subPackages/pages/myCenter/myCenter")
//我的现金,
getApp().globalData.wnds.Wnd_MyMoney = new PageWrap("/pages/subPackages/pages/myMoney/myMoney")
//提现成功提示,
getApp().globalData.wnds.Wnd_TiXianTip = new PageWrap("/pages/subPackages/pages/tiXianTip/tiXianTip")
//红包赛开始页面,
getApp().globalData.wnds.Wnd_StartPageHBS = new PageWrap("/pages/hongBaoSai/pages/startpage/startpage")
//红包赛进入房间页面,
getApp().globalData.wnds.Wnd_StartHBS = new PageWrap("/pages/hongBaoSai/pages/hbsStart/hbsStart")
//红包赛PK,
getApp().globalData.wnds.Wnd_HBSPK = new PageWrap("/pages/hongBaoSai/pages/hbsPK/hbsPK")
//红包赛结束,
getApp().globalData.wnds.Wnd_HBSOver = new PageWrap("/pages/hongBaoSai/pages/hbsOver/hbsOver")
//活动列表,
getApp().globalData.wnds.Wnd_ActiveList = new PageWrap("/pages/hongBaoSai/pages/activeList/activeList")
//活动详情,
getApp().globalData.wnds.Wnd_ActiveDetail = new PageWrap("/pages/hongBaoSai/pages/activeDetail/activeDetail")
//活动报名,
getApp().globalData.wnds.Wnd_ActiveBM = new PageWrap("/pages/hongBaoSai/pages/activeBM/activeBM")
//Ready3v3 ,
//getApp().globalData.wnds.Wnd_Ready3v3 = new PageWrap("/pages/tongTianTa/pages/ready3v3/ready3v3")
//3v3 ,
//getApp().globalData.wnds.Wnd_Fight3v3 = new PageWrap("/pages/tongTianTa/pages/fight3v3/fight3v3")
//750rpx    pages/tongTianTa/pages/worldRank/worldRank

//scaleToFill、aspectFit、aspectFill、widthFix  
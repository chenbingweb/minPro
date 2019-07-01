// pages/shopping/shoppingpage.js
import { SDataShop } from "../../../../dati_comm/sdata/SDataShop.js"
import { SDataCanshu } from "../../../../dati_comm/sdata/SDataCanshu.js"

import { SDataChongzhi } from "../../../../dati_comm/sdata/SDataChongzhi.js"
import { OOSyncClient } from "../../../../dati_comm/libs/oosync/OOSyncClient.js"
import { Player } from "../../../../modules/Player.js"  
import { AutoJump } from "../../../../dati_comm/modules/LoginJump.js"
import { share } from "../../../../dati_comm/modules/share.js";
import { buttonDisabler } from "../../../../dati_comm/modules/buttonDisabler.js";
import { GameConn, WorldConn } from "../../../../dati_comm/libs/network/Conns.js";
import { TimeAnimation } from "../../../../utils/timeAnimation.js";
import { MD5 } from "../../../../dati_comm/modules/md5.js"
import * as MsgBox from "../../../../dati_comm/modules/MsgBox.js"

import { txt } from "../../../../dati_comm/sdata/SDataID2.js"
import * as gcfg from "../../../../gamecfg.js"

import { SDataKeyMath } from "../../../../sdata/SDataKeyMath.js"
import upCoinPos from "../../../../dati_comm/modules/coinAnimation.js"
import * as OOSyncEvents from "../../../../dati_comm/modules/OOSyncEvents.js"

let jifen=0;
var MoneyChanged = null
OOSyncEvents.OnMoneyChanged.On(
  this,
  () => {
    console.log("============================Shop MoneyChange==============================")
    if (MoneyChanged)  MoneyChanged()
  }
)
 

var JifenChanged = null
OOSyncEvents.OnJifenChanged.On(
  this,
  () => {
    console.log("============================Shop JifenChange==============================")
    if (JifenChanged)  JifenChanged()
  }
)

var BackpackChanged = null 
OOSyncEvents.OnBackpackChanged.On(
  this,
  () => {
    console.log("============================Shop vipChange==============================")
    if (BackpackChanged)  BackpackChanged() 
  }
)

  


let datas = {
 
  wndname: "shopping",//窗体名称
  display: true,//block none
  FXMoney: 0, 
  isvip: true,//判断是否充值
  VipEnd:"",//特权结束时间
  wndAlpha: 1,
  wndPosX: 0,
  money: 1,
  xuefen: 1,
  showShareReward: false, // 是否提示分享有奖励

  
  tiao_line: {
    w: 698, h: 17, split: [8, 8, 0], img: [
      "../../imgs/shoping/line_1.png",
      "../../imgs/shoping/line_2.png",
      "../../imgs/shoping/line_3.png"
    ]
  },

  tiao_qipaocz: {
    w: 380, h: 70, split: [10, 85, 122,38], img: [
      "../../imgs/shoping/qipaocz_1.png",
      "../../imgs/shoping/qipaocz_4.png",
      "../../imgs/shoping/qipaocz_2.png",
      "../../imgs/shoping/qipaocz_4.png",
      "../../imgs/shoping/qipaocz_3.png",
    ]
  },
  tiao_banzi: {
    w: 310, h: 398, split: [308, 20, 70], img: [
      "../../imgs/shoping/banz_1.png",
      "../../imgs/shoping/banzi_3.png",
      "../../imgs/shoping/banzi_2.png"
    ]
  },
  share_db: {
    w: 600, h: 120, split: [90, 90, 0], img: [

      "../../imgs/shoping/share_0.png",
      "../../imgs/shoping/share_1.png",
      "../../imgs/shoping/share_2.png"
    ]
  },
  btns_db: {
    w: 236, h: 54, split: [30, 30, 0], img: [
      "../../imgs/shoping/btn_0.png",
      "../../imgs/shoping/btn_1.png",
      "../../imgs/shoping/btn_2.png"
    ]
  },
  exchange: true,
  items: [],
  czitems: [],
  bannerItem: null,//横幅
  arr:[],//金币数量
  UserName:'',
  gkStar: 1,
  Score: 0,
  LevelIcon:'',
  msg: '',//广播消息
  qcLevel: '',//切磋等级,
  myGoods:[],//我的道具,
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: datas,
    anbox:{
      show: false,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面跳转来源
    this.src=options.src||"";

    jifen = Player.Backpack.ShareQunNum;
    this.fenxiang(jifen)
    // wx.showShareMenu({
    //   withShareTicket: true
    // })
    if (options.Istz) {
      this.setData({
        ['data.exchange']: false
      })}
    //if (AutoJump("shopping", options)) return
      console.log(options)
    //分享金币可获得的游戏币
    // this.setData({ ["data.FXMoney"]: Player.FXMoney });

    //积分改变事件
    JifenChanged = ()=>{
      this.setData({ ["data.xuefen"]: Player.Xuefen() })
    }

    //背包变更
    BackpackChanged=()=>{
      this.setData({ ["data.isvip"]: Player.IsVip==1 })
      this.setData({ ["data.VipEnd"]: Player.VipEnd})
      //this.SetCZ()
      this.UpdateShop()
    }

    //金币改变事件
    MoneyChanged = () => {
      
      //支付成功后,金币动画
      upCoinPos('.pos_arr', this.fid, this)


      // //充值动画
      setTimeout(()=>{
        let eft_LD_An1 = new TimeAnimation();
        eft_LD_An1.init(this.beforeMoney, Player.Money());
        eft_LD_An1.score = res => {
          this.beforeMoney = Player.Money()
          if (parseInt(res)) {
            this.setData({ ["data.money"]: parseInt(res) });
          } else {
          
          }
        } 

        //刷新双倍
       // this.SetCZ()
        
        //刷新vip特权
        BackpackChanged()
      },2500)
      
    }



    //刷新商城里面的道具
    this.UpdateShop()
    
    //充值
    //this.SetCZ()
    //this.setData({ ["data.bg"]: this.data.data.bg })

    // 时效
    this.setData({ ["data.time"]: txt(1044) })
    // 有效期
    this.setData({ ["data.timea"]: txt(1045) })    
  },
  fenxiang(jifen) {

    if (isNaN(Player.Backpack.ShareQunNum)) {
      jifen = 0;
    } else {
      if (jifen != Player.Backpack.ShareQunNum + 1) { //无效的预增加
        jifen = Math.max(jifen, Player.Backpack.ShareQunNum)
      }
    }
    this.itemdata(jifen)
  }

  ,
  itemdata(jifen)//接收分享点击次数
  {
    // var than=this
    var items = []
    var itemq = []
    SDataKeyMath.Foreach((id, row) => {
      var item = {
        QunGold: row[SDataKeyMath.I_QunGold]
      }
      items.push(item.QunGold)
    })
    var len = items.length-1
    if (jifen<items.length){
      this.setData({ ["data.jifen"]: parseInt(items[jifen]) })
    }else{
      this.setData({ ["data.jifen"]: parseInt(items[len]) })
    }

  },

  UpdateShop()
  {
    //商店
    var items = []
    SDataShop.Foreach((id, row) => {
      var item = {
        Picture: Player.ArticleServerUrl().MergePath(  "/public/uploads/ProblemImg/").MergePath(  row[SDataShop.I_Picture]), //图片
        Name: row[SDataShop.I_Name],//名称
        Price: row[SDataShop.I_Price].toLocaleString(),//价格 
        Id: row[SDataShop.I_ID]
      }
      
      var shopId = row[SDataShop.I_ShopID]
      var subType = row[SDataShop.I_SubType]
      
      var canshuRow = SDataCanshu.GetRow(subType)
      var dateStr = null

      //处理时间显示
      //检查背包中是否存在这个道具
      var goods = Player.Backpack.GetGoods(subType,shopId)
      if(goods) //背包中有这个道具
      {
        if(goods.InvalidTime>0)
        {
          var xz = goods.InvalidHours
          if(xz>=24) 
            dateStr = txt(1055).format(  parseInt(xz/24) ) //{0}天   
          else
            dateStr = xz>0?txt(1054).format(  parseInt(xz) ):"" //{0}小时  
        }
      }
      else
      { 
        

        if(canshuRow&&canshuRow[SDataCanshu.I_MarkProp]==1)//时间类型的道具
        { 
          var xz = row[SDataShop.I_GodsTime]//有效期,小时
          if(xz>=24) 
            dateStr = txt(1053).format(  parseInt(xz/24) ) //{0}天   
          else
            dateStr = xz>0?txt(1052).format(  parseInt(xz) ):"" //{0}小时  
        }
      }

      if(dateStr) item.time = dateStr
      //处理时间显示End
      
      //处理数量显示
       var numStr
       if(canshuRow&&canshuRow[SDataCanshu.I_MarkProp]!=1)//叠加类型的道具
       { 
          numStr = txt(1069,0)//拥有数量：{0}
          if(goods) //背包中有这个道具
             numStr = txt(1069,goods.Num)//拥有数量：{0}
       }
       if(numStr) item.num = numStr
       //处理数量显示End
      
      
      
      items.push(item)
    })
    this.setData({ ["data.items"]: items })

  },

  SetCZ()
  {
    var czitems = []
    var idx = 0
    var bannerItem = null
    SDataChongzhi.Foreach((id, row) => {
      var item = {
        Picture: Player.ArticleServerUrl().MergePath(  "/public/uploads/ProblemImg/").MergePath(  row[SDataChongzhi.I_Picture]), //图片
        Name: row[SDataChongzhi.I_Name],//名称
        Price: row[SDataChongzhi.I_Price].toLocaleString(),//价格 
        Id: row[SDataChongzhi.I_ID],//ID
        Num: row[SDataChongzhi.I_Num],//金币数量
      }
 
      item.cs = Player.CZIDS[item.Id] ? parseInt(Player.CZIDS[item.Id]) : 0

      if (idx++ > 0) {
        if (row[SDataChongzhi.I_Xianshi] == 1) czitems.push(item)
      }
      else {
        if (row[SDataChongzhi.I_Xianshi] == 1) bannerItem = item
      }
    })
    this.setData({ ["data.bannerItem"]: bannerItem })
    this.setData({ ["data.czitems"]: czitems })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (AutoJump("shopping")) return
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    if (AutoJump("shopping")) return
    //设置个人信息
   
    let mygoods=
    this.setData({
      ["data.UserName"]: Player.Name(),
      ['data.qcLevel']: Player.Level,
      ['data.Score']: Player.Score,//金币
      ['data.LevelIcon']: Player.LevelIcon,
      ['data.gkStar']: Player.Level2, //赶考星级
      ['data.LevelIcon']: Player.LevelIcon,
      ['data.gankaoIcon']: Player.GanKaoIcon,
     
    })
    
    //获取道具列表
    GameConn.Request(
    { n: "goods" }, data => {
      if(data.r==0)
      {
        let goods = data.goods; 
        let list = [];
        let obj=[]
        goods.forEach((item,index)=>{
         
          item.icon = Player.ArticleServerUrl() + item.icon//gcfg.imgUrl + item.icon
        })
        getApp().globalData.Goods = goods;  
        console.log(twoArr(goods))
        
        this.setData({
          ['data.goods']: goods
        })
        getMygoods.call(this, Player.Goods)
        
       
      }
      else
      {
        wx.showToast({
          title: '获取道具失败',
          icon:'none'
        })
      }
      console.log(data)
    })
    
      return
    let iconCfg = [1, 2, 3]
    let shopIconArr = gcfg.shopIconArr
    for(let i = 0; i < 3; ++i){
      if(shopIconArr && shopIconArr[i]){
        iconCfg[i] = shopIconArr[i]
      }
    }
    /*
     qcLevel="{{data.qcLevel}}"
     name="{{data.UserName}}"
     msg="{{data.msg}}"
     money="{{data.Score}}"
     LevelIcon="{{data.LevelIcon}}"
     gkStar="{{data.gkStar}}"
    */
   
    //
    this.setData({
      ['data.txt_namea']:txt(2502),
      ['data.txt_named']:txt(2503),
      ['data.txt_namec']:txt(2504),
      ['data.txt_nameb']:txt(2505),
      ['data.privilege_name_1']:txt(2506),
      ['data.privilege_name_2']:txt(2507),
      ['data.privilege_name_3']:txt(2508),
      ['data.privilege_img_1']:"../../imgs/shoping/privilege_ioc"+iconCfg[0]+".png",
      ['data.privilege_img_2']:"../../imgs/shoping/privilege_ioc"+iconCfg[1]+".png",
      ['data.privilege_img_3']:"../../imgs/shoping/privilege_ioc"+iconCfg[2]+".png",
      ['data.privilege_imga_1']:"../../imgs/shoping/privilege_ioca"+iconCfg[0]+".png",
      ['data.privilege_imga_2']:"../../imgs/shoping/privilege_ioca"+iconCfg[1]+".png",
      ['data.privilege_imga_3']:"../../imgs/shoping/privilege_ioca"+iconCfg[2]+".png",
    })
    this.OnShowDone()
   
  },
  _updateHasShareReward() {
    this.setData({ ['data.showShareReward']: share.hasShareReward() });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    getApp().globalData.isJumpOther = true;
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    MoneyChanged = null
    BackpackChanged = null
    JifenChanged = null
    getApp().globalData.isJumpOther = true;
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
  
  onPullDownRefresh: function () {
  
  },
 */
  /**
   * 页面上拉触底事件的处理函数
  
  onReachBottom: function () {
  
  }, */

  /**
   * 用户点击右上角分享
   */ 
  // 群分享次数
  // 分享个人的总次数
  itemgr() {
    var than = this
    var itemq = []

    SDataKeyMath.Foreach((id, row) => {
      var item = {
        GerenMoney: row[SDataKeyMath.I_GerenMoney]
      }
      itemq.push(item.GerenMoney)
    })
    return itemq.length
  }
  ,
  itemcs() {
    var than = this
    var items = []
    SDataKeyMath.Foreach((id, row) => {
      var item = {
        QunMoney: row[SDataKeyMath.I_QunMoney]
      }
      items.push(item.QunMoney)
    })
    return items.length
  }
  ,
  onShareAppMessage: function (options) {

      var than=this
       return share.getCommonShareContent()
       /*
      return share.getCheckLockShareMessage(
        res => {
          var shareTickets = res.shareTickets
          if (!shareTickets) {

            GameConn.Request({ n: 'ssc' }, data => {
              if (data.r == 0) {
                var cs = parseInt(data.cs) - 1
                var item=this.itemgr()
                if (item == data.cs) {
                  wx.showModal({
                    title: '提示',
                    showCancel: false,
                    content: '一天只能获得' + cs + '次个人分享奖励',
                    success: function (res) {
                    }
                  })
                } else if (data.cs <= item){

                  wx.showToast({
                    title: '分享获得' + data.jb + '金币',
                    duration: 2000
                  })
                }else{

                }
                var money = Player.Money() + data.jb
                than.setData({ ["data.money"]: money })

              } else {
              }
            })
          } else {
            wx.getShareInfo({
              shareTicket: shareTickets[0],
              success: (res) => {
                GameConn.Request({ n: 'sqsc', m: 2}, data => {
                  
                  if (data.r == 0) {
                    var cs = parseInt(data.cs) - 1
                    var itr = this.itemcs()
                    if (itr == data.cs) {
                      wx.showModal({
                        title: '提示',
                        showCancel: false,
                        content: '一天只能获得' + cs + '次群分享奖励',
                        success: function (res) {
                        }
                      })
                    } else if (data.cs <= itr) {
                      wx.showToast({
                        title: '分享获得' + data.jf + '积分',
                        duration: 2000
                      })
                    } else {

                    }
                    // var money = Player.Money() + data.xf
                    // than.setData({ ["data.jifen"]: money })
                    jifen = jifen+1
                    than.fenxiang(jifen)
                  } else {
                  }
                })
              }
            })
          }
        }, res => {

        }

      )
    */
    // return share.getCommonShareContent(options);
  },

  OnShowDone() {
    // var indexpage = getApp().globalData.IndexPage
    // console.log("OnShowDone1")
    this.setData({ ["data.money"]: Player.Money() })
    this.setData({ ["data.xuefen"]: Player.Xuefen() })
    this.setData({ ["data.isvip"]: Player.IsVip==1 })
    this.setData({ ["data.VipEnd"]: Player.VipEnd})

    this._updateHasShareReward()
  },
  //返回按钮
  OnCloseClick(event) {
    if (!buttonDisabler.canClick()) return;
    //var indexpage = getApp().globalData.IndexPage

    //indexpage.wnds.Wnd_Shopping.Hide()
    //indexpage.wnds.Wnd_Home.Show()

  },

  //充值条目被点击
  OnCZItemClick(event) {
   
    this.fid = event.currentTarget.dataset.anid;

    //充值前的金币
    this.beforeMoney = Player.Money();

    //测试充值特效
    /*
    { 
      this.beforeMoney-=1000
      MoneyChanged()
      return
    }
    */

    if (!buttonDisabler.canClick()) return;
    var dataset = event.currentTarget.dataset;
    var id = dataset.id

    console.log("OnCZItemClick", id)

    var nm = {
      n: "czdd",
      tp: "wxg",
      gid: id
    }



    GameConn.Request(
      nm,
      (data) => {
        this.NM_CZDD(data)
        
      }
    )
  },


  NM_CZDD(data) {
    if (data.r != 0) {
      wx.showModal(
        {
          title: "充值失败",
          content: data.err,
          showCancel: "false",
          cancelText: "",
          confirmText: "确定",
          confirmColor: "#3cc51f",
          complete: (res) => { }
        }
      )
      return
    }

    //下单已经成功
    console.log("下单成功")
    var prepay_id = data.wxg.prepay_id

    var timeStamp = parseInt(new Date().getTime() / 1000) + ''
    var nonceStr = this.randomString()
    var package1 = 'prepay_id=' + prepay_id
    var signType = "MD5"
    var appId = gcfg.AppId
    var key = "guaguajiaoguaguajiaoguaguajiao12"
    var stringSignTemp = `appId=${appId}&nonceStr=${nonceStr}&package=${package1}&signType=${signType}&timeStamp=${timeStamp}&key=${key}`
    var sign = MD5(stringSignTemp).toUpperCase()


    //请求支付
    wx.requestPayment(
      {
        appId: appId,
        timeStamp: timeStamp,	//String	是	时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间
        nonceStr: nonceStr,	//String	是	随机字符串，长度为32个字符以下。
        package: package1,	//String	是	统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
        signType: signType,	//String	是	签名类型，默认为MD5，支持HMAC-SHA256和MD5。注意此处需与统一下单的签名类型一致
        paySign: sign,	//String	是	签名,具体签名方案参见微信公众号支付帮助文档;
        success: (res) => { this.paySuccess(res) },	//Function	否	接口调用成功的回调函数
        fail: (res) => { this.payFail(res) }	//Function	否	接口调用失败的回调函数 
      }
    )
  },
  paySuccess(res) {
   
    console.log("支付成功", res)
   
  },
  payFail(res) {
    console.log("支付失败", res)
  },
  randomString: function () {
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = chars.length;
    var pwd = '';
    for (var i = 0; i < 32; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },
  //  特权图片被点击
  privilegeinfo: function () {
    wx.showModal({
      title: '特权说明',
      showCancel:false,
      content: txt(2501).replace(/\<br \/\>/g, "\n"),
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  privilege_amend: function () {

  },

  //商城条目被点击
  OnItemClick(event) {
    if (!buttonDisabler.canClick()) return;
    var dataset = event.currentTarget.dataset;
    var id = parseInt(  dataset.id )

    var row = SDataShop.GetRow(id)
    var zt = row[SDataShop.I_Zhuangtai]
    if(zt==2)
    {
      MsgBox.ShowOK(
        txt(1058),
        txt(1065)//商品尚未上架
      )
      return
    }

    var subType = row[SDataShop.I_SubType]
    var canshuRow = SDataCanshu.GetRow(subType)

    var dateStr = ""
    if(canshuRow&&canshuRow[SDataCanshu.I_MarkProp]==1)//时间类型的道具
    { 
      var xz = row[SDataShop.I_GodsTime]//有效期,小时
      if(xz>=24) 
        dateStr = txt(1053).format(  parseInt(xz/24) ) //{0}天   
      else
        dateStr = xz>0?txt(1052).format(  parseInt(xz) ):"" //{0}小时  
    }
    var content = txt(
      1057,
      row[SDataShop.I_Price],
      row[SDataShop.I_MoneyType]==2?"积分":"金币",
      row[SDataShop.I_Name],
      dateStr
    )//确定使用{0}{1}兑换{2}{3}?   确定使用100积分兑换iphonex 7天？
    
    //format
    wx.showModal(
      {
        title: txt(1056),//兑换确认
        content:  content ,
        showCancel: "true",
        cancelText: "取消",
        confirmText: "确定",
        confirmColor: "#3cc51f",
        complete: (res) => { 

          if (res.confirm) {
            //请求购买道具
            var nm = {n:"buy",id:id}
            GameConn.Request(
              nm,
              (data) => {
                if(data.r==0)//兑换成功
                {
                  //刷新商店
                  this.UpdateShop()

                  //显示购买成功
                  MsgBox.ShowOK(
                        txt(1063),//兑换成功
                        txt(1064,row[SDataShop.I_Name],dateStr)//恭喜你已经成功兑换 {0}{1}      
                        )
                }else
                { 
                  console.log("buy_re",data)
                  switch(data.r)
                  {
                    case 1://货币不足
                      MsgBox.ShowOK(
                        txt(1058),//兑换失败
                        txt(1059)//货币不足，无法兑换
                        )
                      break
                    case 2://超出限购数
                       MsgBox.ShowOK(
                        txt(1058),//兑换失败
                        txt(1060)//超出购买限制
                        )
                      break
                    case 3://无效商品
                       MsgBox.ShowOK(
                        txt(1058),//兑换失败
                        txt(1061)//无效商品
                        )
                      break
                    default:
                      MsgBox.ShowOK(
                        txt(1058),//兑换失败
                        txt(1062)//未知错误
                        )
                      break
                  }//end switch
                }
              
              }
            )
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      }
    )

 
  },
  //兑换
  exchangeBtn() {
    this.setData({
      ['data.exchange']: true
    })
  },
  //充值
  chongzhiBtn() {
    this.setData({
      ['data.exchange']: false
    })
  },
  //返回
  OnBack(){
    if (!buttonDisabler.canClick()) return;
    getApp().globalData.wnds.Wnd_Shopping.back()
  },
  //兑换道具
  OnBuy({currentTarget}){
    let {cid}=currentTarget.dataset;
    // wx.showLoading({
    //   title: '购买中...',
    //   mask:true
    // })
    console.log(cid)

    GameConn.Request( { n: "buy",id:cid }, data => {
      wx.hideLoading()
      
        
        if(data.r==0)
        {
          console.log(data)
          wx.showToast({
            title: '购买成功',
            mask: true
          })
          this.setData({
            ['data.Score']:data.score
          })
          let newGoods=data.goods;
          // this.setData({
          //   ['data.Score']: Player.Score,//金币
          // })
          //更新我的道具
          getMygoods.call(this, JSON.stringify(newGoods))
          //来自闯关页面
          if (this.src=='cg')
          {
            setTimeout(()=>{
              wx.navigateBack({
                delta: 1
              })
            },2000)
           
            return 
            wx.setStorage({
              key: 'buy',
              data: true,
              success:()=>{
                
              }
            })
          }
        }
        else if(r==1)
        {
          wx.showToast({
            title: '对不起,金币不足',
            icon:'none'
          })
        }
        else if (r == 2)
        {
          wx.showToast({
            title: '无库存',
            icon: 'none'
          })
        }
        else
        {
         console.log('err')
        }
        
       

      

    })

  }
})
function getMygoods(goods){
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
    this.setData({
      ['data.myGoods']: Mygoods
    })
  } catch (e) {

  }
}
//数组转换
function twoArr(objArray){
  
  let len = objArray.length;
  let n = 3; //假设每行显示4个
  let lineNum = len % 3 === 0 ? len / 3 : Math.floor((len / 3) + 1);
  let res = [];
  for (let i = 0; i < lineNum; i++) {
    let temp = objArray.slice(i * n, i * n + n);
    res.push(JSON.parse(JSON.stringify(temp)));
  }
  return res 


}
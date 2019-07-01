
/*
这个文件用来存放用户相关的数据
*/


/* 用户信息说明 
nickName	  String	  用户昵称
avatarUrl	  String	  用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
gender	    String	  用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
city	      String	  用户所在城市
province	  String	  用户所在省份
country	    String	  用户所在国家
language	  String	  用户的语言，简体中文为zh_CN
*/
//export let UserInfo = []
import { wxAccount } from '../dati_comm/libs/network/wxAccount'; 
import { NSLoginSys } from '../dati_comm/libs/network/NSLoginSys';
import { ServerList } from "../dati_comm/libs/network/NSServerList";
import { I32BoolValue } from "../dati_comm/libs/core/I32BoolValue";
import { _Backpack } from "../dati_comm/modules/Backpack";
import * as gcfg from "../gamecfg"
import { SDataUserFrame } from "../dati_comm/sdata/SDataUserFrame";



class _Player { 
  //获取用户性别
  Sex() { return this.SyncObj==null?1:this.SyncObj.GetValue("Sex") }
  
  //获取用户昵称
  Name() {
    //return !this._wxUserInfoValid()?"张三七个字很长": wxAccount.userInfo.userInfo.nickName
    return this.SyncObj==null ? "..." : this.SyncObj.GetValue("Name")
 }//this.SyncObj.GetValue("Name")

  _wxUserInfoValid()
  {
    return wxAccount.userInfo != null && wxAccount.userInfo.userInfo != null
  }

  //在线人数
  Online(){
    return this.SyncObj ? this.SyncObj.GetValue("ol") :"???"
  }

  //获取金币数量
  Money() { 
     return 0
    let count = this.SyncObj == null ? "???" : parseInt(this.SyncObj.GetChild("Params",false).GetValue(gcfg.subtype_money));
    return count;
  }
  //学分
  Xuefen() {
     return 0
    if(this.SyncObj == null)   return 0
    var xfstr = this.SyncObj.GetChild("Params",false).GetValue(gcfg.subtype_jifen)
    if(xfstr==null) return 0
     return    parseInt(xfstr ) 
  }
  
  // 当天时间区间内 已经 成功分享的次数（初始为 0）
  SharedTimes(){
    return this.SyncObj == null ? 1 : parseInt(this.SyncObj.GetValue("Sharecount") )
  }  

  get IsDebug()
  {
    return this.SyncObj == null ? false : (parseInt(this.SyncObj.GetValue("dbg"))==1)
  }
  

  get Sharelimit()
  {
    return this.SyncObj == null ? 1 : parseInt(this.SyncObj.GetValue("Sharelimit")) 
  }

  //获取用户图标
  IconUrl() {
    if (this._wxUserInfoValid())
      return wxAccount.userInfo.userInfo.avatarUrl 
    else
      return this.SyncObj == null ?'': this.SyncObj.GetValue("Iconurl")
  }//this.SyncObj.GetValue("Iconurl")

  //文章服务器的地址
  ArticleServerUrl() { 
    if (ServerList.ArticleSvrList != null && ServerList.ArticleSvrList.length>0)
      return ServerList.ArticleSvrList[0].url
    else
      return gcfg.imgUrl
  }

  //赛季奖励状态
  get SeasonJLST() {
    return this.SyncObj == null ? 1 : parseInt(  this.SyncObj.GetValue("SeasonJLST") )
  }

  //是否需要显示赛季通知 0不需要 1需要
  get SeasonNotify(){
    return this.SyncObj == null ? 1 : parseInt(  this.SyncObj.GetValue("SeasonNotify") )
  }
/*
  //32位角色状态
  get ST() {
    return this.SyncObj == null ? 1 : parseInt(  this.SyncObj.GetValue("ST") )
  }
*/
/*
  //赛季通知是否被点击过
  get SeasonNotifyClickd(){
      var v32 = new I32BoolValue(this.ST)
      return v32.GetBool(1)
  }
  */
  //最佳段位 
  get BestLevel1() {
    return this.SyncObj == null ? 1 : this.SyncObj.GetValue("BestLevel1")
  }

  //当前赛季序号 -1表示赛季关闭
  get SeasonNum(){
    return this.SyncObj == null ? -1 : parseInt(this.SyncObj.GetValue("SeasonNum"))
  }

  //赛季开始时间 例 20180910
  get SeasonStart(){
    return this.SyncObj == null ? 0 : parseInt(this.SyncObj.GetValue("SeasonStart"))
  }

  //赛季结束时间 例 20180910
  get SeasonEnd(){
    return this.SyncObj == null ? 0 : parseInt(this.SyncObj.GetValue("SeasonEnd"))
  }

  //是否需要显示赛季通知按钮 0不需要 1需要
  get SeasonBtn(){
    return this.SyncObj == null ? 0 : parseInt(this.SyncObj.GetValue("SeasonBtn"))
  }
  //获取二维码 
  get qrUrl(){
   return this.SyncObj == null ? '' : this.SyncObj.GetValue("qr_url")
  }
  //获取logo  
  get ad(){
   return this.SyncObj == null ? '' : this.SyncObj.GetValue("ad_url")
  }
  //段位 ---- 等级 赶考
  get Level1()
  {
    return this.SyncObj == null ? 1 : this.SyncObj.GetValue("DuanWei") 
  }
 get Iconurl(){
     return this.SyncObj == null ?'': this.SyncObj.GetValue("Iconurl")
  }
  //段位等级--- 星级 赶考
  get Level2() {
    return this.SyncObj == null ? 1 : parseInt(this.SyncObj.GetValue("DuanWeiStar"))
  }
  
  //段位星 切磋等级
  get Level() {
    return this.SyncObj == null ? 1 : this.SyncObj.GetValue("Level")
  }
  //获取切磋ICON LevelIcon
  get LevelIcon(){
    return this.SyncObj == null ? '' : gcfg.imgUrl+this.SyncObj.GetValue("LevelImg")
  }
  //结算图片
  get LevelImg(){
    return this.SyncObj == null ? '' : gcfg.imgUrl+this.SyncObj.GetValue("LevelIcon")
  }
  //获取赶考图标 DuanWeiIcon
  get GanKaoIcon(){
    return this.SyncObj == null ? '' : gcfg.imgUrl+this.SyncObj.GetValue("DuanWeiIcon")
  }
  //切磋星级
  get LevelStar() { 
    return this.SyncObj == null ? 1 : this.SyncObj.GetValue("LevelStar")
  }
  //最后一次签到时间
  get TodayIsQiandao(){
     return this.SyncObj == null ? '' : this.SyncObj.GetValue("TodayIsQiandao")
  }
  //是否完成赶考
  get TodayGankaoCount(){
    return this.SyncObj == null ? '' : this.SyncObj.GetValue("TodayGankaoCount")
  }
    //是否完成1v1
  get TodayQiecuo1V1Count(){
    return this.SyncObj == null ? '' : this.SyncObj.GetValue("TodayQiecuo1V1Count")
  }
    //是否完成3v3
  get TodayQiecuo3V3Count(){
    return this.SyncObj == null ? '' : this.SyncObj.GetValue("TodayQiecuo3V3Count")
  }
  //是否完成通天塔 
  get TodayCGCount(){
    return this.SyncObj == null ? '' : this.SyncObj.GetValue("TodayCGCount")
  }
  //签到次数
  get LianxuQiandaoCount(){
    return this.SyncObj == null ? '' : this.SyncObj.GetValue("LianxuQiandaoCount")
  }
  //金币
  get Score() {
    return this.SyncObj == null ? 1 : this.SyncObj.GetValue("Score")
  }
  //获取我的道具列表 Goods
  get Goods() {
    return this.SyncObj == null ? [] : this.SyncObj.GetValue("Goods")
  }
  //获取切磋等级 LevelName
  get LevelName() {
    return this.SyncObj == null ? '初出茅庐' : this.SyncObj.GetValue("LevelName")
  }
  //获取当前闯关的关卡 SavedGk
   get SavedGk() {
    return this.SyncObj == null ? 1 : this.SyncObj.GetValue("SavedGk")
   }
   //获取当天闯关次数 TodayCGLeftCount
   get TodayCGLeftCount() {
    return this.SyncObj == null ? 1 : this.SyncObj.GetValue("TodayCGLeftCount")
   }
   //获取海报列表 Duanweis
    get Duanweis() {
    return this.SyncObj == null ? '[]' : this.SyncObj.GetValue("Duanweis")
   }
   //获取切磋等级列表 Duanweis
    get Levels() {
    return this.SyncObj == null ? '[]' : this.SyncObj.GetValue("Levels")
   }
   //获取分享信息 ShareInfo
    get ShareInfo() {
    return this.SyncObj == null ? '[]' : this.SyncObj.GetValue("ShareInfo")
   }
  get InviteCode(){
    return this.SyncObj == null ? "" : this.SyncObj.GetValue("InviteCode")
  }

  //当前头像框ID
  //get CurrHeadFrame(){
  //  return this.SyncObj == null ? 0 : this.SyncObj.GetValue("CurrHeadFrame")
  //}

  get IsVip() {
    if(!this.Backpack) return false
    return this.Backpack.IsVip?1:0
  }

  get HeadFrame()
  {
    if(!this.Backpack) return null
    var hfGoods = this.Backpack.GetFirstGoods(11)
    if(hfGoods==null) return null

    var img = SDataUserFrame.GetRow(hfGoods.ShopId)[SDataUserFrame.I_Picture]
    return this.ArticleServerUrl().MergePath( "/public/uploads/ProblemImg/").MergePath( img)
  }
  
  //vip特权过期时间
  get VipEnd(){
    if(!this.Backpack) return "2008-10-10"
    var gd = this.Backpack.VipGoods
    if(!gd) return "2008-10-10"
    var date = gd.InvalidDate
    
    return "{0}-{1}-{2}".format(date.getFullYear(),date.getMonth()+1,date.getDate())
  }

  get CZIDS(){
    if (this.SyncObj == null) return {};
    var czids = this.SyncObj.GetValue("CZIDS")
    if (czids=='') return ''
    //console.log("czids", czids)
    //id,次数
    //var array = czids.split(",")
    //for (var i = 0; i < array.length; i++) array[i] = parseInt(array[i])

    return JSON.parse(czids)
  }

  //分享可获得的金币数
  get FXMoney() {return this.SyncObj == null ? 0 : this.SyncObj.GetValue("FXMoney")  }
  //是否是新人
 get  getIsNewPeople(){
    return true
 }
  //绑定同步对象
  _BindSync(obj) { 
    this.SyncObj = obj
    this.Backpack = new _Backpack()
    this.Backpack._BindSync(obj)
  }
}

let Player = new _Player()

module.exports = { Player }

/*

http://47.95.199.225/ public/uploads/face/  01/b2323de2335572ef.png

<ArticleServer>
  <a url="http://47.95.199.225/" />
    </ArticleServer>

 */